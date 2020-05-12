package com.leizhou.dto;

public class GoodsAttrBean {
	private int shop_id;
	private int goods_id;
	private int attr_val_id;
	private double price;

	public int getShop_id() {
		return shop_id;
	}

	public void setShop_id(int shop_id) {
		this.shop_id = shop_id;
	}

	public int getGoods_id() {
		return goods_id;
	}

	public void setGoods_id(int goods_id) {
		this.goods_id = goods_id;
	}

	public int getAttr_val_id() {
		return attr_val_id;
	}

	public void setAttr_val_id(int attr_val_id) {
		this.attr_val_id = attr_val_id;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
}
