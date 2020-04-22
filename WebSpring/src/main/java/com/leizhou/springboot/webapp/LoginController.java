package com.leizhou.springboot.webapp;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.leizhou.biz.DBUsers;
import com.leizhou.dto.UserBean;
import com.leizhou.www.Utility.PasswordUtils;

@Controller
public class LoginController{
	@GetMapping({"/", "/login"})
    public String login(Model model, @RequestParam(value="name", required=false, defaultValue="World") String name) {
        model.addAttribute("name", name);
        return "index";
    }
	
	@PostMapping({"/", "login"})
	public String login(@RequestParam Map<String, Object> payload, HttpSession sessionParent) {
		boolean isValidUser = false;
		System.out.println(payload.get("username").toString());
		UserBean userBean = new DBUsers().getUser(payload.get("username").toString());
		if(userBean != null)
			isValidUser = PasswordUtils.verifyUserPassword(payload.get("password").toString(), userBean.getPassword(), userBean.getSalt());
		
		if (isValidUser) {
			HttpSession session = sessionParent;
			session.setAttribute("user", userBean.getUsername());
			session.setAttribute("roles", userBean.getRoles());
			return "index";
		}
			
		HttpSession session = sessionParent;
		session.setAttribute("user", null);

		return "index";
	}
}