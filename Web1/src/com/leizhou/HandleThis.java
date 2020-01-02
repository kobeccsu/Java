package com.leizhou;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
		if (request.getParameter("password").equals("123456") && request.getParameter("username").equals("zhoulei")) {
			HttpSession session = request.getSession();
			session.setAttribute("user", "zhoulei");
			getServletContext().getRequestDispatcher("/Index.html").forward(request, response);
			return;
		}
		getServletContext().getRequestDispatcher("/message.jsp").forward(request, response);
	}

}
