package com.leizhou.dto;

import javax.persistence.Column;
import javax.persistence.Id;

public class ShopBean {
	@Id
	private int id;

	@Column(name = "is_closed")
	private byte isClosed;

	private String name;

	private String theme;

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte getIsClosed() {
		return this.isClosed;
	}

	public void setIsClosed(byte isClosed) {
		this.isClosed = isClosed;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTheme() {
		return this.theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

}
