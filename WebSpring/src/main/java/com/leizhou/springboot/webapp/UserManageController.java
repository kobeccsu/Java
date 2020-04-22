package com.leizhou.springboot.webapp;

import java.sql.SQLException;
import java.util.LinkedList;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.leizhou.biz.DBUsers;

@Controller
public class UserManageController {
	
	@GetMapping({"/sysadmin/adminUser"})
	public String UserView() {
		return "/sysadmin/adminUser";
	}
	
	@GetMapping(value ="/UserService", produces = MediaType.APPLICATION_JSON_VALUE)
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
			response.setContentType("application/json"); 
			response.setCharacterEncoding("utf-8"); 
			response.getWriter().append("{\"data\":"+ json.toJson(list) + " ,\"totalCount\":" 
					+ (totalCount % pageSize == 0 ? totalCount / pageSize : totalCount / pageSize + 1) + "}");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
