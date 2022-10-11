/***********************************************************
 * @Description : 
 * @author      : 梁山广(Laing Shan Guang)
 * @date        : 2019-05-14 08:22
 * @email       : liangshanguang2@gmail.com
 ***********************************************************/
package com.huawei.l00379880.exam.repository;

import com.huawei.l00379880.exam.entity.Exam;
import com.huawei.l00379880.exam.entity.ExamStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExamStudentRepository extends JpaRepository<ExamStudent, String> {
    @Query("select e from ExamStudent e order by e.updateTime desc")
    List<ExamStudent> findAll();
    @Query("select e from ExamStudent e where exam_creator_id in (:userId)")
    List<ExamStudent> findUserAll(String userId);
}
