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
import com.leizhou.dto.ShopBean;
import com.leizhou.mapper.ShopMapper;

@Controller
public class ShopController {

	public ShopController(ShopMapper shoperMapper) {
		shopMapper = shoperMapper;
	}

	private ShopMapper shopMapper;

	@GetMapping("/shop/management")
	public String getIndex() {
		return "templates/edit-mall/shop";
	}

	@GetMapping("/shop/list")
	@ResponseBody
	public List<ShopBean> getList(@RequestParam(value = "pageIndex") int pageIndex,
			@RequestParam(value = "pageSize") int pageSize, @RequestParam(value = "queryText") String queryText) {
		return shopMapper.getList(pageIndex, pageSize, queryText);
	}

	@PostMapping("/shop/add")
	@ResponseBody
	public String add(@RequestBody String json) {
		JSONObject jsonObject = new JSONObject(json.toString());
		boolean isSuccess = false;
		ShopBean bean = new ShopBean();
		bean.setName(jsonObject.getString("name"));
		bean.setTheme(jsonObject.getString("theme"));
		bean.setIsClosed((byte)(jsonObject.getBoolean("is_closed") ? 1 : 0));
		
		shopMapper.add(bean);
		
		return "{\"issuccess\":" + isSuccess + "}";
	}
	
	@PostMapping("/shop/update")
	@ResponseBody
	public String update(@RequestBody String json) {
		JSONObject jsonObject = new JSONObject(json.toString());
		boolean isSuccess = false;
		ShopBean bean = new ShopBean();
		bean.setId(jsonObject.getInt("id"));
		bean.setName(jsonObject.getString("name"));
		bean.setTheme(jsonObject.getString("theme"));
		bean.setIsClosed((byte)(jsonObject.getBoolean("is_closed") ? 1 : 0));
		
		shopMapper.update(bean);
		
		return "{\"issuccess\":" + isSuccess + "}";
	}
}

