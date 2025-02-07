package com.armilog.springbootdeveloper.web.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

/**
 * <pre>
 *  fileName : CommonController.java
 *  Date : 2025-02-08
 *  To : 공통코드화를 하기위한 컨트롤러
 *  */

@RequestMapping("/common")
@RestController
public class CommonController{

	/**
	 * 테스트용 URL
	 * @param
	 * @return Map<String,Object>
	 *  */
    @GetMapping("/test")
    public Map<String, String> getTest() {
        Map<String, String> response = new HashMap<>();
        response.put("code-status", "200");
        return response;
    }
}
