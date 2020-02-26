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
	
	public LinkedList<Policy> getPolicyList() throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = new DB().getConnection();
		Statement stmt = con.createStatement();
		ResultSet result = stmt.executeQuery("select * from policy");
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
	
	public boolean deletePolicy(int id) {
		return new DB().execute("delete from policy where id = " + id);
	}
	
	public boolean updatePolicy(Policy po) {
		return new DB().execute("update policy set policyname = '"+po.getPolicyname()+"' where id= " + po.getId());
	}
}
