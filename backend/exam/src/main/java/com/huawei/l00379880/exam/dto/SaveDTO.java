/***********************************************************
 * @Description : 注册接口参数
 * @author      : 梁山广(Laing Shan Guang)
 * @date        : 2019-05-16 23:40
 * @email       : liangshanguang2@gmail.com
 ***********************************************************/
package com.huawei.l00379880.exam.dto;

import lombok.Data;

@Data
public class SaveDTO {
    private String nickname;
    private String email;
    private String password;
    private String mobile;
    /**
     * 验证码
     */
    private String captcha;
}
