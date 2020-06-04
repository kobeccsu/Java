package com.leizhou.viewmodel;

import java.util.ArrayList;

import com.leizhou.dto.CategoryBean;

public class TreeView<T> {
	
	private ArrayList<TreeView<T>> children;
    
	private T vT;
	
	public TreeView(T t) {

        children = new ArrayList<TreeView<T>>();
        vT = t;
    }

	

	public ArrayList<TreeView<T>> getChildren() {
		return children;
	}

	public void setChildren(ArrayList<TreeView<T>> children) {
		this.children = children;
	}

	public T getvT() {
		return vT;
	}

	public void setvT(T vT) {
		this.vT = vT;
	}

	public void addChild(TreeView<T> current) {
		this.children.add(current);
		
	}
}
