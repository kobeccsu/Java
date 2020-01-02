<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import="java.io.*,java.util.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>文件上传结果</title>
</head>
<body>
	<div>
		${message}
	</div>
	<%
		Date date = new Date();
		out.println("<p>" + date.toString() + "</p>");
		
	%>
	<hr/>
	<% 
		SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		out.println("<lable>The format date is :</label><div>" + ft.format(date) + "</div>");
		//response.setStatus(response.SC_MOVED_TEMPORARILY);
		//response.setHeader("Location", "http://www.baidu.com");
	%>
	<%
		Integer count = (Integer)application.getAttribute("hitCounter");
		if (count == null || count == 0 ){
			out.println("欢迎您第一次访问");
			count = 1;
		} else {
			out.println("欢迎你老朋友" + count);
			count++;
		}
		application.setAttribute("hitCounter", count);
	%>
</body>
</html>
