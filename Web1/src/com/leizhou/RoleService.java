package com.leizhou;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;
import java.util.LinkedList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.google.gson.Gson;
import com.leizhou.biz.DBRole;

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
		DBRole db = new DBRole();
		int pageIndex = Integer.parseInt(request.getParameter("pageIndex"));
		int pageSize = Integer.parseInt(request.getParameter("pageSize"));
		String queryText = request.getParameter("queryText");
		
		try {
			LinkedList<com.leizhou.dto.RoleBean> list = db.getRoleList(pageIndex,pageSize, queryText);
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
			isSuccess = new DBRole().addRole(roleName);
		} else if(action.equalsIgnoreCase("delete")){
			int id = jsonObject.getInt("id");
			isSuccess = new DBRole().deleteRole(id);
		} else if(action.equalsIgnoreCase("update")){
			com.leizhou.dto.RoleBean role = new com.leizhou.dto.RoleBean();
			role.setId(jsonObject.getInt("id"));
			role.setRolename(jsonObject.getString("rolename"));
			isSuccess = new DBRole().updateRole(role);
		}
		
		response.getWriter().write("{\"issuccess\":" + isSuccess + "}");
	}

}
