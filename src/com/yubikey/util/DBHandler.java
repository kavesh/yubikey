package com.yubikey.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;



public class DBHandler {
    
	
	//static final Logger logger = Logger.getLogger(DBHandler.class);

	//Get the DB connection
	private static String strMethodName = null;
	
	public Connection getConnection() throws Exception
	{		
		 strMethodName = "getConnection";		
	
		Connection con = null;   
	  	String strUserID , strUserPwd, strURL = null;
	  	 final PropertyLoader objPropLoader = PropertyLoader.getInstance();
		try {				
				Class.forName(objPropLoader.getServerProperties(Constant.EAI_DRIVER));				
				strUserID = objPropLoader.getServerProperties(Constant.EAI_USER_NAME);
				strUserPwd = objPropLoader.getServerProperties(Constant.EAI_USER_PASSWORD); 
				strURL = objPropLoader.getServerProperties(Constant.EAI_URL);
				con = DriverManager.getConnection(strURL,strUserID, strUserPwd);
						 
		} catch(SQLException ex) {	
			ex.printStackTrace();		
		}
		catch(java.lang.ClassNotFoundException e) {
			e.printStackTrace();
			
		}
		return con;
	}  
	
	
	
	public static void closeConnection(Connection conn) throws Exception{
		 strMethodName = "closeConnection";
		
		try{
			if(conn!=null){
				conn.close();
			}
		}catch(Exception e){		
			e.printStackTrace();
		}
		
	}
	
	
	public static void closeStatement(Statement stmt) throws Exception{		
		strMethodName = "closeStatement";		
		
		 try{
			if(stmt!=null){
				stmt.close();
			}
		}catch(Exception e){	
			e.printStackTrace();
		}
	
	}	
}
