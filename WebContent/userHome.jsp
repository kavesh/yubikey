<%@page import="java.util.*, java.text.*, java.io.*, com.yubikey.bean.NewUserBean"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Home Page</title>
<% 
NewUserBean userDetails = (NewUserBean)(session.getAttribute("userBean")== null ? "" : 
session.getAttribute("userBean"));
String emailId = "", name = "";
if(userDetails!=null)
{
     emailId = userDetails.getEmailId();
     name = userDetails.getName();
}
else
{
     String reLoginURL = "/finalProject/loginTest.jsp"; 
     response.sendRedirect(reLoginURL + "?PA1= Session Expired");
}
%>
</head>
<body>
<table width="50%" border="0" cellspacing="1" cellpadding="1" align="center">
<tr>
<td>
<h3>Welcome User</h3>
</td>
<td align="right">
<a href="/finalProject/logout.jsp">LOGOUT</a>
</td>
</tr>
<tr>
<td>
Welcome User : <%=emailId %>
</td>
</tr>
<tr>
<td>
Name : <%=name %>
</td>
</tr>
</table>
</body>
</html>