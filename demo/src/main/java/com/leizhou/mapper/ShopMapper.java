package com.leizhou.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.leizhou.dto.ShopBean;

@Mapper
public interface ShopMapper {
	@Select("<script>" +
			"select * from shop " +
				"<if test='queryTxt != null and queryTxt != &quot;&quot;'>"+
					"where name like '#{queryTxt}%'" +
				"</if>" +
			" limit #{pageSize} offset ${(pageIndex - 1) * pageSize}"+
				"</script>"
			)
	List<ShopBean> getList(int pageIndex, int pageSize, String queryTxt);
	
}
