package com.leizhou.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.leizhou.dto.GoodsAttrBean;
import com.leizhou.dto.GoodsBean;
import com.leizhou.mapper.GoodsAttrMapper;
import com.leizhou.mapper.GoodsMapper;
import com.leizhou.viewmodel.ImageViewModel;

@Controller
public class GoodsController {

	@Autowired
	GoodsMapper mapper;

	@Autowired
	GoodsAttrMapper goodsAttrMapper;

	@RequestMapping("/goods")
	public String index(@RequestParam(value="id") int id) {
		return "templates/mall-customer/goods";
	}
	
	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
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
		bean.setPrice((float) jsonObject.getDouble("price"));
		bean.setPromotionalPrice((float) jsonObject.getDouble("promotionalPrice"));
		bean.setIsAgent((byte) (jsonObject.getBoolean("isAgent") ? 1 : 0));
		bean.setIsPromotion((byte) (jsonObject.getBoolean("isPromotion") ? 1 : 0));
		bean.setIsMarket((byte) (jsonObject.getBoolean("isMarket") ? 1 : 0));
		bean.setIsHot((byte) (jsonObject.getBoolean("isHot") ? 1 : 0));
		bean.setIsNew((byte) (jsonObject.getBoolean("isNew") ? 1 : 0));
		bean.setIsIndex((byte) (jsonObject.getBoolean("isIndex") ? 1 : 0));
		bean.setStock(jsonObject.getInt("stock"));
		bean.setGoodsDes(jsonObject.getString("goodsDes"));

		boolean issuccessd = mapper.add(bean);

		List<GoodsAttrBean> goodsAttrlist = new ArrayList<GoodsAttrBean>();
		JSONArray array = jsonObject.getJSONArray("goodsAttr");

		for (int i = 0; i < array.length(); i++) {
			GoodsAttrBean goodsAttrB = new GoodsAttrBean();
			goodsAttrB.setShop_id(jsonObject.getInt("shopId"));
			goodsAttrB.setGoods_id(bean.getId());
			goodsAttrB.setAttr_val_id(array.getInt(i));
			goodsAttrB.setPrice((float) jsonObject.getDouble("price"));
			goodsAttrlist.add(goodsAttrB);
		}

		boolean isSuccessBatch = array.length() > 0 ? goodsAttrMapper.insertBatch(goodsAttrlist) : false;

		return "{successed : " + (issuccessd && isSuccessBatch) + "}";
	}

	@GetMapping("/goods/list")
	@ResponseBody
	public List<GoodsBean> getList(@RequestParam(value = "shopId") int shopId) {
		return mapper.getListByShopId(shopId);
	}
	
	@GetMapping("/goods/getOneGoods")
	@ResponseBody
	public GoodsBean getOne(@RequestParam(value = "goodsId") int goodsId) {
		return mapper.getListByGoodsId(goodsId);
	}
	
	@GetMapping("/goods/getOneBanner")
	@ResponseBody
	public ImageViewModel getOneImgs(@RequestParam(value = "goodsId") int goodsId) {
		ImageViewModel bean = mapper.getImgByGoodsId(goodsId);
		return bean;
	}

	@GetMapping("/goods/listByCat")
	@ResponseBody
	public List<GoodsBean> getListByCat(@RequestParam(value = "categoryId") int categoryId,
			@RequestParam(value = "ex", required = false) String ex) {
		List<String> arr = null;
		if (ex != null && !ex.equals("")) {
			arr = new ArrayList<String>();
			for (String item : ex.split("[/^]")) {
				arr.add(item.split("_")[1]);
			}
		}
		return mapper.getListByCategoryId(categoryId, arr);
	}

	@GetMapping("/goods/getbanner")
	@ResponseBody
	public List<ImageViewModel> getBase64Img(@RequestParam(value = "shopId") int shopId) {
		List<ImageViewModel> bean = mapper.getImgByShopId(shopId);
		return bean;
	}

	@GetMapping("/goods/getbannerByCat")
	@ResponseBody
	public List<ImageViewModel> getImgByCategoryId(@RequestParam(value = "categoryId") int categoryId,
			@RequestParam(value = "ex", required = false) String ex) {
		List<String> arr = null;
		if (ex != null && !ex.equals("")) {
			arr = new ArrayList<String>();
			for (String item : ex.split("[/^]")) {
				arr.add(item.split("_")[1]);
			}
		}

		List<ImageViewModel> bean = mapper.getImgByCategoryId(categoryId, arr);
		return bean;
	}
}
