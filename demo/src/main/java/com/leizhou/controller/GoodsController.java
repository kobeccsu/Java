package com.leizhou.controller;

import java.io.IOException;

import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.leizhou.dto.GoodsBean;
import com.leizhou.mapper.GoodsMapper;

@Controller
public class GoodsController {

	GoodsMapper mapper;
	
	public GoodsController(GoodsMapper mp) {
		this.mapper = mp;
	}
	
	@PostMapping(value = "/goods/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@ResponseBody
	public String add(@RequestParam(value = "banner_file") MultipartFile banner_file,
			@RequestParam(value = "detail_file") MultipartFile detail_file, @RequestParam(value = "json") String json)
			throws IOException {
		
		JSONObject jsonObject = new JSONObject(json.toString());
		GoodsBean bean = new GoodsBean();
		bean.setShopId(jsonObject.getInt("shopId"));
		bean.setGoodsname(jsonObject.getString("name"));
		bean.setBannerPic(banner_file.getBytes());
		bean.setDetailPic(detail_file.getBytes());
		bean.setCategoryId(jsonObject.getInt("categoryId"));
		bean.setCategoryName(jsonObject.getString("categoryName"));
		bean.setPrice((float)jsonObject.getDouble("price"));
		bean.setPromotionalPrice((float)jsonObject.getDouble("promotionalPrice"));
		bean.setIsAgent((byte)(jsonObject.getBoolean("isAgent") ? 1 : 0));
		bean.setIsPromotion((byte)(jsonObject.getBoolean("isPromotion") ? 1 : 0));
		bean.setIsMarket((byte) (jsonObject.getBoolean("isMarket") ? 1 : 0) );
		bean.setIsHot((byte) (jsonObject.getBoolean("isHot") ? 1 : 0) ); 
		bean.setIsNew((byte) (jsonObject.getBoolean("isNew") ? 1 : 0) );
		bean.setIsIndex((byte) (jsonObject.getBoolean("isIndex") ? 1 : 0) );
		bean.setStock(jsonObject.getInt("stock"));
		bean.setGoodsDes(jsonObject.getString("goodsDes"));
		
		boolean issuccessd = mapper.add(bean);
		return "{successed : " + issuccessd + "}";
	}
}
