package com.yubikey.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.yubico.client.v2.YubicoClient;
import com.yubikey.bean.NewUserBean;
import com.yubikey.controller.NewUserController;

/**
 * Servlet implementation class YubikeyNewUser
 */

public class YubikeyNewUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
     
	static final Logger logger = Logger.getLogger(YubikeyNewUser.class);
	
	NewUserBean usrbean = new NewUserBean();
	NewUserController nwUsr = new NewUserController();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public YubikeyNewUser() {
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
		
		logger.info("In doPost Method of YubikeyNewNuser");
		String otp = request.getParameter("otp");
		
		if (YubicoClient.isValidOTPFormat(otp)) {
			String publicId = YubicoClient.getPublicId(otp);
			logger.debug("YubikeyNewNuser------> "+publicId);
			
		usrbean.setName(request.getParameter("name"));
		usrbean.setLastname(request.getParameter("lastname"));
		usrbean.setEmailId(request.getParameter("emailId"));
		usrbean.setPassword(request.getParameter("password"));
		usrbean.setOtp(publicId);
		
		int success = 0;
		
		try {
			logger.info("In try to insert user");
			success = nwUsr.insertUser(usrbean);
			logger.debug("Record status ------> "+success);
		} catch (Throwable e) {
			logger.error("Error While inserting --------> " +e);
			e.printStackTrace();
		}
		
			if(success==1){
				logger.debug("Email Id-----> "+usrbean.getEmailId());
				response.sendRedirect("/finalProject/Success.jsp?PA1="+usrbean.getEmailId());
			}else{
				response.sendRedirect("/finalProject/userRegister.jsp?PA1=DB00AM");
			}
		}else{
			response.sendRedirect("/finalProject/userRegister.jsp?PA1=RT78BW");
		}
	}

}
