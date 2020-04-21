package com.leizhou;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.leizhou.biz.DBUsers;
import com.leizhou.dto.UserBean;
import com.leizhou.www.Utility.PasswordUtils;

/**
 * Servlet implementation class HandleThis
 */
@WebServlet("/leizhou/HandleThis")
public class HandleThis extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public HandleThis() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name = request.getParameter("name");
		response.getWriter().append("Served at: ").append(request.getContextPath()).append(name);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		boolean isValidUser = false;
	
		UserBean userBean = new DBUsers().getUser(request.getParameter("username"));
		if(userBean != null)
			isValidUser = PasswordUtils.verifyUserPassword(request.getParameter("password"), userBean.getPassword(), userBean.getSalt());
		
		if (isValidUser) {
			HttpSession session = request.getSession();
			session.setAttribute("user", userBean.getUsername());
			session.setAttribute("roles", userBean.getRoles());
			getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
			return;
		}
			
		HttpSession session = request.getSession();
		session.setAttribute("user", null);
		getServletContext().getRequestDispatcher("/message.jsp").forward(request, response);
		
		
	}

}
