<template>
  <a-card :bordered="false">
    <div id="toolbar">
      <a-button type="primary" @click="showModal">新建</a-button>&nbsp;
      <!--<a-button type="primary" icon="reload" @click="loadAll()">刷新</a-button>-->
    </div>
    <BootstrapTable
      ref="table"
      :columns="columns"
      :data="tableData"
      :options="options"
    />
    <a-modal
      title="创建实验报告"
      :width="1100"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
        <a-form :form="form">
          <!-- step1 -->
          <div>
            <a-form-item label="实验名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-model="form.syName"/>
            </a-form-item>
            <a-form-item label="实验目的" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea :rows="2" v-model="form.syMd"></a-textarea>
            </a-form-item>
            <a-form-item label="实验原理" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea :rows="2" v-model="form.syYl"></a-textarea>
            </a-form-item>
            <a-form-item label="实验内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea :rows="2" v-model="form.syNr"></a-textarea>
            </a-form-item>
            <a-form-item label="实验步骤" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <div id="syBz-edit" v-model="form.syBz"></div>
<!--              <a-textarea :rows="2" v-model="form.syBz"></a-textarea>-->
            </a-form-item>
            <a-form-item label="实验数据" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <div id="sySj-edit" v-model="form.sySj"></div>
<!--              <a-textarea :rows="2"v-model="form.sySj"></a-textarea>-->
            </a-form-item>
            <a-form-item label="实验结果与分析" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <div id="syJgfx-edit" v-model="form.syJgfx"></div>
<!--              <a-textarea :rows="2" v-model="form.syJgfx"></a-textarea>-->
            </a-form-item>
            <a-form-item label="实验结论" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea :rows="2" v-model="form.syJl"></a-textarea>
            </a-form-item>
            <a-form-item label="实验建议" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea :rows="2" v-model="form.syJy"></a-textarea>
            </a-form-item>
          </div>
        </a-form>
    </a-modal>

  </a-card>
</template>
<script>
import '../../plugins/bootstrap-table'
import { sybgList,sybgSave } from '../../api/exam'
import StepByStepExamModal from './modules/StepByStepExamModal'
import ExamEditModal from './modules/ExamEditModal'
import UpdateAvatarModal from '@views/list/modules/UpdateAvatarModal'

export default {
  name: 'ExamBookList',
  components: {
    UpdateAvatarModal,
    ExamEditModal,
    StepByStepExamModal
  },
  data () {
    const that = this // 方便在bootstrap-table中引用methods
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {},
      formLayout: 'horizontal',
      visible: false,
      // 表头
      columns: [
        {
          title: '序号',
          field: 'serial',
          formatter: function (value, row, index) {
            return index + 1 // 这样的话每翻一页都会重新从1开始，
          }
        },
        {
          title: '实验名称',
          field: 'syName',
          width: 250
        },
        {
          title: '实验目的',
          field: 'syMd'
        },
        {
          title: '实验原理',
          field: 'syYl'
        },
        {
          title: '操作',
          field: 'action',
          width: '150px',
          formatter: (value, row) => {
            return '&nbsp;&nbsp;' +
              '<button type="button" class="btn btn-success edit-exam">编辑</button>'
          },
          events: {
            'click .view-exam': function (e, value, row, index) {
              that.handleSub(row)
            },
            'click .edit-exam': function (e, value, row, index) {
              that.handleEdit(row)
            }
          }
        }
      ],
      tableData: [], // bootstrap-table的数据
      // custom bootstrap-table
      options: {
        search: true,
        showColumns: true,
        showExport: true,
        pagination: true,
        toolbar: '#toolbar',
        // 下面两行是支持高级搜索，即按照字段搜索
      /*  advancedSearch: true,
        idTable: 'advancedTable'*/
        // 下面是常用的事件，更多的点击事件可以参考：http://www.itxst.com/bootstrap-table-events/tutorial.html
        // onClickRow: that.clickRow,
        // onClickCell: that.clickCell, // 单元格单击事件
        // onDblClickCell: that.dblClickCell // 单元格双击事件
      }
    }
  },
  mounted () {
    this.loadAll() // 加载所有问题的数据
  },
  updated () {
    this.initSummernote('syBz-edit')
    this.initSummernote('sySj-edit')
    this.initSummernote('syJgfx-edit')
  },
  methods: {

    initSummernote (divId) {
      console.log('初始化富文本插件：' + divId)
      $('#' + divId).summernote({
        lang: 'zh-CN',
        placeholder: '请输入内容',
        height: 200,
        width: '100%',
        htmlMode: true,
        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['fontsize', ['fontsize']],
          ['fontname', ['fontname']],
          ['para', ['ul', 'ol', 'paragraph']]
        ],
        fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
        fontNames: [
          'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
          'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
          'Tahoma', 'Times New Roman', 'Verdana'
        ],
        callbacks: {
          onSubmit: function () {
            this.richContent = $('#summernote').summernote('code')
          }
        }
      })
    },
    handleEdit (record) {
      // Todo:修改实验信息和下面的参数，弹出一个可修改的输入框，实际上复用创建参数的模态框即可，还没做完
      this.visible=true;
      this.form=record;
      setTimeout(() => {
        this.setSummernoteContent('syBz-edit', record.syBz)
        this.setSummernoteContent('sySj-edit', record.sySj)
        this.setSummernoteContent('syJgfx-edit', record.syJgfx)
      }, 100);

    },
    handleAvatarEdit (record) {
      // Todo:修改实验信息和下面的参数，弹出一个可修改的输入框，实际上复用创建参数的模态框即可，还没做完
      console.log('开始更新封面啦')
      console.log(record)
      this.$refs.updateAvatarModal.edit(record)
    },
    handleSub (record) {
      // 查看实验，不在模态框里查啦，太麻烦
      // console.log(record)
      // this.$refs.modalView.edit(record)

      // 直接跳到参加实验的页面，查看所有参数的详细情况
      const routeUrl = this.$router.resolve({
        path: `/exam/${record.id}`
      })
      // 和点击实验大厅效果一样，跳转到实验页面，里面有所有参数的情况，相当于就是详情了
      window.open(routeUrl.href, '_blank')
    },
    showModal() {
      this.form={};
      this.setSummernoteContent('syBz-edit', null)
      this.setSummernoteContent('sySj-edit', null)
      this.setSummernoteContent('syJgfx-edit', null)
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk () {
      const that = this
      that.form.syBz = that.getSummernoteContent('syBz-edit')
      that.form.sySj = that.getSummernoteContent('sySj-edit')
      that.form.syJgfx = that.getSummernoteContent('syJgfx-edit')
          sybgSave(this.form).then(res => {
            if (res.code === 0) {
              this.$notification.success({
                message: '请求成功'
              })
              // 关闭弹出框
              this.visible = false;
              this.loadAll();
              this.$emit('ok')
            }
          }).catch(err => {
            // 失败就弹出警告消息
            this.$notification.error({
              message: '请求失败',
              description: err.message
            })

          })
    },

    loadAll () {
      const that = this
      sybgList()
        .then(res => {
          if (res.code === 0) {
            that.tableData = res.data
            that.$refs.table._initTable()
          } else {
            that.$notification.error({
              message: '获取全部实验的列表失败',
              description: res.msg
            })
          }
        })
    },
    getSummernoteContent (divId) {
      return $('#' + divId).summernote('code')
    },
    setSummernoteContent (divId, content) {
      return $('#' + divId).summernote('code', content)
    },



  }
}
</script>

<style lang="less" scoped>
  .ant-col-14 {
    width: 72.333333%;
  }
</style>