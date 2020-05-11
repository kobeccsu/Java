package com.leizhou.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.leizhou.dto.UserBean;

@Mapper
public interface UsersMapper {
	@Select("select * from users")
	java.util.List<UserBean> getAll();
	
}
