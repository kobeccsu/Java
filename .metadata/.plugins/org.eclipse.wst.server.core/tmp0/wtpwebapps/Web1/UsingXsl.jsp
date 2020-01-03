<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Using Xsl</title>
</head>
<body>
	<h3>Books Info:</h3>
	<c:set var="xmltext"><books>
		    <book>
		      <name>Padam History</name>
		      <author>ZARA</author>
		      <price>100</price>
		    </book>
		    <book>
		      <name>Great Mistry</name>
		      <author>NUHA</author>
		      <price>2000</price>
		    </book>
	  	</books>
	</c:set>
	
	<c:import url="http://localhost:8080/Web1/BookStylesheet.xsl" var="xslt" />
	<x:transform xml="${xmltext}" xslt="${xslt}" />
</body>
</html>