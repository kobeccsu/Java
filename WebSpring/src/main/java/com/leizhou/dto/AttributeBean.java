package com.leizhou.dto;

import javax.persistence.Column;
import javax.persistence.Id;

public class AttributeBean {

	@Id
	private int id;

	@Column(name = "attr_name")
	private String attrName;

	@Column(name = "category_id")
	private int categoryId;

	@Column(name = "shop_id")
	private int shopId;

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAttrName() {
		return this.attrName;
	}

	public void setAttrName(String attrName) {
		this.attrName = attrName;
	}

	public int getCategoryId() {
		return this.categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public int getShopId() {
		return this.shopId;
	}

	public void setShopId(int shopId) {
		this.shopId = shopId;
	}
}
