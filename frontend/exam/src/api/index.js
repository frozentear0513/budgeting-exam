const api = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  BaseSetting: '/auth/save',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserSave: '/user/save',
  // 下面是自己的用户认证的接口
  UserRegister: '/user/register',
  UserLogin: '/user/login',

  // 实验的接口
  ExamQuestionList: '/exam/question/list',
  ExamQuestionAll: '/exam/question/all',
  ExamQuestionUpdate: '/exam/question/update',
  ExamQuestionSelection: '/exam/question/selection',
  ExamQuestionCreate: '/exam/question/create',
  ExamList: '/exam/list',
  ExamAll: '/exam/all',
  ExamAllUser: '/exam/allUser',
  // 获取问题列表，按照单选、多选和判断进行分类
  ExamQuestionTypeList: '/exam/question/type/list',
  ExamCreate: '/exam/create',
  ExamStudentCreate: '/exam/createStudent',
  ExamUpdate: '/exam/update',
  ExamCardList: '/exam/card/list',
  // 获取实验详情
  ExamDetail: '/exam/detail/',
  // 获取实验详情
  QuestionDetail: '/exam/question/detail/',
  // 交卷
  FinishExam: '/exam/finish/',
  ExamRecordList: '/exam/record/list',
  recordDetail: '/exam/record/detail/',

//获取全部试验报告列表
  sybgList: '/exam/sybgList',
  sybgSave: '/exam/sybgSave',
}
export default api
