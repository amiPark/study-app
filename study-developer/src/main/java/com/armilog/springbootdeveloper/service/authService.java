package com.armilog.springbootdeveloper.service;

import com.armilog.springbootdeveloper.mapper.authMapperDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class authService {
    @Autowired
    private authMapperDao authMapperDao;
    @Autowired
    private PasswordEncoder passwordEncoder;
    // SLF4J 로거 인스턴스 생성
    private static final Logger logger = LoggerFactory.getLogger(authService.class);

    public boolean insertUser(Map<String, Object> param) {
        try {
            // 비밀번호 암호화
            String password = (String) param.get("password");
            param.put("password", passwordEncoder.encode(password));
            // 데이터베이스에 사용자 정보를 삽입하고 결과를 반환
            int result = authMapperDao.insertUser(param);
            // 삽입이 성공하면 result는 1 이상, 실패하면 0
            return result > 0;
        } catch (Exception e) {
            // 예외 발생 시 로그 기록
            logger.error("회원가입 중 오류가 발생했습니다.", e);
            return false;
        }
    }
}