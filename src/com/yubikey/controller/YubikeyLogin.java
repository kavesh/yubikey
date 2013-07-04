package com.yubikey.controller;

import com.yubikey.bean.NewUserBean;
import com.yubikey.service.YubikeyUserLoginService;
import com.yubikey.service.YubikeyUserLoginServiceImpl;

public class YubikeyLogin {

	YubikeyUserLoginService yuUserLoginService = new YubikeyUserLoginServiceImpl();
	
	public NewUserBean checkUserName(String email, String password) throws Exception
	{
		// TODO Auto-generated method stub
		return yuUserLoginService.checkUserName(email,password);
	}

	
	
}
