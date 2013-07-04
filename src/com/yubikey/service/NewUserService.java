package com.yubikey.service;

import com.yubikey.bean.NewUserBean;


public interface NewUserService {

	public int insertUser(NewUserBean usrbean) throws Exception;

	public int validateEmail(String emailId) throws Exception;

}
