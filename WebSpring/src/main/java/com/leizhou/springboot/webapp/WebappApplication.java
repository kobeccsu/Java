package com.leizhou.springboot.webapp;

import org.apache.ibatis.type.MappedTypes;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;
import com.leizhou.mapper.UsersMapper;


@SpringBootApplication
@ServletComponentScan("com.leizhou.filter")
@MappedTypes(UsersMapper.class)
@MapperScan("com.leizhou.mapper")
@ComponentScan(basePackages = { "com.leizhou.controller", "com.leizhou.security"} )
public class WebappApplication {
	public static void main(String[] args) {
		SpringApplication.run(WebappApplication.class, args);
	}
}
