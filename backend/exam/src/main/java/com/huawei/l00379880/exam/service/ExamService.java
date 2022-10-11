/***********************************************************
 * @Description : 试验接口
 * @author      : 梁山广(Laing Shan Guang)
 * @date        : 2019-05-28 08:05
 * @email       : liangshanguang2@gmail.com
 ***********************************************************/
package com.huawei.l00379880.exam.service;

import com.huawei.l00379880.exam.entity.*;
import com.huawei.l00379880.exam.vo.*;

import java.util.HashMap;
import java.util.List;

public interface ExamService {
    /**
     * 获取所有的问题列表
     */
    List<QuestionVo> getQuestionAll();

    /**
     * 根据前端传过来的问题实体更新问题和选项
     *
     * @param questionVo 问题实体
     */
    QuestionVo updateQuestion(QuestionVo questionVo);

    /**
     * 问题创建
     *
     * @param questionCreateVo 问题创建实体类
     */
    void questionCreate(QuestionCreateVo questionCreateVo);

    /**
     * 获取问题的选项、分类和难度的下拉列表
     *
     * @return 选项、分类和难度的封装对象
     */
    QuestionSelectionVo getSelections();

    /**
     * 获取问题详情
     *
     * @param id 问题的id
     * @return 问题详情的封装VO
     */
    QuestionDetailVo getQuestionDetail(String id);

    /**
     * 获取全部试验的列表
     */
    List<ExamVo> getExamAll();
    List<ExamVo> getExamUser(String id);

    /**
     * 获取所有问题的下拉列表，方便前端创建试验时筛选
     *
     * @return 适配前端的问题下拉列表
     */
    ExamQuestionTypeVo getExamQuestionType();

    /**
     * 根据前端组装的参数进行试验创建
     *
     * @param examCreateVo 前端组装的试验对象
     * @param userId       用户id
     * @return 创建好的试验
     */
    Exam create(ExamCreateVo examCreateVo, String userId);

    ExamStudent createStudent(ExamCreateVo examCreateVo, String userId);
    /**
     * 获取试验卡片列表
     *
     * @return 试验卡片列表
     */
    List<ExamCardVo> getExamCardList();

    /**
     * 根据试验的id获取试验的详情
     *
     * @param id exam表的主键
     * @return 试验详情的封装的VO对象
     */
    ExamDetailVo getExamDetail(String id);

    /**
     * 根据用户提交的作答信息进行判分
     *
     * @param userId     试验人
     * @param examId     参与的试验
     * @param answersMap 作答情况
     * @return 本次试验记录
     */
    ExamRecord judge(String userId, String examId, HashMap<String, List<String>> answersMap);

    /**
     * 根据用户id获取此用户的所有试验信息
     *
     * @param userId 用户id
     * @return 该用户的所有试验记录
     */
    List<ExamRecordVo> getExamRecordList(String userId);

    /**
     * 获取指定某次试验记录的详情
     *
     * @param recordId 试验记录的id
     * @return 试验详情
     */
    RecordDetailVo getRecordDetail(String recordId);


    /**
     * 更新试验
     *
     * @param examVo 获取所有试验的接口中返回的试验信息结构
     * @param userId 当前的用户
     * @return 更新后的试验详情
     */
    Exam update(ExamVo examVo, String userId);

    List<Sybg> sybgList(String userId);

    ResultVO sybgSave(Sybg sybg);
}
