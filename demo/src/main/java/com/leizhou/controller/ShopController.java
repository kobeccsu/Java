package com.leizhou.controller;


import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
	public List<ShopBean> getList(@RequestParam(value="pageIndex") int pageIndex, @RequestParam(value="pageSize") int pageSize,
			@RequestParam(value="queryText") String queryText) {
		return shopMapper.getList(pageIndex,pageSize,queryText);
	}
}
