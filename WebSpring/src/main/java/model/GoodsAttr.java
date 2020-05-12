package model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the goods_attr database table.
 * 
 */
@Entity
@Table(name="goods_attr")
@NamedQuery(name="GoodsAttr.findAll", query="SELECT g FROM GoodsAttr g")
public class GoodsAttr implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="attr_val_id")
	private int attrValId;

	@Column(name="goods_id")
	private int goodsId;

	private BigDecimal price;

	@Column(name="shop_id")
	private int shopId;

	public GoodsAttr() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAttrValId() {
		return this.attrValId;
	}

	public void setAttrValId(int attrValId) {
		this.attrValId = attrValId;
	}

	public int getGoodsId() {
		return this.goodsId;
	}

	public void setGoodsId(int goodsId) {
		this.goodsId = goodsId;
	}

	public BigDecimal getPrice() {
		return this.price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public int getShopId() {
		return this.shopId;
	}

	public void setShopId(int shopId) {
		this.shopId = shopId;
	}

}