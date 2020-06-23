package com.leizhou.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import com.leizhou.dto.AttributeBean;
import com.leizhou.viewmodel.AttributeValuesViewModel;

@Mapper
public interface AttributeMapper {

	@Insert("insert into attribute(shop_id, category_id, attr_name) values (#{shopId}, #{categoryId}, #{attrName})")
	boolean add(AttributeBean bean);

	// todo:
	// https://stackoverflow.com/questions/33151873/one-to-many-relationship-in-mybatis
	List<AttributeValuesViewModel> getList(int categoryId);
}
