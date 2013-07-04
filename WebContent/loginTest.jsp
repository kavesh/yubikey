<%@page import="java.util.*, java.text.*, java.io.*, com.yubikey.util.FetchProperties"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Login</title>
<link rel="stylesheet" media="all" type="text/css" href="css/ui-lightness/jquery-ui-1.8.16.custom.css" />
<link rel="stylesheet" media="all" type="text/css" href="css/style.css" />
<script src="js/jquery-1.6.2.min.js" type="text/javascript"></script>
<script src="js/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
<script type="text/javascript" src="js/validateFields.js"></script>
<style type="text/css">
<!--
body,td,th {
    font-family: Geneva, Arial, Helvetica, sans-serif;
}
.style4 {font-size: 12px}
-->
</style>

<script type="text/javascript">
$(document).ready(function(){
$("#msgClass").delay(3000).fadeOut("slow");
});

function callFormValidatorSample(){
    var test=ValidateForm();
    if(test){
    	return test;
    }
    $("#otp").val("");
    return test;   
}

</script>
<%
String msg = request.getParameter("PA1") == null ? "" : request.getParameter("PA1");
msg = msg.trim();
if(msg.equalsIgnoreCase("RA2FDQ"))
	msg=FetchProperties.getPropertyValue("app.yubikey.match");
if(msg.equalsIgnoreCase("RD5H9J"))
	msg=FetchProperties.getPropertyValue("app.yubikey.invalid");
if(msg.equalsIgnoreCase("RT78BW"))
	msg=FetchProperties.getPropertyValue("app.yubikey.format");
if(msg.equalsIgnoreCase("RFQ6TY"))
	msg=FetchProperties.getPropertyValue("app.yubikey.username");
if(msg.equalsIgnoreCase("EDF907"))
	msg=FetchProperties.getPropertyValue("app.yubikey.lockuser");
%>
</head>
<body><center>
    <h1>Secure Login Form</h1>
    <hr size=5>
    <p>&nbsp;</p>
<form action="/finalProject/yubiKeyRegister" method="post" name="loginForm" id="loginForm" autocomplete="off">
	<%if(msg != null && msg != "") {%>
		<div id="msgClass">
			<label style="color:red; width:950px; margin-top: 8px; margin-left: 50px;" >
	      	<%= msg%>
	      	</label>
      	</div>
      	<%} %>
      <table width="262" border="0">
       <tr>
        <td width="102"><div align="right" class="style4">Email Id:</div></td>
        <td width="150"><input name="username" type="text" id="username" class="toValidate"></td>
      </tr>
      <tr>
        <td><div align="right" class="style4">PASSWORD:</div></td>
        <td><input name="password" type="password" id="password" class="toValidate" ></td>
      </tr>
      <tr>
        <td><div align="right" class="style4">YUBIKEY CODE:</div></td>
        <td><input name="otp" type="text" id="otp" class="toValidate"></td>
      </tr>
      <tr>
      <td colspan="2">&nbsp;</td>
      </tr>
      <tr>
        <td><input type="submit" name="Submit" value="Logon" style=".style4" onclick="return callFormValidatorSample();"></td>
        <td><a href="/finalProject/userRegister.jsp"><button type="button">Register New User</button></a></td>
      </tr>
    </table>
      <p>&nbsp;</p>
</form>

<input type="hidden" name="username_mandatory" value="M" />
<input type="hidden" name="username_fieldType" value="EMAIL" />

<input type="hidden" name="password_mandatory" value="M" />
<input type="hidden" name="password_fieldType" value="VARCHAR" />

<input type="hidden" name="otp_mandatory" value="M" />
<input type="hidden" name="otp_fieldType" value="VARCHAR" />

</body>
</html>