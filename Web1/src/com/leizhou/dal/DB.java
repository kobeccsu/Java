package com.leizhou.dal;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DB {
	// mysql
	//final String _connecString="jdbc:mysql://127.0.0.1:3306/mall?useUnicode=true&characterEncoding=utf-8&useSSL=false&allowPublicKeyRetrieval=true";
	final String _username = "root";
	final String _password = "zl7758258";
	
	public boolean insert(String sql) {
		boolean result = false;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = this.getConnection();
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
			Connection con = this.getConnection();
			Statement stmt = con.createStatement();
			result = stmt.executeQuery(sql);
			con.close();
		} catch (Exception e) {
			System.out.println(e);
		}
		return result;
	}
	
	public Connection getConnection() throws SQLException {
		String dbName = System.getenv("RDS_DB_NAME"); 
		dbName = dbName != null ? dbName : "mall";
	    String userName = System.getProperty("RDS_USERNAME");
	    System.out.println("username" + userName);
	    userName = userName != null ? userName : "root";
	    String password = System.getProperty("RDS_PASSWORD");
	    password = password != null ? password : _password;
	    String hostname = System.getProperty("RDS_HOSTNAME");
	    System.out.println("hostname" + hostname);
	    hostname = hostname != null ? hostname : "127.0.0.1";
	    String port = System.getProperty("RDS_PORT");
	    port = port != null ? port : "3306";
	    String jdbcUrl = "jdbc:mysql://" + hostname + ":" + port + "/" + dbName 
	    		+ "?user=" + userName + "&password=" + password;
		
	    return DriverManager.getConnection(jdbcUrl);
	}
}
