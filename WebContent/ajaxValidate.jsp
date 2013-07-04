<%@page import="java.util.*, java.text.*, java.io.*, com.yubikey.controller.NewUserController"%>

<%
String emailId = request.getParameter("PA1");
%>
<dataValidate>
<responseMsg>
	<%
		NewUserController newUsr = new NewUserController();
	 	int result = newUsr.validateEmail(emailId);
     %>
     <%=result %>
</responseMsg>
</dataValidate>