package com.leizhou.controller;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	org.slf4j.Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping("/")
	public String home() {
		logger.debug("1111");
		logger.error("2222");
		return "templates/index";
	}
}
