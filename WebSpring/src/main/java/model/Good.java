package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the goods database table.
 * 
 */
@Entity
@Table(name="goods")
@NamedQuery(name="Good.findAll", query="SELECT g FROM Good g")
public class Good implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Temporal(TemporalType.TIMESTAMP)
	private Date addtime;

	@Lob
	@Column(name="banner_pic")
	private byte[] bannerPic;

	@Column(name="buy_count")
	private int buyCount;

	@Column(name="buy_m_count")
	private int buyMCount;

	@Column(name="category_id")
	private int categoryId;

	@Column(name="category_name")
	private String categoryName;

	@Lob
	@Column(name="detail_pic")
	private byte[] detailPic;

	@Column(name="freight_tmlp_name")
	private String freightTmlpName;

	@Column(name="freight_tmpl_id")
	private int freightTmplId;

	@Column(name="goods_des")
	private String goodsDes;

	private String goodsname;

	@Column(name="group_buy_id")
	private int groupBuyId;

	@Column(name="is_agent")
	private byte isAgent;

	@Column(name="is_hot")
	private byte isHot;

	@Column(name="is_index")
	private byte isIndex;

	@Column(name="is_market")
	private byte isMarket;

	@Column(name="is_new")
	private byte isNew;

	@Column(name="is_promotion")
	private byte isPromotion;

	private float price;

	@Column(name="promotional_price")
	private float promotionalPrice;

	@Column(name="quick_buy_id")
	private int quickBuyId;

	@Column(name="shop_id")
	private int shopId;

	private int stock;

	public Good() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getAddtime() {
		return this.addtime;
	}

	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}

	public byte[] getBannerPic() {
		return this.bannerPic;
	}

	public void setBannerPic(byte[] bannerPic) {
		this.bannerPic = bannerPic;
	}

	public int getBuyCount() {
		return this.buyCount;
	}

	public void setBuyCount(int buyCount) {
		this.buyCount = buyCount;
	}

	public int getBuyMCount() {
		return this.buyMCount;
	}

	public void setBuyMCount(int buyMCount) {
		this.buyMCount = buyMCount;
	}

	public int getCategoryId() {
		return this.categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return this.categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public byte[] getDetailPic() {
		return this.detailPic;
	}

	public void setDetailPic(byte[] detailPic) {
		this.detailPic = detailPic;
	}

	public String getFreightTmlpName() {
		return this.freightTmlpName;
	}

	public void setFreightTmlpName(String freightTmlpName) {
		this.freightTmlpName = freightTmlpName;
	}

	public int getFreightTmplId() {
		return this.freightTmplId;
	}

	public void setFreightTmplId(int freightTmplId) {
		this.freightTmplId = freightTmplId;
	}

	public String getGoodsDes() {
		return this.goodsDes;
	}

	public void setGoodsDes(String goodsDes) {
		this.goodsDes = goodsDes;
	}

	public String getGoodsname() {
		return this.goodsname;
	}

	public void setGoodsname(String goodsname) {
		this.goodsname = goodsname;
	}

	public int getGroupBuyId() {
		return this.groupBuyId;
	}

	public void setGroupBuyId(int groupBuyId) {
		this.groupBuyId = groupBuyId;
	}

	public byte getIsAgent() {
		return this.isAgent;
	}

	public void setIsAgent(byte isAgent) {
		this.isAgent = isAgent;
	}

	public byte getIsHot() {
		return this.isHot;
	}

	public void setIsHot(byte isHot) {
		this.isHot = isHot;
	}

	public byte getIsIndex() {
		return this.isIndex;
	}

	public void setIsIndex(byte isIndex) {
		this.isIndex = isIndex;
	}

	public byte getIsMarket() {
		return this.isMarket;
	}

	public void setIsMarket(byte isMarket) {
		this.isMarket = isMarket;
	}

	public byte getIsNew() {
		return this.isNew;
	}

	public void setIsNew(byte isNew) {
		this.isNew = isNew;
	}

	public byte getIsPromotion() {
		return this.isPromotion;
	}

	public void setIsPromotion(byte isPromotion) {
		this.isPromotion = isPromotion;
	}

	public float getPrice() {
		return this.price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public float getPromotionalPrice() {
		return this.promotionalPrice;
	}

	public void setPromotionalPrice(float promotionalPrice) {
		this.promotionalPrice = promotionalPrice;
	}

	public int getQuickBuyId() {
		return this.quickBuyId;
	}

	public void setQuickBuyId(int quickBuyId) {
		this.quickBuyId = quickBuyId;
	}

	public int getShopId() {
		return this.shopId;
	}

	public void setShopId(int shopId) {
		this.shopId = shopId;
	}

	public int getStock() {
		return this.stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

}