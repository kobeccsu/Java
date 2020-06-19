package com.leizhou.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;

import com.leizhou.dto.AttributeBean;
import com.leizhou.viewmodel.AttributeValuesViewModel;

@Mapper
public interface AttributeMapper {

	@Insert("insert into attribute(shop_id, category_id, attr_name) values (#{shopId}, #{categoryId}, #{attrName})")
	boolean add(AttributeBean bean);

	@ResultMap("com.leizhou.viewmodel.AttributeValuesViewModel")
	@Select("SELECT l.attr_name, r.* FROM mall.attribute l left join attr_val r on l.id = r.attr_id")
	List<AttributeValuesViewModel> getList();
}
