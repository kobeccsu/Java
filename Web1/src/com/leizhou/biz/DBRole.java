package com.leizhou.biz;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedList;

import com.leizhou.dal.DB;
import com.leizhou.dto.RoleBean;
import com.leizhou.dto.UserBean;

public class DBRole {
	
	public boolean addRole(String name, ArrayList<Integer> policies) throws ClassNotFoundException, SQLException {
		
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = new DB().getConnection();
		con.setAutoCommit(false);
		PreparedStatement stmt = con.prepareStatement("insert into role (rolename, uid) values (?, uuid());", Statement.RETURN_GENERATED_KEYS);
		stmt.setString(1, name);
		stmt.execute();
		
		long newId = 0;
		try {
			ResultSet afterInsert = stmt.getGeneratedKeys();
			while (afterInsert.next()) {
				newId = afterInsert.getLong(1);
			}
		} catch (Exception e) {
			System.err.println(e);
		}
		
		PreparedStatement insertRelation = con.prepareStatement("insert into role_policy_ref(role_Id, policy_id) values (?, ?);");
		for (Integer integer : policies) {
			insertRelation.clearParameters();
			insertRelation.setLong(1, newId);
			insertRelation.setLong(2, integer);
			insertRelation.addBatch();
		}
		insertRelation.executeBatch();
		
		try {
			con.commit();
		} catch (Exception e) {
			con.rollback();
			return false;
		} finally {
			con.close();
		}
		
		return true;
	}
	
	public LinkedList<RoleBean> getRoleList(int pageIndex, int pageSize, String queryText) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = new DB().getConnection();
		Statement stmt = con.createStatement();
		ResultSet result = stmt.executeQuery("select l.id, rolename, count(policyname) policycount from role l left join role_policy_ref r on l.id = r.role_id left join policy rr on r.policy_id = rr.id  "
				+ (queryText.contentEquals("") ? "" : " where rolename like '" + queryText + "%'") 
				+ " group by l.id,rolename " 
				+ " limit " + pageSize + " offset " + (pageIndex - 1) * pageSize);
		LinkedList<RoleBean> list = new LinkedList<RoleBean>();
		while (result.next()) {
			RoleBean po = new RoleBean();
			po.setId(result.getInt("id"));
			po.setRolename(result.getString("rolename"));
			po.setOwnPoliciesCount(result.getInt("policycount"));
			list.add(po);
		}
		con.close();
		return list;
	}
	
	public LinkedList<RoleBean> getRoleList(int userId) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = new DB().getConnection();
		Statement stmt = con.createStatement();
		ResultSet result = stmt.executeQuery("select rr.id, rolename from role_user_ref r join role rr on r.role_id = rr.id where r.user_id = " + userId );
		LinkedList<RoleBean> list = new LinkedList<RoleBean>();
		while (result.next()) {
			RoleBean po = new RoleBean();
			po.setId(result.getInt("id"));
			po.setRolename(result.getString("rolename"));
			list.add(po);
		}
		con.close();
		return list;
	}
	
	public boolean deleteRole(int id) throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = new DB().getConnection();
		con.setAutoCommit(false);
		PreparedStatement stmt = con.prepareStatement("delete from role where id = ? ");
		stmt.setLong(1, id);
		stmt.execute();
		
		PreparedStatement deleteSqlStatement = con.prepareStatement("delete from role_policy_ref where role_id = ?");
		deleteSqlStatement.setLong(1, id);
		deleteSqlStatement.execute();
		
		try {
			con.commit();
		}catch (Exception e) {
			con.rollback();
			return false;
		}
		finally {
			con.close();
		}
		return true;
	}
	
	public boolean updateRole(RoleBean po, ArrayList<Integer> policies) throws SQLException,ClassNotFoundException {
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = new DB().getConnection();
		con.setAutoCommit(false);
		PreparedStatement stmt = con.prepareStatement("update role set rolename = ? where id= ?", 
				Statement.RETURN_GENERATED_KEYS);
		stmt.setString(1, po.getRolename());
		stmt.setLong(2, po.getId());
		stmt.execute();
		
		PreparedStatement deleteSqlStatement = con.prepareStatement("delete from role_policy_ref where role_id = ?");
		deleteSqlStatement.setLong(1, po.getId());
		deleteSqlStatement.execute();
		
		PreparedStatement insertRelation = con.prepareStatement("insert into role_policy_ref(role_Id, policy_id) values (?, ?)");
		for (Integer integer : policies) {
			insertRelation.clearParameters();
			insertRelation.setLong(1, po.getId());
			insertRelation.setLong(2, integer);
			insertRelation.addBatch();
		}
		insertRelation.executeBatch();
		
		try {
			con.commit();
		} catch (Exception e) {
			con.rollback();
			return false;
		}
		
		return true;
	}
	
	public int getTotalCount(String rolename) throws SQLException {
		Connection con = new DB().getConnection();
		Statement stmt = con.createStatement();
		ResultSet resultSet = stmt.executeQuery("select count(*) as totalcount from role where rolename like '" + rolename + "%' ");
		resultSet.next();
		int count = resultSet.getInt("totalcount");
		resultSet.close();
		return count;
	}
}
