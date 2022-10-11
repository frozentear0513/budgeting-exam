/***********************************************************
 * @Description : 
 * @author      : 梁山广(Laing Shan Guang)
 * @date        : 2019-05-14 08:23
 * @email       : liangshanguang2@gmail.com
 ***********************************************************/
package com.huawei.l00379880.exam.repository;

import com.huawei.l00379880.exam.entity.ExamRecord;
import com.huawei.l00379880.exam.entity.Sybg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SybgRepository extends JpaRepository<Sybg, String> {
    @Query("select s from Sybg s "
            + "where s.creUser = :userId order by s.creTime desc")
    List<Sybg> sybgList(@Param("userId")String userId);
    @Query("select s from Sybg s "
            + "order by s.creTime desc")
    List<Sybg> sybgAllList();
}
