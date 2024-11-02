package com.armilog.springbootdeveloper;

import io.github.cdimascio.dotenv.Dotenv;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@MapperScan("com.armilog.springbootdeveloper.mapper")
public class SpringBootDeveloperApplication {
    public static void main(String[] args) {
        // 정확한 경로와 파일명으로 .env 파일 설정
        Dotenv dotenv = Dotenv.configure().filename("DBconnectionSet.env").load();
        // 환경 변수를 시스템 속성으로 재설정 (application.yml 설정한 DB 정보를 덮어씀)
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        SpringApplication.run(SpringBootDeveloperApplication.class, args);
    }
}