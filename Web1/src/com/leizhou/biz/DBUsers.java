package com.leizhou.biz;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedList;

import com.leizhou.dal.*;
import com.leizhou.dto.Policy;
import com.leizhou.dto.RoleBean;
import com.leizhou.dto.UserBean;

public class DBUsers {
	public boolean register(UserBean user) {
		String sql = "insert into users(uname, password, salt) values('" + user.getUsername() + "', '"+ user.getPassword() 
			+ "','" + user.getSalt() + "')";
		return new DB().execute(sql);
	}
	
	public UserBean getUser(String username) {
		String sql = String.format("select * from users where uname = '%s'", 
				username);
		UserBean userBean = new UserBean();
		ResultSet result = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = new DB().getConnection();
			Statement stmt = con.createStatement();
			result = stmt.executeQuery(sql);
			if (result.next() == false) return null;
			userBean.setId(result.getInt("id"));
			userBean.setUsername(result.getString("uname"));
			userBean.setPassword(result.getString("password"));
			userBean.setSalt(result.getString("salt"));
			con.close();
		} catch (Exception e) {
			System.out.println(e);
		}
		
		return userBean;
	}
	
	public LinkedList<UserBean> getUserList(int pageIndex, int pageSize, String queryText) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = new DB().getConnection();
		Statement stmt = con.createStatement();
		ResultSet result = stmt.executeQuery("select l.id, uname, count(rolename) rolecount from users l left join role_user_ref r on l.id = r.user_id left join role rr on r.role_id = rr.id  "
				+ (queryText.contentEquals("") ? "" : " where uname like '" + queryText + "%'") 
				+ " group by l.id,uname " 
				+ " limit " + pageSize + " offset " + (pageIndex - 1) * pageSize);
		LinkedList<UserBean> list = new LinkedList<UserBean>();
		while (result.next()) {
			UserBean po = new UserBean();
			po.setId(result.getInt("id"));
			po.setUsername(result.getString("uname"));
			po.setOwnRolesCount(result.getInt("rolecount"));
			list.add(po);
		}
		con.close();
		return list;
	}
	
	
	
	public int getTotalCount(String username) throws SQLException {
		Connection con = new DB().getConnection();
		Statement stmt = con.createStatement();
		ResultSet resultSet = stmt.executeQuery("select count(*) as totalcount from users where uname like '" + username + "%' ");
		resultSet.next();
		int count = resultSet.getInt("totalcount");
		resultSet.close();
		return count;
	}
	
	public boolean updateUserRoleRef(UserBean po, ArrayList<Integer> roles) throws SQLException,ClassNotFoundException {
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = new DB().getConnection();
		con.setAutoCommit(false);
		
		PreparedStatement deleteSqlStatement = con.prepareStatement("delete from role_user_ref where user_id = ?");
		deleteSqlStatement.setLong(1, po.getId());
		deleteSqlStatement.execute();
		
		PreparedStatement insertRelation = con.prepareStatement("insert into role_user_ref(user_Id, role_Id) values (?, ?)");
		for (Integer integer : roles) {
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
}
