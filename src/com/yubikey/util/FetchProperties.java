package com.yubikey.util;

import java.io.*;
import java.util.*;

public class FetchProperties
{
	public static String getPropertyValue(String propName)
	{
		Properties props = new Properties();
		String propValue = null;

		try
		{
			FileInputStream fis = new FileInputStream("/jboss/yubikey/messages.properties");
			props.load(fis);

			if(props.getProperty(propName) != null)
			{
				propValue = props.getProperty(propName);
				System.out.println("propValue"+propValue);
			}
		}
		catch(IOException ioe)
		{
		   ioe.printStackTrace();
		   return null;
		}

		return propValue;
	}
}