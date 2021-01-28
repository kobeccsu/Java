package com.leizhou.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminMenuController {

    @RequestMapping("/admin")
    public String adminMenu(){
        return "templates/admin";
    }
}
