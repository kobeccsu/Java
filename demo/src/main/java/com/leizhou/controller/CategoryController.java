package com.leizhou.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CategoryController {
	
	@GetMapping("/category")
	public String index() {
		return "templates/edit-mall/category";
	}
	
	
}
