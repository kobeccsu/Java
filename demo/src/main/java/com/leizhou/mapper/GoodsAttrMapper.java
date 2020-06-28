package com.leizhou.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.leizhou.dto.GoodsAttrBean;

@Mapper
public interface GoodsAttrMapper {
	@Insert({
			"<script>",
        "INSERT INTO goods_attr ",
            "(shop_id, goods_id, attr_val_id, price)",
        " VALUES " +  
            "<foreach item='each_item_name' collection='theCollection' open='' separator=',' close=''>" +
                "(" +
                    "#{each_item_name.shop_id},",
                    "#{each_item_name.goods_id},",
                    "#{each_item_name.attr_val_id},",
                    "#{each_item_name.price}" +
                ")" +
            "</foreach>",
    "</script>"})
	boolean insertBatch(@Param(value="theCollection") List<GoodsAttrBean> theCollection);
}
