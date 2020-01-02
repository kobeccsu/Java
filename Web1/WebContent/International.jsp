<%@page import="java.util.Arrays"%>
<%@page import="com.leizhou.Car"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.HashSet"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.Locale" %>
<%@ page import="java.text.DateFormat,java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Global</title>
</head>
<body>
	<% Locale locale = request.getLocale(); %>
<%-- 	<%= locale.getCountry() %>
	<%= DateFormat.getDateTimeInstance(DateFormat.FULL, DateFormat.SHORT, locale).format(new Date()) %> --%>
	<%
		/* TreeSet hset = new TreeSet();
		hset.add("111");
		hset.add("222");
		hset.add("222");
		hset.add(333);
		hset.add(true);
		
		Iterator it = hset.iterator();
		while (it.hasNext()){
			out.println(it.next());
		} */
		
//		Car car = new Car(1.1, "Mac");
// 		String[] list = {"hehe", "haha"};
// 		System.out.println(Arrays.toString(list));
// 		int i=3;
// 		do{
// 			out.println(i--);
// 		}while(i > 0);
		
		double power = Math.pow(5, 3);
		out.println(power);
	%>
	
</body>
</html>