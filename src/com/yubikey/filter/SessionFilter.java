package com.yubikey.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.yubikey.bean.NewUserBean;




public class SessionFilter implements Filter {
	 
    private ArrayList<String> urlList;
    private Map<String, String> url_map;
    
    public void destroy() {
    }
 
    public void doFilter(ServletRequest req, ServletResponse res,
            FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        String url = request.getServletPath();
        boolean allowedRequest = false;
        if(urlList.contains(url)) {
            allowedRequest = true;
        }
             
        if (!allowedRequest) {
            HttpSession session = request.getSession(false);
        	NewUserBean user=null;
            boolean flagToCheck=true;
            /*this is done to check session is null from listener*/
            if(session==null){
            	flagToCheck=false;
            }
            if(flagToCheck){
            	user=(NewUserBean)session.getAttribute("userBean");
            }
            /*user is null after logout or direct url hit after logout*/
            if (session==null || user==null ) {
                
                RequestDispatcher view=request.getRequestDispatcher("loginTest.jsp?PA1=SE23HF");
                view.forward(request, response);
                return ;
            }
        }
            
        chain.doFilter(req, res);
    }
 
    public void init(FilterConfig config) throws ServletException {
        String urls = config.getInitParameter("avoid-urls");
        StringTokenizer token = new StringTokenizer(urls, ",");
 
        urlList = new ArrayList<String>();

        while (token.hasMoreTokens()) {
            urlList.add(token.nextToken());
 
        }
    }
}



