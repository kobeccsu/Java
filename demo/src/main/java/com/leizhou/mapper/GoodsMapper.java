package com.leizhou.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultType;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.type.JdbcType;
import com.leizhou.dto.GoodsBean;
import com.leizhou.viewmodel.ImageViewModel;

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

	@Select("select * from goods where shop_id = #{shopid}")
	List<GoodsBean> getList(int shopid);

	@ResultType(com.leizhou.viewmodel.ImageViewModel.class)
	@Results(value= {
		@Result(property="id", column="id", jdbcType=JdbcType.INTEGER),
		@Result(property="banner_pic", column="banner_pic", jdbcType=JdbcType.BLOB),
		@Result(property="detail_pic", column="detail_pic", jdbcType=JdbcType.BLOB)
	})
	@Select("select id, banner_pic, detail_pic from goods where shop_id = #{shopId}")
	List<ImageViewModel> getOne(int shopId);
}
