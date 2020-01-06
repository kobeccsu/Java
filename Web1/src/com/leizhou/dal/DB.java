package com.leizhou.dal;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DB {
	// mysql
	final String connecString="jdbc:mysql://127.0.0.1:3306/mall?useUnicode=true&characterEncoding=utf-8&useSSL=false&allowPublicKeyRetrieval=true";
	final String username = "root";
	final String password = "zl7758258";
	
	public boolean insert(String sql) {
		boolean result = false;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection(connecString, username, password);
			Statement stmt = con.createStatement();
			result = stmt.execute(sql);
			con.close();
		} catch (Exception e) {
			System.out.println(e);
		}
		return result;
	}
	
	public ResultSet select(String sql) {
		ResultSet result = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection(connecString, username, password);
			Statement stmt = con.createStatement();
			result = stmt.executeQuery(sql);
			con.close();
		} catch (Exception e) {
			System.out.println(e);
		}
		return result;
	}
	
	public Connection getConnection() throws SQLException {
		return DriverManager.getConnection(connecString, username, password);
	}
}
