<%@page import="java.util.*, java.text.*, java.io.*, com.yubikey.util.FetchProperties"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>User Registration</title>
<link rel="stylesheet" media="all" type="text/css" href="css/ui-lightness/jquery-ui-1.8.16.custom.css" />
<link rel="stylesheet" media="all" type="text/css" href="css/style.css" />
<script src="js/jquery-1.6.2.min.js" type="text/javascript"></script>
<script src="js/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
<script type="text/javascript" src="js/validateFields.js"></script>
<script type="text/javascript" src="js/passwordEncryption.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	
	$("#msgClass").delay(3000).fadeOut("slow");
	
	$("#emailId").blur(function(){
		var emailId = $(this).val();
		$.ajax({
			   type: "POST",
			   dataType : 'xml',
			   url: "/finalProject/ajaxValidate.jsp",
			   data: "PA1="+emailId,
			   success: function(xml){
				   var successMsg = "";
				   $(xml).find("responseMsg").each(function(){
					   successMsg= $.trim($(this).text());
	         		});
				   if(successMsg==1){
							 $("#emailId").next().remove();
						     $("#emailId").val('');
						     $("#emailId").after('<div style="color: red; display: block;" class="message">User Id already exists</div>');
							
					     }
				         else
					     {
				        	 $("#emailId").next().remove();
				        	 $("#emailId").next().remove();
				         } 
			   }
			 });
		
	});
});

function callFormValidatorSample(){
    var test=ValidateForm();
    if(test){
    	return test;
    }
    $("#otp").val("");
    return test; 
}

function genratePassword() {
	try {
	var hashInput = document.getElementById("cpassword");
	var hashInputType = "TEXT";
	var hashVariant = "SHA-512";
	var hashOutputType = "HEX";
	
	if(hashInput.value != ""){
	var hashObj = new jsSHA(hashInput.value, hashInputType);
	hashInput.value = hashObj.getHash(hashVariant,hashOutputType);
	}
	} catch(e) {
	hashInput.value = e
	}
} 

function genratePassword1() {
	try {
	var hashInput = document.getElementById("password");
	var hashInputType = "TEXT";
	var hashVariant = "SHA-512";
	var hashOutputType = "HEX";
	
	if(hashInput.value != ""){
	var hashObj = new jsSHA(hashInput.value, hashInputType);
	hashInput.value = hashObj.getHash(hashVariant,hashOutputType);
	setTimeout(function() {
		comparePassword();
	}, 5000);
	}
	} catch(e) {
	hashInput.value = e
	}
	
}

function comparePassword(){
	var cpassword = $("#cpassword").val();
	var password = $("#password").val();
	
	if (cpassword == password) {
		 $("#password").next().remove();
		 $("#password").next().remove();
	     return true;
	   }
	 $("#password").next().remove();
     $("#password").val('');
     $("#otp").val('');
     $("#password").after('<div style="color: red; display: block;" class="message">Password and Confirm Password does not match</div>');
	   return false;
}
</script>

<%
String msg = request.getParameter("PA1") == null ? "" : request.getParameter("PA1");
msg = msg.trim();
if(msg.equalsIgnoreCase("DB00AM"))
	msg=FetchProperties.getPropertyValue("app.yubikey.registrationFailed");
if(msg.equalsIgnoreCase("SE23HF"))
	msg=FetchProperties.getPropertyValue("app.yubikey.session");
if(msg.equalsIgnoreCase("RT78BW"))
	msg=FetchProperties.getPropertyValue("app.yubikey.format");
%>

</head>
<body><center>
<form action="/finalProject/yubikeyNewUser" method="post" name="registerUser" autocomplete="off">
<%if(msg != null && msg != "") {%>
		<div id="msgClass">
			<label style="color:red; width:950px; margin-top: 8px; margin-left: 50px;" >
	      	<%= msg%>
	      	</label>
      	</div>
      	<%} %>
<table width="50%" border="0" cellspacing="1" cellpadding="1" align="center">
<tr>
<th colspan="2">
User Registration
</th>
</tr>
  <tr>
    <td>Name</td>
    <td><input name="name" id="name" type="text" class="toValidate" /></td>
  </tr>
  <tr>
    <td>Last Name</td>
    <td><input name="lastname" id="lastname" type="text" class="toValidate" /></td>
  </tr>
  <tr>
    <td>Email Id</td>
    <td><input name="emailId" id="emailId" type="text" class="toValidate" /></td>
  </tr>
  <tr>
    <td>Password</td>
    <td><input name="cpassword" id="cpassword" type="password" class="toValidate" onblur="genratePassword()"/></td>
  </tr>
  <tr>
    <td>Confirm Password</td>
    <td><input name="password" id="password" type="password" class="toValidate" onblur="genratePassword1()"/></td>
  </tr>
  <tr>
    <td>yubikey</td>
    <td><input name="otp" id="otp" type="text" class="toValidate" /></td>
    <td><a href="https://www.yubico.com/products/services-software/yubirevoke/account/" target="_new">To Register Yubikey</a></td>
  </tr>
  <tr>
  	<td colspan="2" align="center"><input type="submit" name="submit" value="submit" onclick="return callFormValidatorSample();"/></td>
  </tr>
</table>

</form>

<input type="hidden" name="name_mandatory" value="M" />
<input type="hidden" name="name_fieldType" value="VARCHAR" />

<input type="hidden" name="lastname_mandatory" value="M" />
<input type="hidden" name="lastname_fieldType" value="VARCHAR" />

<input type="hidden" name="emailId_mandatory" value="M" />
<input type="hidden" name="emailId_fieldType" value="EMAIL" />

<input type="hidden" name="cpassword_mandatory" value="M" />
<input type="hidden" name="cpassword_fieldType" value="VARCHAR" />

<input type="hidden" name="password_mandatory" value="M" />
<input type="hidden" name="password_fieldType" value="VARCHAR" />

<input type="hidden" name="otp_mandatory" value="M" />
<input type="hidden" name="otp_fieldType" value="VARCHAR" />
</center>
</body>
</html>