package com.leizhou.biz;

import java.sql.Connection;
import java.sql.Statement;
import java.util.LinkedList;

import com.leizhou.dal.DB;
import com.leizhou.dto.*;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DBPolicy {
	public boolean addPolicy(String name) {
		return new DB().execute("insert into policy (policyname, uid) values ('" + name + "', uuid());");
	}
	
	public LinkedList<Policy> getPolicyList(int pageIndex, int pageSize, String queryText) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = new DB().getConnection();
		Statement stmt = con.createStatement();
		ResultSet result = stmt.executeQuery("select * from policy "
				+ (queryText.contentEquals("") ? "" : " where policyname like '" + queryText + "%'") +
				" limit " + pageSize + " offset " + (pageIndex - 1) * pageSize);
		LinkedList<Policy> list = new LinkedList<Policy>();
		while (result.next()) {
			Policy po = new Policy();
			po.setId(result.getInt("id"));
			po.setPolicyname(result.getString("policyname"));
			po.setUuid(result.getString("uid"));
			list.add(po);
		}
		con.close();
		return list;
	}
	
	public LinkedList<Policy> getPolicyList(int roleId) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = new DB().getConnection();
		Statement stmt = con.createStatement();
		ResultSet result = stmt.executeQuery("select rr.id, policyname from role_policy_ref r join policy rr on r.policy_id = rr.id where r.role_id = " + roleId );
		LinkedList<Policy> list = new LinkedList<Policy>();
		while (result.next()) {
			Policy po = new Policy();
			po.setId(result.getInt("id"));
			po.setPolicyname(result.getString("policyname"));
			list.add(po);
		}
		con.close();
		return list;
	}
	
	public boolean deletePolicy(int id) {
		return new DB().execute("delete from policy where id = " + id);
	}
	
	public boolean updatePolicy(Policy po) {
		return new DB().execute("update policy set policyname = '"+po.getPolicyname()+"' where id= " + po.getId());
	}
	
	public int getTotalCount(String policyname) throws SQLException {
		Connection con = new DB().getConnection();
		Statement stmt = con.createStatement();
		ResultSet resultSet = stmt.executeQuery("select count(*) as totalcount from policy where policyname like '" + policyname + "%' ");
		resultSet.next();
		int count = resultSet.getInt("totalcount");
		resultSet.close();
		return count;
	}
}
