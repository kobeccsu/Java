package com.leizhou.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.leizhou.mapper.UsersMapper;
import com.leizhou.dto.*;

@RestController
public class MybatisUserController {
	
	private UsersMapper usersMapper;
	
	public MybatisUserController(UsersMapper uMapper) {
		this.usersMapper= uMapper;
	}
	
	@GetMapping("/User/all")
	public java.util.List<UserBean> getAll(){
		return usersMapper.getAll();
	}
	
}
