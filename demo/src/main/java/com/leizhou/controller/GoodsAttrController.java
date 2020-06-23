package com.leizhou.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.leizhou.biz.DBPolicy;
import com.leizhou.dto.AttributeBean;
import com.leizhou.mapper.AttributeMapper;
import com.leizhou.viewmodel.AttributeValuesViewModel;

@Controller
public class GoodsAttrController {

	AttributeMapper mapper;
	public GoodsAttrController(AttributeMapper mp) {
		mapper = mp;
	}
	
	@GetMapping("/goodsAttr")
	public String index(@RequestParam(value = "shopId") int shopId) {
		return "templates/edit-mall/goods_attr";
	}
	
	@PostMapping("/attr/add")
	@ResponseBody
	public String addAttr(@RequestBody String json) {
		JSONObject jsonObject = new JSONObject(json.toString());
		boolean isSuccess = false;
		String name = jsonObject.getString("attrName");
		Integer shopId = jsonObject.getInt("shopId");
		Integer categoryId = jsonObject.getInt("categoryId");
		AttributeBean bean = new AttributeBean();
		bean.setShopId(shopId);
		bean.setCategoryId(categoryId);
		bean.setAttrName(name);
		isSuccess = mapper.add(bean);
		return "{\"issuccess\":" + isSuccess + "}";
	}
	
	@GetMapping("/attr/list")
	@ResponseBody
	public List<AttributeValuesViewModel> getList(@RequestParam(value="categoryId") int categoryId) {
		return mapper.getList(categoryId);
	}
}
