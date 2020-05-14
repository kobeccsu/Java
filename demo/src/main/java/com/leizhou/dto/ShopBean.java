package com.leizhou.dto;


public class ShopBean {
	private int id;

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
