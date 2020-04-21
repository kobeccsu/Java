package com.leizhou;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet Filter implementation class LogFilter
 */
@WebFilter("/LogFilter")
public class LogFilter implements Filter {

    /**
     * Default constructor. 
     */
    public LogFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		// place your code here
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		String currentPath =  req.getRequestURI();
		
		if (req.getSession().getAttribute("user") == null){
			System.out.println("User is Anonymous");
		} else {
			System.out.println("Welcome");
		}
		
		if (currentPath.matches(".*sysadmin[/].*[.]jsp") ) {
			Object roles = req.getSession().getAttribute("roles");
			String[] roleArr = null;
			if(roles!= null) {
				roleArr = roles.toString().split(",");
			}
			
			boolean isAdmin = false;
			if (roleArr != null && roleArr.length > 0) {
				for (int i = 0; i < roleArr.length; i++) {
					if (roleArr[i].equalsIgnoreCase("admin")) {
						isAdmin = true;
					}
				}
			}
			if (!isAdmin) {
				res.sendRedirect(req.getContextPath() + "/" + "index.jsp");
			}
		}
		// pass the request along the filter chain
		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
