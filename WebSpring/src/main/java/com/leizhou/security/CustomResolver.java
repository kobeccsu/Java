package com.leizhou.security;

//import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

@Configuration
public class CustomResolver {
	@Bean
	public ClassLoaderTemplateResolver secondaryTemplateResolver() {
	    ClassLoaderTemplateResolver secondaryTemplateResolver = new ClassLoaderTemplateResolver();
	    secondaryTemplateResolver.setPrefix("static/");
	    secondaryTemplateResolver.setSuffix(".html");
	    secondaryTemplateResolver.setTemplateMode(TemplateMode.HTML);
	    secondaryTemplateResolver.setCharacterEncoding("UTF-8");
	    secondaryTemplateResolver.setOrder(1);
	    secondaryTemplateResolver.setCheckExistence(true);
	         
	    return secondaryTemplateResolver;
	}
	
	@Bean
	public ClassLoaderTemplateResolver threeTemplateResolver() {
	    ClassLoaderTemplateResolver secondaryTemplateResolver = new ClassLoaderTemplateResolver();
	    secondaryTemplateResolver.setPrefix("templates/");
	    secondaryTemplateResolver.setSuffix(".html");
	    secondaryTemplateResolver.setTemplateMode(TemplateMode.HTML);
	    secondaryTemplateResolver.setCharacterEncoding("UTF-8");
	    secondaryTemplateResolver.setOrder(2);
	    secondaryTemplateResolver.setCheckExistence(true);
	         
	    return secondaryTemplateResolver;
	}
	
	@Bean
	public ViewResolver oneTemplateResolver() {
		InternalResourceViewResolver secondaryTemplateResolver = new InternalResourceViewResolver();
	    secondaryTemplateResolver.setPrefix("/WEB-INF/jsp/");
	    secondaryTemplateResolver.setSuffix(".jsp");
	    secondaryTemplateResolver.setOrder(3);
	         
	    return secondaryTemplateResolver;
	}
}
