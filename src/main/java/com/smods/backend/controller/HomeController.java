package com.smods.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String welcome() {
        StringBuilder message = new StringBuilder();
        for (int i = 0; i < 69; i++) {
            message.append("(☞ﾟヮﾟ)☞ welcome to smods ☜(ﾟヮﾟ☜)<br>");
        }
        return message.toString();
    }
}
