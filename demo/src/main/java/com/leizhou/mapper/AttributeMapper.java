package com.leizhou.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.leizhou.dto.AttributeBean;
import com.leizhou.viewmodel.AttributeValuesViewModel;

@Mapper
public interface AttributeMapper {

	@Insert("insert into attribute(shop_id, category_id, attr_name) values (#{shopId}, #{categoryId}, #{attrName})")
	boolean add(AttributeBean bean);

	List<AttributeValuesViewModel> getList();
}
