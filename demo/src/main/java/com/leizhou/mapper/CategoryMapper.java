package com.leizhou.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.leizhou.dto.CategoryBean;

@Mapper
public interface CategoryMapper {

	@Select("select * from category")
	List<CategoryBean> getList();
}
