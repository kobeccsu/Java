package com.leizhou.viewmodel;

import java.util.List;

import com.leizhou.dto.AttributeValueBean;

public class AttributeValuesViewModel {
	private Integer id;
	
	private String attrName;
	private List<AttributeValueBean> values;
	public String getAttrName() {
		return attrName;
	}
	public void setAttrName(String attrName) {
		this.attrName = attrName;
	}
	public List<AttributeValueBean> getValues() {
		return values;
	}
	public void setValues(List<AttributeValueBean> values) {
		this.values = values;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
}
