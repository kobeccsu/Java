package com.leizhou.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import com.leizhou.dto.AttributeValueBean;

@Mapper
public interface AttributeValueMapper {
	@Insert("INSERT INTO `mall`.`attr_val`" + 
			"("+ 
			"`shop_id`," + 
			"`goods_id`," + 
			"`attr_id`," + 
			"`attr_value`)" + 
			"VALUES" + 
			"( "+ 
			"#{shopId}," + 
			"#{goodsId}," + 
			"#{attrId}," + 
			"#{attrValue});" + 
			"")
	boolean insert(AttributeValueBean bean);

	@Update("update attr_val set attr_value = #{attrValue} where id = #{id}")
	boolean update(AttributeValueBean bean);

	@Delete("delete from attr_val where id = #{id}")
	boolean delete(AttributeValueBean bean);
}
