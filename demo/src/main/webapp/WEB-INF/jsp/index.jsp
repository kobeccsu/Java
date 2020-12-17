<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-Frame-Options" content="allow">
<title>我的Java主页</title>
<style type="text/css">
	.label{
		width: 200px;
	}
</style>
</head>
<body>
	<% HttpSession session1 = request.getSession();
	   Object username = session1.getAttribute("user");
	%>

	<div>
	<%if(username == null) {%>
		<h1>Login</h1>
		<form action="<%=request.getContextPath()%>/login" method="post">
			<div >
				<span class="label"><label>用户名:</label></span>
				<span><input type="text" name="username" /></span>
			</div>
			<div>
				<span class="label"><label>密码:</label></span>
				<span><input type="password" name="password" /></span>
			</div>
			<div>
				<input type="submit" value="Submit" />
			</div>
		</form>
		<%} else{%>
			<%= "Welcome back " + username.toString() %>
			<script>
			setTimeout( function(){
			    history.go(-1);
			}, 1000);
			</script>
		<%} %>
		
	</div>
</body>
</html>