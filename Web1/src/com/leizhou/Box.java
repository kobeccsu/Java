package com.leizhou;

public class Box<T> {
	public String getItsName(T name) {
		return name.toString();
	}
	
	public T getData(String name){
		return (T)name;
	}
}
