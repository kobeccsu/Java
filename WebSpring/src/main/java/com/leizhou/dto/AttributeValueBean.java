package com.leizhou.dto;

import javax.persistence.Column;
import javax.persistence.Id;

public class AttributeValueBean {

	@Id
	private int id;

	@Column(name = "attr_id")
	private int attrId;

	@Column(name = "attr_value")
	private String attrValue;

	@Column(name = "goods_id")
	private int goodsId;

	@Column(name = "shop_id")
	private int shopId;

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAttrId() {
		return this.attrId;
	}

	public void setAttrId(int attrId) {
		this.attrId = attrId;
	}

	public String getAttrValue() {
		return this.attrValue;
	}

	public void setAttrValue(String attrValue) {
		this.attrValue = attrValue;
	}

	public int getGoodsId() {
		return this.goodsId;
	}

	public void setGoodsId(int goodsId) {
		this.goodsId = goodsId;
	}

	public int getShopId() {
		return this.shopId;
	}

	public void setShopId(int shopId) {
		this.shopId = shopId;
	}
}