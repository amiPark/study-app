package com.armilog.springbootdeveloper.web;

import com.armilog.springbootdeveloper.service.authService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class authController {
    @Autowired
    private authService authService;

    @PostMapping("/registerUserInfo")
    public ResponseEntity<String> signUp(Map<String, Object> param) {
        try {
            boolean isinsertUser = authService.insertUser(param);
            if (isinsertUser) {
                return ResponseEntity.ok("회원가입이 완료되었습니다.");
            } else {
                return ResponseEntity.status(400).body("회원가입에 실패했습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("회원가입 중 오류가 발생했습니다.");
        }
    }
}
