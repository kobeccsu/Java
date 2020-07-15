package com.leizhou.springboot.webapp;

import org.apache.ibatis.type.MappedTypes;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.leizhou.mapper.UsersMapper;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@SpringBootApplication
@ServletComponentScan("com.leizhou.filter")
@MappedTypes(UsersMapper.class)
@MapperScan("com.leizhou.mapper")
@ComponentScan(basePackages = { "com.leizhou.controller", "com.leizhou.security", "com.leizhou.config"} )
@EnableTransactionManagement
public class WebappApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebappApplication.class, args);
	}
}
