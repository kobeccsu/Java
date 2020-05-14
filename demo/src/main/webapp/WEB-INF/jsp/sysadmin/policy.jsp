<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Policy Management</title>
	<link rel="shortcut icon" href="#" />
	<style>
		.edit,.del,.pager .wrap-pager span{
			color:blue;
			cursor:pointer;
		}
		.pager .wrap-pager span{
			margin-right:10px;
		}
	</style>
</head>
<body>
	<div>
		<jsp:include page="menu-layout.jsp"/>
		<div id="topbar" class="container"></div>

		<script src="/static/dist/js/sysadmin/policy.js"></script>
	</div>
</body>
</html>