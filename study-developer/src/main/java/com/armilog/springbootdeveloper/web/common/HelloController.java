package com.armilog.springbootdeveloper.web.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/common")
@RestController
public class HelloController {

    @GetMapping("/hello")
    public Map<String, String> getHello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from Spring Boot!");
        return response;
    }
}
