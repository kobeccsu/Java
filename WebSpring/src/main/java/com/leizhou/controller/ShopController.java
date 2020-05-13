package com.leizhou.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ShopController {
	
	public ShopController() {
		
	}
	
	@GetMapping("/shop/management")
	public String getIndex() {
		return "static/index";
	}
}
