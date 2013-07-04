package com.yubikey.service;

import com.yubikey.bean.NewUserBean;
import com.yubikey.dao.YubikeyLoginDAO;

public class YubikeyUserLoginServiceImpl implements YubikeyUserLoginService{

	YubikeyLoginDAO loginDao = new YubikeyLoginDAO();
	
	@Override
	public NewUserBean checkUserName(String email, String password) throws Exception{
		// TODO Auto-generated method stub
		return loginDao.checkUserName(email,password);
	}

}
