package com.yubikey.controller;

import com.yubikey.bean.NewUserBean;
import com.yubikey.service.NewUserService;
import com.yubikey.service.NewUserServiceImpl;



public class NewUserController {
	
	NewUserService usrService = new NewUserServiceImpl();
	
	public int insertUser(NewUserBean usrbean) throws Exception
   	{
   		return usrService.insertUser(usrbean);
   	}
	
	public int validateEmail(String emailId) throws Exception
   	{
   		return usrService.validateEmail(emailId);
   	}

}
