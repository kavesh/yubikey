package com.yubikey.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.apache.log4j.Logger;

import com.yubikey.bean.NewUserBean;
import com.yubikey.util.SQLConstant;
import com.yubikey.util.DBHandler;

public class NewUserRegisterDAO {
	
	static final Logger logger = Logger.getLogger(NewUserRegisterDAO.class);

	public int insertUser(NewUserBean usrbean) throws Exception{
		logger.info("In checkUserName Data Access Layer");
		int result = 0;
			Connection cn = null;
			try {
				logger.info("In Try Method While Inserting Data");	
				DBHandler dbHandler = new DBHandler();
				cn = dbHandler.getConnection();
				cn.setAutoCommit(false);
				String Query = SQLConstant.INSERT_NEW_USER;
				logger.debug("Sql Insert User Query ----> "+Query);
				PreparedStatement pst = cn.prepareStatement(Query);
				pst.setString(1, usrbean.getName().trim());
				pst.setString(2, usrbean.getLastname().trim());
				pst.setString(3, usrbean.getEmailId().trim());
				pst.setString(4, usrbean.getOtp());
				pst.setString(5, usrbean.getPassword());
				pst.execute();
				cn.commit();
				result=1;
			} catch (Exception e) {
				logger.error("Error occured ---> "+e);
				cn.rollback();
				e.printStackTrace();
				result=-1;
				throw e;
			}

			finally {
				try {
					DBHandler.closeConnection(cn);
				} catch (Exception ex) {
					logger.error("Error occured ---> "+ex);
					ex.printStackTrace();
				}
			}
		return result;
	}

	public int validateEmail(String emailId) throws Exception{
		// TODO Auto-generated method stub
		logger.info("In validateEmail Data Access Layer");
		int result = 0;
		
		NewUserBean usrBean = new NewUserBean();
		Connection cn = null;
		String validEmail = "";
		try {
		logger.info("In Try Method For Validating Data");	
		String Query = SQLConstant.CHECK_EMAIL;
		logger.debug("Sql Select Email Query ----> "+Query);
		DBHandler dbHandler = new DBHandler();
		cn = dbHandler.getConnection();
		PreparedStatement st = cn.prepareStatement(Query);
		st.setString(1, emailId);
		ResultSet rs = st.executeQuery();
		while (rs.next()) {
			validEmail = rs.getString(1);	
		}

		if (rs != null) {
			if (validEmail!=null && validEmail!=""){
				logger.info("Setting Result If Email Is Present");	
				result = 1;
			}
			rs.close();
		}

	} catch (Exception e) {
		logger.error("Error occured ---> "+e);
		e.printStackTrace();
		throw e;
	}

	finally {
		try {
			DBHandler.closeConnection(cn);
		} catch (Exception ex) {
			logger.error("Error occured ---> "+ex);
			ex.printStackTrace();

		}

	}
		
	return result;
	}

	
}
