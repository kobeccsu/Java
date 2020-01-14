<%@page import="com.leizhou.RendService"%>
<%@page import="com.leizhou.BeanLoadConfig"%>
<%@page import="com.leizhou.Student"%>
<%@page import="org.springframework.context.annotation.AnnotationConfigApplicationContext"%>
<%@page import="com.leizhou.ProductService"%>
<%@page import="org.eclipse.core.internal.runtime.Product"%>
<%@page import="com.leizhou.LeiBean"%>
<%@page import="com.leizhou.www.Utility.Common"%>
<%@page import="java.util.GregorianCalendar"%>
<%@page import="java.awt.GradientPaint"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Enumeration"%>
<%@page import="org.springframework.web.context.WebApplicationContext" %>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="org.springframework.context.ApplicationContext" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<jsp:useBean id="lei" class="com.leizhou.LeiBean" scope="page" />
<jsp:setProperty property="name" name="lei" value="周磊" />
<jsp:setProperty property="age" name="lei" value="18" />

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Insert title here</title>
		
	</head>
	<style type="text/css">
		.center{
			background:red;
			Height:200px;
		}
	</style>
<body>
	<%!private int initVar = 0;
		private int serviceVar=0;
	  	private int destroyVar=0;%>
	
	<%!public void jspInit1(){
			initVar++;
	    	System.out.println("jspInit(): JSP被初始化了" + initVar + "次");
		}
	
		public void jspDestroy(){
		    destroyVar++;
		    System.out.println("jspDestroy(): JSP被销毁了" + destroyVar + "次");
	  	}%>
	<%
	  serviceVar++;
	  System.out.println("_jspService(): JSP共响应了" + serviceVar + "次请求");
	
	  String content1 = "初始化次数 : " + initVar;
	  String content2 = "响应客户请求次数 : " + serviceVar;
	  String content3 = "销毁次数 : " + destroyVar;
	%>
	<div class="header">
		<p>Your local IP is : <%= request.getRemoteAddr() %></p>
		<label><%= request.getRequestURL() %></label>
	</div>
	<div class="center">
		<% out.println("I's me"); %>
	</div>
	<div class="footer">
		<p><%=content1 %></p>
		<p><%=content2 %></p>
		<p><%=content3 %></p>
	</div>
	
	<!-- 开始循环 -->
	<% for (int i = 1; i<= 4; i++){ %>
		<p style="font-size:<%= i * 10 %>px">我是一个字体</p>
	<%} %>
	
	<jsp:include page="index.jsp"></jsp:include>
	<br/>
	<h2>try to use bean</h2>
	<p>the user name : <%= lei.getName() %></p>
	<p>the user age : <%= lei.getAge() %></p>
	
	<%
		Enumeration token = request.getHeaderNames();
		while(token.hasMoreElements()){
			String headerKey = (String)token.nextElement();
			out.print("key is: " + headerKey + "<br />");
			String headerValue = request.getHeader(headerKey);
			out.print("value is: " + headerValue + "<br />");
		}
	%>
	
	<% 
		//response.setIntHeader("Refresh", 5);
		Calendar calendar = new GregorianCalendar();
		String am_pm;
		int hour = calendar.get(Calendar.HOUR);
		int min = calendar.get(Calendar.MINUTE);
		int sec = calendar.get(Calendar.SECOND);
		
		if(calendar.get(Calendar.AM_PM) == 0)
		      am_pm = "AM";
		   else
		      am_pm = "PM";
		   String CT = hour+":"+ min +":"+ sec +" "+ am_pm;
		   out.println("当前时间: " + CT + "\n");
	%>
	
	<%
		out.println("获取一个参数" + request.getParameter("lambda"));
	%>
	
	<form action="DealForm.jsp" method="post">
		<input type="text" name="name">
		<input type="password" name="psw">
		<input type="checkbox" name="cbk" >
		<input type="radio" name="radio">
		<input type="radio" name="radio">
		<input type="submit" value="Submit">
	</form>
	
	<%
		Cookie cookie = new Cookie("yourstore", "gggg");
		response.addCookie(cookie);
		
		out.print("sessionId : " + session.getId());
		//out.print("here is the reference project:" + Common.call()); 
		
		//ServletContext context = request.getSession().getServletContext();
		//ApplicationContext appContext = WebApplicationContextUtils.getWebApplicationContext(context);
		
		//LeiBean bean = (LeiBean)appContext.getBean("Lei");
		//out.print("I use spring, get the handsome leis' age is " + bean.getAge());
		
		out.print("<br/>");
		
		
		// use new way to load IOC
		ApplicationContext appContext = new AnnotationConfigApplicationContext(BeanLoadConfig.class);
		Student student = (Student)appContext.getBean("student");
		/* out.print("<br />");
		out.print("student name: " + student.getName());
		out.print("student id: " + student.getId());   */
		
		ProductService service = (ProductService)appContext.getBean("productService");
		service.doSomeService(); 
		
		RendService service1 = (RendService)appContext.getBean("rendservice");
		service1.service();
	%>
</body>
</html>