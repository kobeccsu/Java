package com.leizhou.dto;

import javax.persistence.Column;
import javax.persistence.Id;

public class CategoryBean {
	@Id
	private int id;

	@Column(name = "is_deleted")
	private byte isDeleted;

	private String name;

	private int pid;

	private String uid;

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte getIsDeleted() {
		return this.isDeleted;
	}

	public void setIsDeleted(byte isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPid() {
		return this.pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getUid() {
		return this.uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}
}
