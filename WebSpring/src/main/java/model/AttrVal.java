package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the attr_val database table.
 * 
 */
@Entity
@Table(name="attr_val")
@NamedQuery(name="AttrVal.findAll", query="SELECT a FROM AttrVal a")
public class AttrVal implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="attr_id")
	private int attrId;

	@Column(name="attr_value")
	private String attrValue;

	@Column(name="goods_id")
	private int goodsId;

	@Column(name="shop_id")
	private int shopId;

	public AttrVal() {
	}

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