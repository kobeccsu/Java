package com.leizhou;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target({ ElementType.METHOD })
public @interface MyCustomAnnotation {
	int age() default 20;
	String name();
}
