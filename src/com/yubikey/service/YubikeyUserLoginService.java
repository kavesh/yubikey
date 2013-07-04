package com.yubikey.service;

import com.yubikey.bean.NewUserBean;

public interface YubikeyUserLoginService{

	public NewUserBean checkUserName(String email, String password) throws Exception;

}
