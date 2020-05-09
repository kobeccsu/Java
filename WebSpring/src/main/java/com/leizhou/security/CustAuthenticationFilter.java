package com.leizhou.security;

import java.io.Console;
import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class CustAuthenticationFilter implements Filter{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		System.out.println("Hello");
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		String currentPath =  req.getRequestURI();
		
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

}