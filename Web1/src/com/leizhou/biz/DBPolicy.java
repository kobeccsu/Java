package com.leizhou.biz;

import com.leizhou.dal.DB;

public class DBPolicy {
	public void AddPolicy(String name) {
		new DB().insert("insert into policy (policyname, uid) values (" + name + ", uuid());");
	}
}
