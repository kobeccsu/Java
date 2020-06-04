package com.leizhou.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.google.gson.Gson;
import com.leizhou.dto.CategoryBean;
import com.leizhou.mapper.CategoryMapper;
import com.leizhou.viewmodel.TreeView;

@Controller
public class CategoryController {
	CategoryMapper mapper;
	public CategoryController(CategoryMapper pMapper) {
		mapper = pMapper;
	}
	
	@GetMapping("/category")
	public String index() {
		return "templates/edit-mall/category";
	}
	
	@GetMapping("/category/list")
	public String list() {
		List<CategoryBean> list = mapper.getList();
		
		
		
		Map<Integer, TreeView<CategoryBean>> mapTmp = new HashMap<>();
        
        // Save all nodes to a map
        for (CategoryBean current : list) {
        	TreeView<CategoryBean> node = new TreeView<CategoryBean>(current);
            mapTmp.put(current.getId(),  node);
        }
 
        //loop and assign parent/child relationships
        for (CategoryBean current : list) {
            Integer parentId = current.getPid();
 
            if (parentId != 0) {
            	TreeView<CategoryBean> parent = mapTmp.get(parentId);
                if (parent != null) {
                    //current.setParent(parent);
                    parent.addChild(new TreeView<CategoryBean>(current));
                    mapTmp.put(parentId, parent);
                    //mapTmp.put(current.getId(), new TreeView<CategoryBean>(current));
                }
            }
 
        }
        Gson json = new Gson();
        
        return json.toJson(mapTmp);
		
	}

}
