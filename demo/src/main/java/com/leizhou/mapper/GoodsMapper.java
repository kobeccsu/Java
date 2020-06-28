package com.leizhou.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

import com.leizhou.dto.GoodsBean;

@Mapper
public interface GoodsMapper {
	@Insert("INSERT INTO `mall`.`goods`" + 
			"(" + 
			"`shop_id`," + 
			"`goodsname`," + 
			"`category_id`," + 
			"`category_name`," + 
			"`banner_pic`," + 
			"`detail_pic`," + 
			"`price`," + 
			"`promotional_price`," + 
			"`is_agent`," + 
			"`is_promotion`," + 
			"`is_market`," + 
			"`is_hot`," + 
			"`is_new`," + 
			"`is_index`," + 
			"`goods_des`," + 
			"`addtime`," + 
			"`stock`)" + 
			"VALUES" + 
			"(" + 
			"#{shopId}," + 
			"#{goodsname}," + 
			"#{categoryId}," + 
			"#{categoryName}," + 
			"#{bannerPic}," + 
			"#{detailPic}," + 
			"#{price}," + 
			"#{promotionalPrice}," + 
			"#{isAgent}," + 
			"#{isPromotion}," + 
			"#{isMarket}," + 
			"#{isHot}," + 
			"#{isNew}," + 
			"#{isIndex}," + 
			"#{goodsDes}," + 
			"now()," + 
			"#{stock}" + 
			") ")
	@Options(useGeneratedKeys=true, keyProperty="id")
	boolean add(GoodsBean bean);

}
