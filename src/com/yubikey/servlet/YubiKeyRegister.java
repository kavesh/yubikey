package com.yubikey.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.yubico.client.v2.YubicoClient;
import com.yubico.client.v2.YubicoResponse;
import com.yubico.client.v2.YubicoResponseStatus;
import com.yubikey.bean.NewUserBean;
import com.yubikey.controller.YubikeyLogin;
import com.yubikey.util.Base64Coder;
import com.yubikey.util.Constant;

/**
 * Servlet implementation class yubiKeyRegister
 */
public class YubiKeyRegister extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	static final Logger logger = Logger.getLogger(YubiKeyRegister.class);
	YubikeyLogin yuLogin = new YubikeyLogin();
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public YubiKeyRegister() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		logger.info("In doPost Method of YubikeyRegister");
		NewUserBean usrbean = new NewUserBean();
		
		HttpSession session = request.getSession();
		int client_id = Constant.API_CLIENTID;
		String keyVal = Constant.API_KEY;
		
		try{
			   
			String otp = request.getParameter("otp");
			String email = request.getParameter("username");
			String passw = request.getParameter("password");
			String password = Base64Coder.password_hash_SHA512(passw);
			
			try{
				logger.info("In try method to checkUserName");
				usrbean = yuLogin.checkUserName(email,password);		
				logger.info("Inserted Successfully");
			}catch(Exception e){
				logger.error("Exception Occured---> "+e);
				e.printStackTrace();
			}
			
			
				if(usrbean.getName() != null && usrbean.getName() != ""){
					if(usrbean.getIsActive().equalsIgnoreCase("Y")){
				   YubicoClient client = YubicoClient.getClient(client_id);
				   client.setKey(keyVal);
				   
				   if (YubicoClient.isValidOTPFormat(otp)) {
					   logger.info("Valid Yubikey");
					   YubicoResponse response1 = client.verify(otp);
					   logger.debug("Response Status-----> "+response1);
					   if(response1 != null && response1.getStatus() == YubicoResponseStatus.OK) {
						   String publicId = YubicoClient.getPublicId(otp);
						   		logger.debug("Yubikey PublicId-----> "+publicId);
							   if(usrbean.getOtp().equalsIgnoreCase(publicId)){
								   session.setAttribute("userBean",usrbean);
								   response.sendRedirect("userHome.jsp");
							   }else{
								   response.sendRedirect("loginTest.jsp?PA1=RA2FDQ");
							   }
					   }else{
						   response.sendRedirect("loginTest.jsp?PA1=RD5H9J");
					   }
				   }else{
					   response.sendRedirect("loginTest.jsp?PA1=RT78BW");
				   }
					}else{
						response.sendRedirect("loginTest.jsp?PA1=EDF907");
					}
				}else{
					response.sendRedirect("loginTest.jsp?PA1=RFQ6TY");
				}
			}catch (Exception e){
				logger.error("Error occured--->" +e);
				e.printStackTrace();
			}
		
	}

}
