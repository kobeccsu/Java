package com.leizhou.bean;

import org.springframework.stereotype.Component;

@Component("website")
public class Website {
	int id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	String url;
	int alexa;
	String country;
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getAlexa() {
		return alexa;
	}
	public void setAlexa(int alexa) {
		this.alexa = alexa;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}

}
