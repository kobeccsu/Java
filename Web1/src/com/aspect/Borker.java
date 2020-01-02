package com.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
@Component
@Aspect
public class Borker {
//	@Pointcut("execution(* com.leizhou.RendService.service())")
//    public void lService() {
//    }
	
//	@Before("lService()")
//	public void before() {
//		System.out.println("带看房");
//	}
//	
//	@After("lService()")
//	public void after() {
//		System.out.println("给钥匙");
//		System.out.println("平时打理");
//	}
	
	@Around("execution(* com.leizhou.RendService.service())")
	public void around(ProceedingJoinPoint point) {
		System.out.println("带看房");
		try {
			Object object = point.proceed();
		} catch (Throwable e) {
			e.printStackTrace();
		}
		System.out.println("给钥匙");
		System.out.println("平时打理");
		
	}
}
