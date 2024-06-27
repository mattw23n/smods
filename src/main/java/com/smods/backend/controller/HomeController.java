package com.smods.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String welcome() {
        return "(☞ﾟヮﾟ)☞ welcome to smods ☜(ﾟヮﾟ☜)<br>".repeat(69);
    }
}
