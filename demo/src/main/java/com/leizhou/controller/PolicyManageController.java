package com.leizhou.controller;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.leizhou.biz.DBPolicy;

@Controller
public class PolicyManageController {
	
	@GetMapping({"/sysadmin/policy"})
	public String roleView() {
		return "jsp/sysadmin/policy";
	}
	
	@GetMapping("/Policy")
	@ResponseBody
	public String getDefault(@RequestParam(value="pageIndex") int pageIndex, @RequestParam(value="pageSize") int pageSize,
			@RequestParam(value="queryText") String queryText) throws ClassNotFoundException, SQLException {
		DBPolicy db = new DBPolicy();
		LinkedList<com.leizhou.dto.Policy> list = db.getPolicyList(pageIndex,pageSize, queryText);
		Gson json = new Gson();
		int totalCount  = db.getTotalCount(queryText);
		
		return "{\"data\":"+ json.toJson(list) + " ,\"totalCount\":" 
				+ (totalCount % pageSize == 0 ? totalCount / pageSize : totalCount / pageSize + 1) + "}";
	}
	
	@GetMapping("/Policy/getPolicies")
	@ResponseBody
	public String getPolicies(@RequestParam(value="roleId") int roleId) throws ClassNotFoundException, SQLException {
		DBPolicy db = new DBPolicy();
		LinkedList<com.leizhou.dto.Policy> list = db.getPolicyList(roleId);
		Gson json = new Gson();
		
		return "{\"data\":"+ json.toJson(list) + " ,\"totalCount\":" + 0 + "}";
	}
	
	@PostMapping("/Policy/add")
	@ResponseBody
	public String addPolicy(@RequestBody String json) {
		JSONObject jsonObject = new JSONObject(json.toString());
		boolean isSuccess = false;
		String policyName = jsonObject.getString("policyname");
		isSuccess = new DBPolicy().addPolicy(policyName);
		return "{\"issuccess\":" + isSuccess + "}";
	}
	
	@PostMapping("/Policy/delete")
	@ResponseBody
	public String deletePolicy(@RequestBody String json) {
		JSONObject jsonObject = new JSONObject(json.toString());
		int id = jsonObject.getInt("id");
		boolean isSuccess = new DBPolicy().deletePolicy(id);
		return "{\"issuccess\":" + isSuccess + "}";
	}
	
	@PostMapping("/Policy/update")
	@ResponseBody
	public String updatePolicy(@RequestBody String json) {
		JSONObject jsonObject = new JSONObject(json.toString());
		com.leizhou.dto.Policy policy =new com.leizhou.dto.Policy();
		policy.setId(jsonObject.getInt("id"));
		policy.setPolicyname(jsonObject.getString("policyname"));
		boolean isSuccess = new DBPolicy().updatePolicy(policy);
		return "{\"issuccess\":" + isSuccess + "}";
	}
}
