package com.leizhou.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.leizhou.dto.ShopBean;

@Mapper
public interface ShopMapper {
	@Select("<script>" +
			"select * from shop " +
				"<if test='queryTxt != null and queryTxt != &quot;&quot;'>"+
					" where name like '%${queryTxt}%' " +
				"</if>" +
			" limit #{pageSize} offset ${(pageIndex - 1) * pageSize}"+
				"</script>"
			)
	List<ShopBean> getList(int pageIndex, int pageSize, String queryTxt);

	@Insert("insert into shop(name, theme, is_closed) values (#{name}, #{theme}, #{is_closed})")
	void add(ShopBean shop);

	@Update("update shop set name = #{name}, theme = #{theme}, is_closed = #{is_closed} where id = #{id}")
	void update(ShopBean bean);

	@Delete("delete from shop where id = #{id}")
	boolean delete(int id);
	
}
