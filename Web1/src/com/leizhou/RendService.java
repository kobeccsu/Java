package com.leizhou;

import org.springframework.stereotype.Component;

@Component("rendservice")
public class RendService {
	public void service() {
		System.out.println("我就收租过日子");
	}
}
