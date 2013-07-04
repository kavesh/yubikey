package com.yubikey.util;

public class SQLConstant {

	public static String INSERT_NEW_USER = "insert into USERREGISTER(NAME,LASTNAME,EMAILID,YUBIKEYPUBLICID,PASSWORD) values(?,?,?,?,?)";

	public static String GET_USER = "Select NAME,LASTNAME,YUBIKEYPUBLICID,EMAILID,STATUSFLAG From USERREGISTER where EMAILID = ? and PASSWORD = ?";
	
	public static String CHECK_EMAIL = "Select EMAILID From USERREGISTER where EMAILID = ?";
}
