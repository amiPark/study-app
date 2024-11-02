package com.armilog.springbootdeveloper.service;

import com.armilog.springbootdeveloper.mapper.UserMapperDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserMapperDao userMapperDao;
    public String findById(String id) {
        return userMapperDao.findById(id);
    }
}