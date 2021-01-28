package com.leizhou.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.leizhou.dto.CategoryBean;

@Mapper
public interface CategoryMapper {

	@Select("select * from category where is_deleted = 0")
	List<CategoryBean> getList();

	@Insert("insert into category (uid, name, pid, is_deleted) values(uuid(), #{name}, #{pid}, 0)")
	boolean add(CategoryBean bean);

	@Update("update category set name=#{name} where id = #{id}")
	boolean update(CategoryBean bean);

	@Update("update category set is_deleted = 1 where id = #{id}")
	boolean delete(int id);

	@Select("select * from category where is_deleted = 0 and pid = #{id}")
	List<CategoryBean> getChild(int id);
}
