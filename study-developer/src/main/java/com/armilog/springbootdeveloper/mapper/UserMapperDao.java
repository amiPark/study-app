package com.armilog.springbootdeveloper.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapperDao {

    String findById(String id);
}
