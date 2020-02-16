package com.leizhou.biz;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import com.leizhou.dal.*;
import com.leizhou.dto.UserBean;

public class DBUsers {
	public boolean register(UserBean user) {
		String sql = "insert into users(uname, password, salt) values('" + user.getUsername() + "', '"+ user.getPassword() 
			+ "','" + user.getSalt() + "')";
		return new DB().insert(sql);
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
}
