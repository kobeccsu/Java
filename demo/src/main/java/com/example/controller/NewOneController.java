package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NewOneController {
	@GetMapping("/")
	@ResponseBody
	public String Get() {
		return "Hello1111";
	}
}