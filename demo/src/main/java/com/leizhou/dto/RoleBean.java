package com.leizhou.dto;

public class RoleBean {
	private int id;
	private String uid;
	private String rolename;
	private int ownPoliciesCount;

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

	public int getOwnPoliciesCount() {
		return ownPoliciesCount;
	}

	public void setOwnPoliciesCount(int ownPoliciesCount) {
		this.ownPoliciesCount = ownPoliciesCount;
	}

}
