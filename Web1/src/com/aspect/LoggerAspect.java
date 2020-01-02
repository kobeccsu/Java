package com.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
@Component
@Aspect
public class LoggerAspect {
	@Around("execution(* com.leizhou.ProductService.doSomeService())")
	public Object log(ProceedingJoinPoint joinPoint) throws Throwable{
		System.out.println("Start");
		Object object = joinPoint.proceed();
		System.out.println("End");
		return object;
	}
}
