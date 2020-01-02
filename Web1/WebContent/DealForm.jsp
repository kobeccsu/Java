<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>This is Deal Form</title>
</head>
<body>
	<label>name is:</label><%= request.getParameter("name") %><br />
	<label>password is:</label><%= request.getParameter("psw") %><br />
	<label>checkbox is </label><%= request.getParameter("cbk") %><br/>
	<label>radio is </label><%= request.getParameter("radio") %><br/>
</body>
</html>