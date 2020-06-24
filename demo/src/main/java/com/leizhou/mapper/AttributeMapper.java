package com.leizhou.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.Many;

import com.leizhou.dto.AttributeBean;
import com.leizhou.dto.AttributeValueBean;
import com.leizhou.viewmodel.AttributeValuesViewModel;

@Mapper
public interface AttributeMapper {

	@Insert("insert into attribute(shop_id, category_id, attr_name) values (#{shopId}, #{categoryId}, #{attrName})")
	boolean add(AttributeBean bean);

	@Select("SELECT * FROM attribute")
    @Results(value = {
        @Result(property="id", column = "id"),
        @Result(property="attrName", column = "attr_name"),
        @Result(property="values", column="id", javaType= List.class, many= @Many(select="selectAttributeValues"))
    })   
	List<AttributeValuesViewModel> getList(int categoryId);
	
	@Select("SELECT * FROM mall.attr_val where attr_id =  #{attr_id}")
    @Results(value={
    	@Result(property = "id", column = "id"),
        @Result(property="shopId", column ="shop_id" ),
        @Result(property="attrId", column = "attr_id"),
        @Result(property="attrValue", column = "attr_value"),
    })
	List<AttributeValueBean> selectAttributeValues(int attr_id);

	@Update("update attribute set attr_name = #{attrName} where id = #{id}")
	boolean update(AttributeBean bean);

	@Delete("delete a,b from attribute a inner join  attr_val b on a.id = b.attr_id where a.id = #{id}")
	boolean delete(AttributeBean bean);
}
