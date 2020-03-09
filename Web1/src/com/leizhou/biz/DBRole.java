package com.leizhou.biz;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;

import com.leizhou.dal.DB;
import com.leizhou.dto.RoleBean;

public class DBRole {
	public boolean addPolicy(String name) {
		return new DB().execute("insert into role (rolename, uid) values ('" + name + "', uuid());");
	}
	
	public LinkedList<RoleBean> getPolicyList(int pageIndex, int pageSize, String queryText) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = new DB().getConnection();
		Statement stmt = con.createStatement();
		ResultSet result = stmt.executeQuery("select * from role "
				+ (queryText.contentEquals("") ? "" : " where rolename like '" + queryText + "%'") +
				" limit " + pageSize + " offset " + (pageIndex - 1) * pageSize);
		LinkedList<RoleBean> list = new LinkedList<RoleBean>();
		while (result.next()) {
			RoleBean po = new RoleBean();
			po.setId(result.getInt("id"));
			po.setUid(result.getString("uid"));
			po.setRolename(result.getString("uid"));
			list.add(po);
		}
		con.close();
		return list;
	}
	
	public boolean deleteRole(int id) {
		return new DB().execute("delete from role where id = " + id);
	}
	
	public boolean updateRole(RoleBean po) {
		return new DB().execute("update role set rolename = '"+po.getRolename()+"' where id= " + po.getId());
	}
	
	public int getTotalCount(String rolename) throws SQLException {
		Connection con = new DB().getConnection();
		Statement stmt = con.createStatement();
		ResultSet resultSet = stmt.executeQuery("select count(*) as totalcount from role where policyname like '" + rolename + "%' ");
		resultSet.next();
		int count = resultSet.getInt("totalcount");
		resultSet.close();
		return count;
	}
}