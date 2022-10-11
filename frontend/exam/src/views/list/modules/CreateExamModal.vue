<template>
  <a-modal
    title="创建实验"
    :width="740"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-steps :current="currentStep" :style="{ marginBottom: '28px' }" size="small">
        <a-step title="实验描述"/>
        <a-step title="试验参数"/>
        <a-step title="选择试验工具"/>
        <a-step title="执行"/>
        <a-step title="结果"/>
      </a-steps>
      <a-form :form="form">
        <!-- step1 -->
        <div v-show="currentStep === 0">
          <a-form-item
            label="实验名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['name', {rules: [{required: true}]}]"/>
          </a-form-item>
          <a-form-item
            label="实验简述"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-textarea :rows="2" v-decorator="['desc', {rules: [{required: true}]}]"></a-textarea>
          </a-form-item>
        </div>
        <div v-show="currentStep === 1">

          <a-form-item
            label="实验类型"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            enterButton="Search"
          >
            <a-select
              mode="multiple"
              :size="size"
              placeholder="请选择实验类型"
              style="width: 100%"
              @popupScroll="popupScroll"
              @change="handleJudgeChange"
            >
              <a-select-option v-for="judge in judges" :value="judge.name" :key="judge.id">
                {{ judge.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="参数选择"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            enterButton="Search"
          >
            <!-- 单选 -->
            <a-select
              mode="multiple"
              :size="size"
              placeholder="请选择参数"
              style="width: 100%"
              @popupScroll="popupScroll"
              @change="handleRadioChange"
            >
              <a-select-option v-for="radio in radios" :value="radio.name" :key="radio.id">
                {{ radio.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div v-show="currentStep === 2">
          <a-form-item
            label="选择试验工具"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            enterButton="Search"
          >
            <!-- 多选 -->
            <a-select
              mode="multiple"
              :size="size"
              placeholder="请选择试验工具"
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
            <a-textarea :rows="8" v-decorator="['daima', {rules: [{required: false}]}]"></a-textarea>
          </a-form-item>
        </div>
        <div v-show="currentStep === 3">
          <a-button type="primary" @click="startXl" style="margin-right: 5px">
            开始训练
          </a-button>
          <!--          <a-textarea id="topic" rows="10" name="topic"  ></a-textarea>-->
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
    import '../../../plugins/summernote'
    import $ from 'jquery'
    import { getExamQuestionTypeList, ExamStudentCreate } from '../../../api/exam'

    const stepForms = [
        ['name', 'elapse', 'desc'],
        ['radioScore', 'checkScore', 'judgeScore'],
        ['option']
    ]

    export default {
        name: 'StepByStepExamModal',
        data () {
            return {
                examId:"",
                startXlShow:false,
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
                // 单选题对象列表
                radios: [],
                // 多选题对象列表
                checks: [],
                // 判断题对象列表
                judges: []
            }
        },
        updated () {
            this.initSummernote()
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
            initSummernote () {
                console.log('初始化富文本插件')
                $('#summernote-exam-avatar-create').summernote({
                    lang: 'zh-CN',
                    placeholder: '粘贴截图到这即可，图片最好不要大于80*80',
                    height: 200,
                    width: 320,
                    htmlMode: true,
                    toolbar: [],
                    fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
                    fontNames: [
                        'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
                        'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
                        'Tahoma', 'Times New Roman', 'Verdana'
                    ]
                })
            },
            createStudent (item) {
                this.examId=item.id;
                this.startXlShow = false;
                this.visible = true
                // 从后端数据获取单选题、多选题和判断题的列表
                getExamQuestionTypeList().then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        console.log(res.data)
                        this.radios = res.data.radios
                        this.checks = res.data.checks
                        this.judges = res.data.judges
                    } else {
                        this.$notification.error({
                            message: '获取问题列表失败',
                            description: res.msg
                        })
                    }
                }).catch(err => {
                    // 失败就弹出警告消息
                    this.$notification.error({
                        message: '获取问题列表失败',
                        description: err.message
                    })
                })
            },
            handleChange (value) {
                console.log(`selected ${value}`)
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
                    validateFields(stepForms[this.currentStep], (errors, values) => {
                        if (!errors) {
                            this.currentStep = currentStep
                        }
                    })
                    return
                }
                // last step，最后一步，代表完成实验编写，需要点击"完成"创建实验
                this.confirmLoading = true
                validateFields((errors, values) => { // values就是表单中校验的值，后面提交到后端接口时主要就是用这个values
                    debugger;
                    // values.avatar = $('#summernote-exam-avatar-create').summernote('code')
                    // 设置单选题、多选题和判断题的内容，但是提交前需要保证都已经被正确更新了
                    values.radios = this.radios
                    values.checks = this.checks
                    values.judges = this.judges
                    console.log('提交数据到后端')
                    this.confirmLoading = false
                    if (!errors) {
                        // 在这里把创建的实验的内容(存放在values中)提交给后端接口，需要的参数都已经封装成values这个json啦
                        console.log('values:', values)
                        // 把data中的question属性提交到后端，待写完后端接口.把前端的创建的题型提交到后端
                        ExamStudentCreate(values).then(res => {
                            // 成功就跳转到结果页面
                            console.log(res)
                            debugger;
                            if (res.code === 0) {
                                this.$notification.success({
                                    message: '创建成功',
                                    description: '实验创建成功'
                                })
                                // 关闭弹出框
                                this.visible = false
                                this.$emit('ok')
                            }
                        }).catch(err => {
                            // 失败就弹出警告消息
                            this.$notification.error({
                                message: '实验创建失败',
                                description: err.message
                            })
                        })
                    } else {
                        this.confirmLoading = false
                    }
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
                // 更新单选题的信息
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
                // 更新单选题的信息
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
