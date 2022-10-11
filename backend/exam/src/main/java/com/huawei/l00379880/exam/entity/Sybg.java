/***********************************************************
 * @Description : 试验表，要有题目、总分数、时间限制、有效日期、创建者等字段
 * @author      : 梁山广(Laing Shan Guang)
 * @date        : 2019/5/14 07:42
 * @email       : liangshanguang2@gmail.com
 ***********************************************************/

package com.huawei.l00379880.exam.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@DynamicUpdate
public class Sybg {
    @Id
    private String id;

    private String syName;

    private String syMd;

    private String syYl;

    private String syNr;

    private String syBz;

    private String sySj;

    private String syJgfx;

    private String syJl;

    private String syJy;

    private String creUser;
    /**
     * 创建时间, 设计表时设置了自动插入当前时间，无需在Java代码中设置了
     */

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date creTime;
}
