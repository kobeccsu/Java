package com.leizhou.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.leizhou.dto.CategoryBean;
import com.leizhou.mapper.CategoryMapper;
import com.leizhou.viewmodel.Node;

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
	@ResponseBody
	public String list() {
		List<CategoryBean> list = mapper.getList();
		List<Node> nodes = new ArrayList<>();
		// Save all nodes to a map
		for (CategoryBean current : list) {
			nodes.add(new Node(current.getName(), String.valueOf(current.getId()), String.valueOf(current.getPid())));
		}

		Node result = createTree(nodes);
//		Gson json = new Gson();

//		return  json.toJson(result.toString());
		return result.toString();
	}



    private static Node createTree(List<Node> nodes) {

        Map<String, Node> mapTmp = new HashMap<>();
        
        //Save all nodes to a map
        for (Node current : nodes) {
            mapTmp.put(current.getId(), current);
        }

        //loop and assign parent/child relationships
        for (Node current : nodes) {
            String parentId = current.getParentId();

            if (parentId != null) {
                Node parent = mapTmp.get(parentId);
                if (parent != null) {
                    current.setParent(parent);
                    parent.addChild(current);
                    mapTmp.put(parentId, parent);
                    mapTmp.put(current.getId(), current);
                }
            }

        }
    
        //get the root
        Node root = null;
        for (Node node : mapTmp.values()) {
            if(node.getParent() == null) {
                root = node;
                break;
            }
        }
        
        return root;
//        System.out.println(root);
    }
    
	/**
     * .   Recursive method is used to traverse down the tree
     **/
 
    private static List<Node> flatten(Node node,  List<Node> flatList) {
        
        if(node != null){
            Node n = new Node(node.getValue(), node.getId(), node.getParentId()); // get rid of children & parent references
            flatList.add(n);
        }
        
        List<Node> children = node.getChildren();
        for (Node child : children) {
            if(child.getChildren() != null) {
                flatten(child, flatList);         // Recursive call - Keep flattening until no more children
            }
        }    
        
        // stop or exit condition
        return flatList;
    }

}
