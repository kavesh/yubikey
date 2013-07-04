package com.yubikey.util;

import java.util.MissingResourceException;
import java.util.ResourceBundle;


/**
 * PropertyLoader is responsible to load all the properties files
 * while it was first instantiated and it is singleton object.
 * @version 1.0
 */

public final class PropertyLoader{

	private ResourceBundle dmsResourceBundle = null;	
	/**
	 * PropertyLoader Object
	 */
	private static PropertyLoader propertyLoader = null;

	/**
	 * ResourceBundle object
	 */
	private ResourceBundle rbDCXProperties = null;
	/**
	* Facilitates loading of the appropriate resource bundle
	* 
	* @version 1.0
	*/
	private PropertyLoader() {
		final String strMethodName= "PropertyLoader";
		try {	
			
			this.dmsResourceBundle =
				ResourceBundle.getBundle("com.yubikey.resources.serverResources");	
		} catch (MissingResourceException mrExp) {
		} catch (Exception exp) {
		}
	} //constructor
	/**
	 * 
	 * @return the instance of the PropertyLoader class
	 */
	public static PropertyLoader getInstance() {
		if (null == propertyLoader) {
			propertyLoader = new PropertyLoader();
		}
		return propertyLoader;
	} //getInstance

	/**
	 * method getSiteGroup
	 * @param Key
	 * @return String
	 */
	public String getServerProperties(String Key) {
		final String strMethodName = "getServerProperties";

		String strValue = null;

		strValue = this.dmsResourceBundle.getString(Key);

		if (null != strValue) {
			strValue = strValue.trim();
		}

		return strValue;

	}

}

