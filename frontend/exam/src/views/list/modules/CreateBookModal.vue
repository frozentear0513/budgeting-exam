<template>
  <a-modal
    title="创建实验报告"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
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
      </a-form>
    </a-spin>
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
      create () {
      this.visible = true
      // 从后端数据获取单选题、多选题和判断题的列表
      /*getExamQuestionTypeList().then(res => {
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
      })*/
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
      if (currentStep <= 2) {
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
    // 改变选择的参数列表,这里需要分单选、多选和判断进行单独更新，下面的代码要针对radios、checks和judges分别适配
    handleRadioChange (values) {
      console.log(values)
      // 更新单选题的信息
      for (let i = 0; i < this.radios.length; i++) { // 遍历所有的参数的选项
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
      for (let i = 0; i < this.checks.length; i++) { // 遍历所有的参数的选项
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
      for (let i = 0; i < this.judges.length; i++) { // 遍历所有的参数的选项
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
