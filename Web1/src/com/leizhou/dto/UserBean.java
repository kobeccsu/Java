package com.leizhou.dto;

public class UserBean {
	private int id;
	private String username;
	private String password;
	private String salt;
	private int ownRolesCount;
	private String roles;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSalt() {
		return salt;
	}
	public void setSalt(String salt) {
		this.salt = salt;
	}
	public int getOwnRolesCount() {
		return ownRolesCount;
	}
	public void setOwnRolesCount(int ownRolesCount) {
		this.ownRolesCount = ownRolesCount;
	}
	public String getRoles() {
		return roles;
	}
	public void setRoles(String roles) {
		this.roles = roles;
	}
	
}
