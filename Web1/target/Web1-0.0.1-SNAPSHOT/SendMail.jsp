<%@page import="com.leizhou.www.Utility.Common"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,javax.mail.*"%>
<%@ page import="javax.mail.internet.*,javax.activation.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>发送邮件</title>
</head>
<body>
	<%
		String to = "mail.lei.zhou@gmail.com";
		String from = "21244026@qq.com";
		String result;
		// 假设你是从本地主机发送电子邮件
		   String host = "smtp.qq.com";
		
		   // 获取系统属性对象
		   Properties properties = System.getProperties();

		   // 设置邮件服务器
		   properties.setProperty("mail.smtp.host", host);
		   properties.setProperty( "mail.smtp.auth", "true" );
		   properties.setProperty( "mail.transport.protocol", "smtp" );
           //SMTP邮件服务器
           
           //SMTP邮件服务器默认端口
           properties.setProperty( "mail.smtp.port", "587" );
		   
		   // 获取默认的Session对象。
		   Session mailSession = Session.getDefaultInstance(properties);
		   // 根据session对象获取邮件传输对象Transport
           Transport transport = mailSession.getTransport();
		   try{
		      // 创建一个默认的MimeMessage对象。
		      MimeMessage message = new MimeMessage(mailSession);
		      
		      // 设置 From: 头部的header字段
		      message.setFrom(new InternetAddress(from));
		      // 设置 To: 头部的header字段
		      message.addRecipient(Message.RecipientType.TO,
		                               new InternetAddress(to));
		      message.setHeader("Content-Type", "text/plain; charset=UTF-8");
		      // 设置 Subject: header字段
		      message.setSubject("This is the Subject Line!");
		      // 现在设置的实际消息
		      message.setText("This is actual message","text/plain; charset=UTF-8");
		      transport.connect("21244026@qq.com","freedom2012");
	            // 发送邮件，并发送到所有收件人地址，message.getAllRecipients() 获取到的是在创建邮件对象时添加的所有收件人, 抄送人, 密送人
	          transport.sendMessage( message, message.getAllRecipients() );
		      // 发送消息
		      //transport.send(message);
		      result = "Sent message successfully....";
		   }catch (MessagingException mex) {
		      mex.printStackTrace();
		      result = "Error: unable to send message....";
		   }
	%>
	<p align="center">
	${param["name"] }
	<% 
	   out.println("Result: " + result + "\n");
	%>
	</p>
</body>
</html>