package com.leizhou;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@ComponentScan(basePackages = {"com.leizhou, com.aspect"})
@EnableAspectJAutoProxy
public class BeanLoadConfig {
	
}
