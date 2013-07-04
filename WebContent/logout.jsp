<%@page import="java.util.*, java.text.*, java.io.*, com.yubikey.bean.NewUserBean"%>
<%
String emailId="";
if(session.getAttribute("userBean") != null){
NewUserBean userDetails = (NewUserBean) (session.getAttribute("userBean") == null ? "" : session.getAttribute("userBean"));
emailId=userDetails.getEmailId();
try
{
	session = request.getSession(false);
	if(session != null)
	{
		session.removeAttribute("emailId");
		session.invalidate();
	}
}
catch(Throwable t)
{
	out.println("An error occurred while performing logout action.");
}
}

String strRedirect =  "/finalProject/loginTest.jsp";
%>
<html>
<head>
<title>Yubikey Test</title>
</head>
<body onload="window.location = '<%=strRedirect%>'">
</body>
</html>