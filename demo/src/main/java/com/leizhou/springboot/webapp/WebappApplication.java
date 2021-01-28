package com.leizhou.springboot.webapp;

import org.apache.ibatis.type.MappedTypes;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;

import com.leizhou.mapper.UsersMapper;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
@ServletComponentScan("com.leizhou.filter")
@MappedTypes(UsersMapper.class)
@MapperScan("com.leizhou.mapper")
@ComponentScan("com.leizhou.security")
@ComponentScan(basePackages = { "com.leizhou.controller", "com.leizhou.security","com.leizhou.config"} )
public class WebappApplication {
	public static void main(String[] args) {
		SpringApplication.run(WebappApplication.class, args);
	}
}
