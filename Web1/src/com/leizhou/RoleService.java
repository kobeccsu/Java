package com.leizhou;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.leizhou.biz.DBRole;
import com.leizhou.util.Utility;

/**
 * Servlet implementation class RoleService
 */
@WebServlet("/RoleService/*")
public class RoleService extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RoleService() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		DBRole db = new DBRole();
		Map<String, String[]> reqList = request.getParameterMap();
		int pageIndex = Integer.parseInt(reqList.containsKey("pageIndex") ?  request.getParameter("pageIndex") : "0");
		int pageSize = Integer.parseInt(reqList.containsKey("pageSize") ? request.getParameter("pageSize") : "10");
		String queryText = reqList.containsKey("queryText") ? request.getParameter("queryText") : "";
		int userId = Integer.parseInt(reqList.containsKey("userId") ? request.getParameter("userId") : "0");

		String requestPath = request.getPathInfo();
		String action = "";
		if (requestPath != null) {
			int subString = requestPath.lastIndexOf("/") + 1;
			action =  requestPath.substring(subString, requestPath.length());
		}
		try {
			LinkedList<com.leizhou.dto.RoleBean> list = action.equalsIgnoreCase("getall") ? db.getRoleList(userId) : db.getRoleList(pageIndex,pageSize, queryText); 
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

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String requestPath = request.getPathInfo();
		int subString = requestPath.lastIndexOf("/") + 1;
		String action =  requestPath.substring(subString, requestPath.length());
		
		 
		StringBuffer strBuffer = new StringBuffer();
		String str = null;
		BufferedReader reader = request.getReader();
		while ((str = reader.readLine()) != null) {
			strBuffer.append(str);
		}
		
		JSONObject jsonObject = new JSONObject(strBuffer.toString());
		
		boolean isSuccess = false;
		
		if (action.equalsIgnoreCase("add")){
			String roleName = jsonObject.getString("rolename");
			
			ArrayList<Integer> list = Utility.parseJsonToInt(jsonObject, "policies", "id"); 
			try {
				isSuccess = new DBRole().addRole(roleName, list);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} else if(action.equalsIgnoreCase("delete")){
			int id = jsonObject.getInt("id");
			try {
				isSuccess = new DBRole().deleteRole(id);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} else if(action.equalsIgnoreCase("update")){
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
		}
		
		response.getWriter().write("{\"issuccess\":" + isSuccess + "}");
	}
}
