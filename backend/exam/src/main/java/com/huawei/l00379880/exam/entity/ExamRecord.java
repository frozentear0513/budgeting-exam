/***********************************************************
 * @Description : 参加试验的记录，要有试验记录的id、参与者、参与时间、耗时、得分、得分级别(另建表)
 * @author      : 梁山广(Laing Shan Guang)
 * @date        : 2019/5/14 07:43
 * @email       : liangshanguang2@gmail.com
 ***********************************************************/
package com.huawei.l00379880.exam.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
public class ExamRecord {
    /**
     * 主键
     */
    @Id
    private String examRecordId;
    /**
     * 参与的试验的id
     */
    private String examId;

    /**
     * 考生作答地每个题目的选项(题目和题目之间用_分隔，题目有多个选项地话用-分隔),用于查看试验详情
     */
    private String answerOptionIds;

    /**
     * 参与者，即user的id
     */
    private String examJoinerId;
    /**
     * 参加试验的日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date examJoinDate;
    /**
     * 试验耗时(秒)
     */
    private Integer examTimeCost;
    /**
     * 试验得分
     */
    private Integer examJoinScore;
    /**
     * 试验得分水平
     */
    private Integer examResultLevel;
}
