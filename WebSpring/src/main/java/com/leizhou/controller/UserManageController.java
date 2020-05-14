package com.leizhou.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedList;

import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.leizhou.biz.DBUsers;
import com.leizhou.util.Utility;

@Controller
public class UserManageController {
	
	@GetMapping({"/sysadmin/adminUser"})
	public String UserView() {
		return "jsp/sysadmin/adminUser";
	}
	
	
	@GetMapping(value ="/UserService", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String UserList(@RequestParam(value = "pageIndex") String pageIndex, @RequestParam(value="pageSize") String pageSize,
			@RequestParam(value="queryText") String queryText) {
		DBUsers db = new DBUsers();
		int _pageIndex = Integer.parseInt(pageIndex);
		int _pageSize = Integer.parseInt(pageSize);
		String _queryText = queryText;
		
		try {
			LinkedList<com.leizhou.dto.UserBean> list = db.getUserList(_pageIndex, _pageSize, _queryText);
			Gson json = new Gson();
			int totalCount  = db.getTotalCount(queryText);
			
			return "{\"data\":"+ json.toJson(list) + " ,\"totalCount\":" 
					+ (totalCount % _pageSize == 0 ? totalCount / _pageSize : totalCount / _pageSize + 1) + "}";
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "{\"msg\" : \"error\"}";
	}
	
	@PostMapping(value ="/UserService/update")
	@ResponseBody
	public String updateUser(@RequestBody String json) throws ClassNotFoundException, SQLException {
		JSONObject jsonObject = new JSONObject(json.toString());
		com.leizhou.dto.UserBean userBean = new com.leizhou.dto.UserBean();
		userBean.setId(jsonObject.getInt("id"));
		ArrayList<Integer> list = Utility.parseJsonToInt(jsonObject, "roles", "id");
		
		boolean	isSuccess = new DBUsers().updateUserRoleRef(userBean, list);
		return "{\"issuccess\":" + isSuccess + "}";
	}
}
