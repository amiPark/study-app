package com.armilog.springbootdeveloper.mapper;

import org.apache.ibatis.annotations.Mapper;
import java.util.Map;


@Mapper
public interface authMapperDao {
    int insertUser(Map<String, Object> param);
}
