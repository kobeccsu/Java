package com.leizhou.util;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

public class Utility {
	public static ArrayList<Integer> parseJsonToInt(JSONObject jsonObject, String jsonArray, String key) {
		JSONArray array1 = jsonObject.getJSONArray(jsonArray);
		ArrayList<Integer> list = new ArrayList<Integer>();
		if (array1 != null) { 
		   for (int i=0;i<array1.length();i++){ 
			   list.add(array1.getJSONObject(i).getInt(key));
		   } 
		}
		return list;
	}
}
