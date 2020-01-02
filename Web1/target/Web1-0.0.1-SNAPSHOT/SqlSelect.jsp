<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Select操作</title>
</head>
<body>
	<sql:setDataSource var="snapshot" driver="com.mysql.cj.jdbc.Driver"
		url="jdbc:mysql://127.0.0.1:3306/RUNOOB?useUnicode=true&characterEncoding=utf-8&useSSL=false&allowPublicKeyRetrieval=true"
		user="root"  password="zl7758258" />
		
	<sql:query dataSource="${snapshot}" var="result">select * from websites;</sql:query>
	
	<h1>JSP 数据库实例 - 菜鸟教程</h1>
	<table border="1" width="100%">
	<tr>
	   <th>ID</th>
	   <th>站点名</th>
	   <th>站点地址</th>
	</tr>
	<c:forEach var="row" items="${result.rows}">
	<tr>
	   <td><c:out value="${row.id}"/></td>
	   <td><c:out value="${row.name}"/></td>
	   <td><c:out value="${row.url}"/></td>
	</tr>
	</c:forEach>
	</table>
</body>
</html>