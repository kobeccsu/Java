package com.leizhou.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedList;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.leizhou.biz.DBRole;
import com.leizhou.util.Utility;

@Controller
public class RoleManageController {
	
	@GetMapping({"/sysadmin/role"})
	public String roleView() {
		return "jsp/sysadmin/role";
	}
	
	@RequestMapping("/RoleService")
	@ResponseBody
	public String getPageDefault(@RequestParam(value="pageIndex") int pageIndex, @RequestParam(value="pageSize") int pageSize,
			@RequestParam(value="queryText") String queryText) throws ClassNotFoundException, SQLException {
		
		DBRole db = new DBRole();
		LinkedList<com.leizhou.dto.RoleBean> list = db.getRoleList(pageIndex, pageSize, queryText);
		Gson json = new Gson();
		int totalCount  = db.getTotalCount(queryText);
		return "{\"data\":"+ json.toJson(list) + " ,\"totalCount\":" 
				+ (totalCount % pageSize == 0 ? totalCount / pageSize : totalCount / pageSize + 1) + "}";
	}
	
	@RequestMapping("/RoleService/getall")
	@ResponseBody
	public String getAllById(@RequestParam(value="userId") int userId) throws ClassNotFoundException, SQLException {
		DBRole db = new DBRole();
		LinkedList<com.leizhou.dto.RoleBean> list = db.getRoleList(userId);
		Gson json = new Gson();
		return "{\"data\":"+ json.toJson(list) + " ,\"totalCount\":" + 10 + "}";
	}
	
	@PostMapping("/RoleService/add")
	@ResponseBody
	public String addRole(@RequestBody String json) throws ClassNotFoundException, SQLException {
		JSONObject jsonObject = new JSONObject(json.toString());
		String roleName = jsonObject.getString("rolename");
		boolean isSuccess = false;
		ArrayList<Integer> list = Utility.parseJsonToInt(jsonObject, "policies", "id"); 
		isSuccess = new DBRole().addRole(roleName, list);
		return "{\"issuccess\":" + isSuccess + "}";
	}
	
	@PostMapping("/RoleService/delete")
	@ResponseBody
	public String deleteRole(@RequestBody String json) {
		JSONObject jsonObject = new JSONObject(json.toString());
		boolean isSuccess = false;
		int id = jsonObject.getInt("id");
		try {
			isSuccess = new DBRole().deleteRole(id);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "{\"issuccess\":" + isSuccess + "}";
	}
	
	@PostMapping("/RoleService/update")
	@ResponseBody
	public String updateRole(@RequestBody String json) {
		JSONObject jsonObject = new JSONObject(json.toString());
		boolean isSuccess = false;
		com.leizhou.dto.RoleBean role = new com.leizhou.dto.RoleBean();
		role.setId(jsonObject.getInt("id"));
		role.setRolename(jsonObject.getString("rolename"));
		ArrayList<Integer> list = Utility.parseJsonToInt(jsonObject, "policies", "id");  
		try {
			isSuccess = new DBRole().updateRole(role, list);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "{\"issuccess\":" + isSuccess + "}";
	}
}
