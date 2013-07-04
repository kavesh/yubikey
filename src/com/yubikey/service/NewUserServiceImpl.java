package com.yubikey.service;

import com.yubikey.bean.NewUserBean;
import com.yubikey.dao.NewUserRegisterDAO;

public class NewUserServiceImpl implements NewUserService{

	NewUserRegisterDAO userRegDao = new NewUserRegisterDAO();
	
	@Override
	public int insertUser(NewUserBean usrbean) throws Exception {
		// TODO Auto-generated method stub
		return userRegDao.insertUser(usrbean);
	}

	@Override
	public int validateEmail(String emailId) throws Exception {
		// TODO Auto-generated method stub
		return userRegDao.validateEmail(emailId);
	}

}
