package com.leizhou.dto;

import java.util.ArrayList;

public class RoleBean {
	private int id;
	private String uid;
	private String rolename;
	private ArrayList<Policy> policies;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	public ArrayList<Policy> getPolicies() {
		return policies;
	}
	public void setPolicies(ArrayList<Policy> policies) {
		this.policies = policies;
	}
}
