package com.armilog.springbootdeveloper;

import io.github.cdimascio.dotenv.Dotenv;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.File;

@SpringBootApplication
@MapperScan("com.armilog.springbootdeveloper.mapper")
public class SpringBootDeveloperApplication {
    public static void main(String[] args) {
        // OS 확인
        boolean isWindows = System.getProperty("os.name").toLowerCase().contains("windows");
        String pathSeparator = isWindows ? "\\" : "/";
        
        // 먼저 현재 디렉토리에서 시도
        Dotenv dotenv = null;
        try {
            String currentPath = System.getProperty("user.dir");
            System.out.println("현재 실행 경로: " + currentPath);
            
            // VSCode에서 실행될 때의 경로 처리
            if (currentPath.endsWith(pathSeparator + "study-developer")) {
                String parentPath = new File(currentPath).getParent();
                dotenv = Dotenv.configure()
                    .directory(parentPath)  // study-app 디렉토리
                    .filename("DBconnectionSet.env")
                    .load();
            }
            // IntelliJ나 다른 환경에서 실행될 때의 경로 처리
            else {
                dotenv = Dotenv.configure()
                    .directory(currentPath)  // 현재 실행 디렉토리
                    .filename("DBconnectionSet.env")
                    .load();
            }
        } catch (Exception e) {
            System.err.println("환경 설정 파일을 찾을 수 없습니다: " + e.getMessage());
            throw new RuntimeException("DBconnectionSet.env 파일을 찾을 수 없습니다.", e);
        }

        String projectRoot = System.getProperty("user.dir");
        // VSCode 실행 시 경로 조정
        String walletPath = projectRoot.endsWith(pathSeparator + "study-developer") 
            ? projectRoot + pathSeparator + "src" + pathSeparator + "main" + pathSeparator + "resources" + pathSeparator + "wallet"
            : projectRoot + pathSeparator + "study-developer" + pathSeparator + "src" + pathSeparator + "main" + pathSeparator + "resources" + pathSeparator + "wallet";
        
        // Wallet 경로 설정
        System.setProperty("oracle.net.tns_admin", walletPath);
        System.setProperty("oracle.net.wallet_location", walletPath);
            
        // DB URL에 wallet 경로 설정
        String dbUrl = dotenv.get("DB_URL");
        if (!dbUrl.contains("TNS_ADMIN")) {
            dbUrl += "?TNS_ADMIN=" + walletPath;
        }
        
        // 환경 변수를 시스템 속성으로 재설정
        System.setProperty("DB_URL", dbUrl);
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));

        SpringApplication.run(SpringBootDeveloperApplication.class, args);
    }
}