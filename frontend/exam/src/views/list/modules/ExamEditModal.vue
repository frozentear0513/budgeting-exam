<template>
  <a-modal title="更新实验" :width="640" :visible="visible" :confirmLoading="confirmLoading" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-steps :current="currentStep" :style="{ marginBottom: '28px' }" size="small">
        <a-step title="实验描述" />
        <a-step title="试验参数"/>
        <a-step title="试验工具"/>
        <a-step title="执行"/>
        <a-step title="结果"/>
      </a-steps>
      <a-form :form="form">
        <!-- step1 -->
        <div v-show="currentStep === 0">
          <a-form-item label="实验名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="name" />
          </a-form-item>
          <a-form-item label="实验简述" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea :rows="2" v-model="desc"></a-textarea>
          </a-form-item>
          <a-form-item label="实验封面" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <p>直接点击列表图片修改，建议图片不要大于80*80</p>
          </a-form-item>
        </div>
        <div v-show="currentStep === 1">
          <a-form-item label="实验限时" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number :min="1" :max="200" v-model="elapse" />
            分钟
          </a-form-item>
          <a-form-item label="参数选择" :labelCol="labelCol" :wrapperCol="wrapperCol" enterButton="Search">
            <!-- 单选 -->
            <a-select
              mode="multiple"
              :size="size"
              :default-value="defaultRadios"
              v-if="visible"
              placeholder="参数选择"
              style="width: 100%"
              @popupScroll="popupScroll"
              @change="handleRadioChange"
            >
              <a-select-option v-for="radio in radios" :value="radio.name" :key="radio.id">
                {{ radio.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="实验类型" :labelCol="labelCol" :wrapperCol="wrapperCol" enterButton="Search">
            <!-- 判断 -->
            <a-select
              mode="multiple"
              :size="size"
              :default-value="defaultJudges"
              v-if="visible"
              placeholder="实验类型"
              style="width: 100%"
              @popupScroll="popupScroll"
              @change="handleJudgeChange">
              <a-select-option v-for="judge in judges" :value="judge.name" :key="judge.id">
                {{ judge.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div v-show="currentStep === 2">
          <a-form-item label="选择试验工具" :labelCol="labelCol" :wrapperCol="wrapperCol" enterButton="Search">
            <!-- 多选 -->
            <a-select
              mode="multiple"
              :size="size"
              :default-value="defaultChecks"
              v-if="visible"
              placeholder="选择试验工具"
              style="width: 100%"
              @popupScroll="popupScroll"
              @change="handleCheckChange"
            >
              <a-select-option v-for="check in checks" :value="check.name" :key="check.id">
                {{ check.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="输入代码" :labelCol="labelCol" :wrapperCol="wrapperCol" enterButton="Search">
            <a-textarea :rows="8"  v-model="teaddddd">

             <!-- <img src="../../../assets/examSy/12.png" />-->
               </a-textarea>
          </a-form-item>
        </div>
        <div v-show="currentStep === 3">
          <a-button type="primary" @click="startXl" style="margin-right: 5px">
            开始训练
          </a-button>
          <a-textarea id="startXlShow1" style="background: #94aabf" :rows="12"></a-textarea>

        </div>
        <div v-show="currentStep === 4">
          <div style="text-align:center">
            <img v-show="this.examId=='ff221a5c379b40bda60677e7c54bce02'" src="../../../assets/examSy/shouji.png" />
            <img v-show="this.examId=='bdb911b7b0084f43be00a4ddcdc56011'" src="../../../assets/examSy/renche.png" />
            <img v-show="this.examId=='59a3cb205f3745338c0b7e9d26ce2fe5'" src="../../../assets/examSy/renche.png" />
            <img v-show="this.examId=='1a0b198add8d4a44865ee0ed936198a5'" src="../../../assets/examSy/tianqi.png" />
          </div>
        </div>

      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="back" @click="backward" v-if="currentStep > 0" :style="{ float: 'left' }">上一步</a-button>
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleNext(currentStep)">
        {{ currentStep === 4 && '完成' || '下一步' }}
      </a-button>
    </template>
  </a-modal>
</template>

<script>
    import { getExamQuestionTypeList, examUpdate } from '../../../api/exam'

    const stepForms = [
        ['name', 'elapse', 'desc', 'avatar'],
        ['radioScore', 'checkScore', 'judgeScore'],
        ['option']
    ]

    export default {
        name: 'ExamEditModal',
        data () {
            return {
                examId:"",
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 7 }
                },
                size: 'default',
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 13 }
                },
                visible: false,
                confirmLoading: false,
                currentStep: 0,
                mdl: {},
                form: this.$form.createForm(this),
                // 实验的对象
                exam: {},
                name: '',
                elapse: 0,
                desc: '',
                avatar: '',
                radioScore: 0,
                checkScore: 0,
                judgeScore: 0,
                radios: [],
                checks: [],
                judges: [],
                defaultRadios: [],
                defaultChecks: [],
                defaultJudges: [],
                teaddddd:''
            }
        },
      created(){
        this.teaddddd=" List<ExamQuestionSelectVo> checkQuestionVoList = new ArrayList<>();\n" +
            "        List<Question> checkQuestionList = questionRepository.findByQuestionTypeId(QuestionEnum.CHECK.getId());\n" +
            "        for (Question question : checkQuestionList) {\n" +
            "            ExamQuestionSelectVo checkQuestionVo = new ExamQuestionSelectVo();\n" +
            "            BeanUtils.copyProperties(question, checkQuestionVo);\n" +
            "            checkQuestionVoList.add(checkQuestionVo);\n" +
            "        }\n" +
            "        examQuestionTypeVo.setExamQuestionSelectVoCheckList(checkQuestionVoList);"
      },
        methods: {
            startXl(){
                document.getElementById("startXlShow1").value="/data/virtual/SmartSourceModelsServer/lib/python3.7/site-packages/sklearn/tree/tree.py:297: DeprecationWarning: The min_impurity_split parameter is deprecated. Its default value will change from 1e-7 to 0 in version 0.23, and it will be removed in 0.25. Use the min_impurity_decrease parameter instead.\n" +
                    "\n" +
                    "DeprecationWarning)\n" +
                    "\n" +
                    "训练完成\n" +
                    "\n" +
                    "CPU利用率:54.4%  内存利用率:39.5%  网络延时:1587ms"
            },
            edit (exam) {
                this.examId=exam.id;
                Object.assign(this.exam, exam) // 深度拷贝
                this.visible = true
                // 每次编辑需要先清空下之前的数据
                this.radios = []
                this.checks = []
                this.judges = []
                this.defaultRadios = []
                this.defaultChecks = []
                this.defaultJudges = []
                this.name = exam.name
                this.elapse = exam.elapse
                this.desc = exam.desc
                this.avatar = exam.avatar
                this.radioScore = exam.radioScore
                this.checkScore = exam.checkScore
                this.judgeScore = exam.judgeScore
                const that = this
                // 从后端数据获取单选题、多选题和判断题的列表.在编辑的时候需要在点击"编辑的时候传入进来"
                getExamQuestionTypeList().then(res => {
                    console.log(res)
                    if (res.code !== 0) {
                        that.$notification.error({
                            message: '获取问题列表失败',
                            description: res.msg
                        })
                    }
                    console.log(res.data)
                    that.radios = res.data.radios
                    that.checks = res.data.checks
                    that.judges = res.data.judges
                    // 从exam里面的radios、checks、judges设置下上面的this里面的三个属性，把checked属性设置为true
                    for (let i = 0; i < exam.radios.length; i++) { // 遍历所有的题目的选项
                        that.defaultRadios.push(exam.radios[i].name)
                    }
                    that.handleRadioChange(that.defaultRadios)
                    for (let i = 0; i < exam.checks.length; i++) { // 遍历所有的题目的选项
                        that.defaultChecks.push(exam.checks[i].name)
                    }
                    that.handleCheckChange(that.defaultChecks)
                    for (let i = 0; i < exam.judges.length; i++) { // 遍历所有的题目的选项
                        that.defaultJudges.push(exam.judges[i].name)
                    }
                    that.handleJudgeChange(that.defaultJudges)
                }).catch(err => {
                    // 失败就弹出警告消息
                    this.$notification.error({
                        message: '获取问题列表失败',
                        description: err.message
                    })
                })
            },
            popupScroll () {
                console.log('popupScroll')
            },
            handleNext (step) {
                // 处理下一步或者完成事件
                const { form: { validateFields } } = this
                const currentStep = step + 1
                if (currentStep <= 4) {
                    // stepForms
                    if(currentStep===3){
                        setTimeout(() => {
                            this.startXl();
                        }, 100);
                    }
                    validateFields(stepForms[this.currentStep], (errors, values) => {
                        if (!errors) {
                            this.currentStep = currentStep
                        }
                    })
                    return
                }
                // last step，最后一步，代表完成实验编写，需要点击"完成"创建实验
                this.confirmLoading = true
                console.log('提交数据到后端')
                this.confirmLoading = false
                this.exam.name = this.name
                this.exam.elapse = this.elapse
                this.exam.desc = this.desc
                this.exam.avatar = this.avatar
                this.exam.radioScore = this.radioScore
                this.exam.checkScore = this.checkScore
                this.exam.judgeScore = this.judgeScore
                // 设置单选题、多选题和判断题的内容，但是提交前需要保证都已经被正确更新了
                this.exam.radios = this.radios
                this.exam.checks = this.checks
                this.exam.judges = this.judges
                const that = this
                examUpdate(that.exam).then(res => {
                    // 成功就跳转到结果页面
                    console.log(res)
                    if (res.code === 0) {
                        that.$notification.success({
                            message: '更新成功',
                            description: '实验更新成功'
                        })
                        // 关闭弹出框
                        that.visible = false
                        that.currentStep = 0
                        that.$emit('ok')
                    }
                }).catch(err => {
                    // 失败就弹出警告消息
                    that.$notification.error({
                        message: '实验更新失败',
                        description: err.message
                    })
                })
            },
            backward () {
                this.currentStep--
            },
            handleCancel () {
                // clear form & currentStep
                this.visible = false
                this.currentStep = 0
            },
            // 改变选择的题目列表,这里需要分单选、多选和判断进行单独更新，下面的代码要针对radios、checks和judges分别适配
            handleRadioChange (values) {
                console.log(values)
                // 更新单选题的信息
                for (let i = 0; i < this.radios.length; i++) { // 遍历所有的题目的选项
                    // 取出一个选项的id
                    const name = this.radios[i].name
                    // 当前问题是否被问题创建者选中
                    let checked = false
                    for (let j = 0; j < values.length; j++) { // 拿着
                        const value = values[j]
                        if (name === value) {
                            // 说明这个问题被实验创建者选中
                            checked = true
                            this.radios[i].checked = true
                            break // 跳出内部的for循环
                        }
                    }
                    // 这个选项遍历到最后，发现还不是答案(不在答案数组中)，那么就把这个选项的answer属性设置为false
                    if (checked === false) {
                        this.radios[i].checked = false
                    }
                }
            },

            // 更新多选题信息
            handleCheckChange (values) {
                console.log(values)
                // 更新多选题的信息
                for (let i = 0; i < this.checks.length; i++) { // 遍历所有的题目的选项
                    // 取出一个选项的id
                    const name = this.checks[i].name
                    // 当前问题是否被问题创建者选中
                    let checked = false
                    for (let j = 0; j < values.length; j++) { // 拿着
                        const value = values[j]
                        if (name === value) {
                            // 说明这个问题被实验创建者选中
                            checked = true
                            this.checks[i].checked = true
                            break // 跳出内部的for循环
                        }
                    }
                    // 这个选项遍历到最后，发现还不是答案(不在答案数组中)，那么就把这个选项的answer属性设置为false
                    if (checked === false) {
                        this.checks[i].checked = false
                    }
                }
            },

            // 更新判断题信息
            handleJudgeChange (values) {
                console.log(values)
                // 更新判断题的信息
                for (let i = 0; i < this.judges.length; i++) { // 遍历所有的题目的选项
                    // 取出一个选项的id
                    const name = this.judges[i].name
                    // 当前问题是否被问题创建者选中
                    let checked = false
                    for (let j = 0; j < values.length; j++) { // 拿着
                        const value = values[j]
                        if (name === value) {
                            // 说明这个问题被实验创建者选中
                            checked = true
                            this.judges[i].checked = true
                            break // 跳出内部的for循环
                        }
                    }
                    // 这个选项遍历到最后，发现还不是答案(不在答案数组中)，那么就把这个选项的answer属性设置为false
                    if (checked === false) {
                        this.judges[i].checked = false
                    }
                }
            }
        }
    }
</script>
