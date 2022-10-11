// 实验相关的接口，包括实验、问题、选项和评分等接口

import api from './index'
import { axios } from '../utils/request'

export function getQuestionList (parameter) {
  return axios({
    url: api.ExamQuestionList,
    method: 'get',
    params: parameter
  })
}

export function getQuestionAll () {
  return axios({
    url: api.ExamQuestionAll,
    method: 'get'
  })
}

export function questionUpdate (parameter) {
  console.log(parameter)
  return axios({
    url: api.ExamQuestionUpdate,
    method: 'post',
    data: parameter
  })
}

export function getQuestionSelection () {
  return axios({
    url: api.ExamQuestionSelection,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function questionCreate (parameter) {
  console.log(parameter)
  return axios({
    url: api.ExamQuestionCreate,
    method: 'post',
    data: parameter
  })
}

export function getExamList (parameter) {
  return axios({
    url: api.ExamList,
    method: 'get',
    params: parameter
  })
}

export function getExamAll () {
  return axios({
    url: api.ExamAll,
    method: 'get'
  })
}

//获取全部试验报告列表
export function sybgList () {
  return axios({
    url: api.sybgList,
    method: 'get'
  })
}

export function sybgSave (parameter) {
  console.log(parameter)
  return axios({
    url: api.sybgSave,
    method: 'post',
    data: parameter
  })
}


export function getExamAllUser () {
  return axios({
    url: api.ExamAllUser,
    method: 'get'
  })
}

// 获取所有问题，按照单选、多选和判断进行分类
export function getExamQuestionTypeList () {
  return axios({
    url: api.ExamQuestionTypeList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function ExamStudentCreate (parameter) {
  console.log(parameter)
  return axios({
    url: api.ExamStudentCreate,
    method: 'post',
    data: parameter
  })
}

export function getExamCardList () {
  return axios({
    url: api.ExamCardList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function examCreate (parameter) {
  console.log(parameter)
  return axios({
    url: api.ExamCreate,
    method: 'post',
    data: parameter
  })
}

export function examUpdate (parameter) {
  console.log(parameter)
  return axios({
    url: api.ExamUpdate,
    method: 'post',
    data: parameter
  })
}

export function getExamDetail (examId) {
  return axios({
    url: api.ExamDetail + examId,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getExamRecordDetail (recordId) {
  return axios({
    url: api.recordDetail + recordId,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getQuestionDetail (questionId) {
  return axios({
    url: api.QuestionDetail + questionId,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function finishExam (examId, answersMap) {
  console.log(answersMap)
  return axios({
    url: api.FinishExam + examId,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: answersMap
  })
}

export function getExamRecordList () {
  return axios({
    url: api.ExamRecordList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
