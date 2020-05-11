package com.leizhou.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@WebFilter(filterName = "AuthFilter", urlPatterns = "/sysadmin/*")
public class CustAuthenticationFilter implements Filter{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		Object roles = req.getSession().getAttribute("roles");
		String[] roleArr = null;
		if (roles != null) {
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
			res.sendRedirect("/login");
		}
		chain.doFilter(request, response);
	}
}
