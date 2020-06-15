package com.leizhou.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GoodsAttrController {

	@GetMapping("/goodsAttr")
	public String index() {
		return "templates/edit-mall/goods_attr";
	}
	
}
