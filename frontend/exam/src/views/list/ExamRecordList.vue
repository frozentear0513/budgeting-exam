<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="参加过的实验">
      <div slot="extra">
        <a-input-search style="margin-left: 16px; width: 272px;"/>
      </div>
      <a-list size="large">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.exam.examDescription">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.exam.examAvatar | imgSrcFilter"/>
            <a slot="title">{{ item.exam.examName }}</a>
          </a-list-item-meta>
          <div slot="actions">
           <!-- <a @click="viewExamRecordDetail(item.examRecord)">查看实验详情</a>-->
            <a-button type="primary"  @click="$refs.editExamModal.edit()">查看详情</a-button>&nbsp;
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Owner</span>
              <p>{{ item.user.userUsername }}</p>
            </div>
            <div class="list-content-item">
              <span>开始时间</span>
              <p>{{ item.examRecord.examJoinDate }}</p>
            </div>
            <div class="list-content-item">
              <span>分数</span>
              <p>{{ item.examRecord.examJoinScore }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>
      <exam-edit-modal ref="editExamModal" @ok="handleOk" />
    </a-card>
  </div>

</template>

<script>
import HeadInfo from '../../components/tools/HeadInfo'
import { getExamRecordList } from '../../api/exam'
import { getExamAll } from '../../api/exam'
import ExamEditModal from './modules/ExamEditModal'
import StepByStepExamModal from './modules/StepByStepExamModal'
import UpdateAvatarModal from '@views/list/modules/UpdateAvatarModal'
export default {
  // 实验记录列表，记录考生参加过地所有实验和实验成绩
  name: 'ExamRecordList',
  components: {
    HeadInfo,
     ExamEditModal,
      StepByStepExamModal,
      UpdateAvatarModal
  },

  data () {
    return {
      data: {},
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
                title: '封面',
                field: 'avatar',
                width: 50,
                formatter: (value, row) => {
                    return '<div class="exam-avatar">' + value + '</div>'
                },
                events: {
                    'click .exam-avatar': function (e, value, row, index) {
                        that.handleAvatarEdit(row)
                    }
                }
            },
            {
                title: '名称',
                field: 'name',
                width: 250
            },
            /*{
                title: '总分数',
                field: 'score'
            },*/
            {
                title: '创建人',
                field: 'creator'
            },
            {
                title: '时长',
                field: 'elapse'
            },
            {
                title: '更新时间',
                field: 'updateTime'
            }
        ],

    }
  },
  methods: {
    /**
     * 根据实验记录的id拿到本次实验的详情并查看
     * @param record 实验详情的记录
     */
    handleEdit (record) {
        // Todo:修改实验信息和下面的参数，弹出一个可修改的输入框，实际上复用创建参数的模态框即可，还没做完
        console.log('开始编辑啦')
        console.log(record)
        debugger;
        this.$refs.editExamModal.edit(record)
    },
      handleOk () {
          this.loadAll()
      }, loadAll () {
          const that = this
          getExamAll()
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
      }
   /* viewExamRecordDetail (record) {
      // 直接跳到参加实验的页面，查看所有参数的详细情况
        console.log('开始编辑啦')
        console.log(record)
        this.$refs.editExamModal.edit(record)
      /!*const routeUrl = this.$router.resolve({
        path: `/exam/record/${record.examId}/${record.examRecordId}`
      })*!/
      // 和点击实验大厅效果一样，跳转到实验页面，里面有所有参数的情况，相当于就是详情了
      //window.open(routeUrl.href, '_blank')
    }*/
  },
  mounted () {
    // 从后端数据获取实验列表，适配前端卡片
    getExamRecordList().then(res => {
      if (res.code === 0) {
        this.data = res.data
      } else {
        this.$notification.error({
          message: '获取实验记录失败',
          description: res.msg
        })
      }
    }).catch(err => {
      // 失败就弹出警告消息
      this.$notification.error({
        message: '获取实验记录失败',
        description: err.message
      })
    })
  }
}
</script>

<style lang="less" scoped>
  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }

  .list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;

    span {
      line-height: 20px;
    }

    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }
</style>
