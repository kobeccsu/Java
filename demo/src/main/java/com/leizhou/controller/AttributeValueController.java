package com.leizhou.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.leizhou.dto.AttributeValueBean;
import com.leizhou.mapper.AttributeValueMapper;


@Controller
public class AttributeValueController {

	@Autowired
	AttributeValueMapper attrValMapper;
	
	@PostMapping("/attrval/add")
	@ResponseBody
	public String add(@RequestBody String json) {
		JSONObject jsonObject = new JSONObject(json.toString());
		AttributeValueBean bean = new AttributeValueBean();
		bean.setShopId(jsonObject.getInt("shopId"));
		bean.setAttrId(jsonObject.getInt("attrId"));
		bean.setAttrValue(jsonObject.getString("attrValue"));
		boolean isSuccess = attrValMapper.insert(bean);
		return "{isSuccess:" + isSuccess + "}";
	}
	
	@PostMapping("/attrval/update")
	@ResponseBody
	public String update(@RequestBody String json) {
		JSONObject jsonObject = new JSONObject(json.toString());
		AttributeValueBean bean = new AttributeValueBean();
		bean.setId(jsonObject.getInt("id"));
		bean.setAttrValue(jsonObject.getString("attrValue"));
		boolean isSuccess = attrValMapper.update(bean);
		return "{isSuccess:" + isSuccess + "}";
	}
	
	@PostMapping("/attrval/delete")
	@ResponseBody
	public String delete(@RequestBody String json) {
		JSONObject jsonObject = new JSONObject(json.toString());
		AttributeValueBean bean = new AttributeValueBean();
		bean.setId(jsonObject.getInt("id"));
		boolean isSuccess = attrValMapper.delete(bean);
		return "{isSuccess:" + isSuccess + "}";
	}
}
