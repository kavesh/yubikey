package com.yubikey.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.apache.log4j.Logger;

import com.sun.org.apache.bcel.internal.generic.GETSTATIC;
import com.yubikey.bean.NewUserBean;
import com.yubikey.servlet.YubiKeyRegister;
import com.yubikey.util.DBHandler;
import com.yubikey.util.SQLConstant;

public class YubikeyLoginDAO {
	
	static final Logger logger = Logger.getLogger(YubikeyLoginDAO.class);

	public NewUserBean checkUserName(String email, String password) throws Exception{
		// TODO Auto-generated method stub
		logger.info("In checkUserName Data Access Layer");
		NewUserBean usrBean = new NewUserBean();
		Connection cn = null;
		try {
				logger.info("In Try Method For Selecting Data");	
				String Query = SQLConstant.GET_USER;
				logger.debug("Sql Get User Query ----> "+Query);
				DBHandler dbHandler = new DBHandler();
				cn = dbHandler.getConnection();
				PreparedStatement st = cn.prepareStatement(Query);
				st.setString(1, email);
				st.setString(2, password);
				ResultSet rs = st.executeQuery();
				while (rs.next()) {
					usrBean.setName(rs.getString(1));
					usrBean.setLastname(rs.getString(2));
					usrBean.setOtp(rs.getString(3));
					usrBean.setEmailId(rs.getString(4));
					usrBean.setIsActive(rs.getString(5));
				}
		
				if (rs != null) {
					rs.close();
				}
		} catch (Exception e) {
			logger.error("Erroe at -->" +e);
			e.printStackTrace();
			throw e;
		}
		finally {
			try {
				DBHandler.closeConnection(cn);
			} catch (Exception ex) {
				logger.error("Erroe at -->" +ex);
				ex.printStackTrace();
			}
		}
		return usrBean;
	}

}
