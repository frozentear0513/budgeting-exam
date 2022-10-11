<template>

  <div class="card-list" ref="content">
    <a-button style="margin-bottom: 10px" type="primary" @click="handleToHome">返回首页</a-button>
    <a-list
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem"   slot-scope="item,index"  style="width: 550px;margin-left: 20px"  >
        <a-card :hoverable="true">
          <a-card-meta>
            <div style="margin-bottom: 3px" slot="title">{{ item.title }}</div>
            <a-avatar class="card-avatar" slot="avatar" :src="item.avatar | imgSrcFilter" size="large" />
            <div class="meta-content" slot="description">{{ item.content }}</div>
          </a-card-meta>
          <div id="toolbar">
          <p>温馨提示：为了更好的体验，请使用谷歌浏览器或者360浏览器极速模式！</p>
            <a-button style="margin-left:20px " @click="showModal(index)">查看文档</a-button>
            <a-button style="margin-left:60px "  @click="$refs.createExamModal.createStudent(item)">创建试验</a-button>
            <a-button style="margin-left:60px " @click="showVideo(index)">试验演示</a-button>
            <!-- ref是为了方便用this.$refs.modal直接引用，下同 -->
            <create-exam-modal ref="createExamModal" @ok="handleOk" />
          </div>
          <template class="ant-card-actions" slot="actions">
            <a>满分：{{ item.score }}分</a>
            <a>限时：{{ item.elapse }}分钟</a>
          </template>
        </a-card>
      </a-list-item>
    </a-list>
    <a-modal width="500px" :visible="visibleVideo" :closable="false" :confirm-loading="confirmLoading" @ok="handleOkVideo"
             @cancel="handleCancelVideo">
      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
      ></video-player>
    </a-modal>
    <a-modal
      width="700px"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="pdf" v-show="fileType === 'pdf'">
        <p class="arrow">
          <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上一页</span>
          {{currentPage}} / {{pageCount}}
          <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">下一页</span>
        </p>
        <pdf
          :src="src"
          :page="currentPage"
          @num-pages="pageCount=$event"
          @page-loaded="currentPage=$event"
          @loaded="loadPdfHandler">
        </pdf>
      </div>
    </a-modal>
  </div>

</template>
<script>

    import { getExamCardList } from '../../api/exam'
    import '../../plugins/bootstrap-table'
    import CreateExamModal from './modules/CreateExamModal'
    import pdf from 'vue-pdf'
    export default {
        name: 'ExamCardList',
        components: {
            pdf,
            CreateExamModal},
        data () {
            return {
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, // 如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [],
                    hls: true,
                    poster: '', // 你的封面地址
                    width: document.documentElement.clientWidth, // 播放器宽度
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,//时间分割线
                        durationDisplay: true,//总时间
                        remainingTimeDisplay: false,//剩余播放时间
                        progressControl: true, // 进度条
                        fullscreenToggle: true // 全屏按钮
                    }
                },
                visibleVideo: false,
                visible2: false,
                confirmLoading: false,
              //  description: '车载智能虚拟仿真实验平台\n' +
              //      '本平台的虚仿实验由省级科研“微观交通仿真关键技术研究及应用”项目和校级教改项目“智能网联汽车应用开发虚拟仿真实验”项目相关成果转化而来。本平台承担包括车载应用开发基础在内的3门课程的实验教学任务，包含智能汽车“人-车交互”系统应用、车载系统“手机-车机”互联应用等4个具体的实验项目，共16学时。',
                //extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
                dataSource: [],
                visible:false,
                currentPage: 0, // pdf文件页码
                pageCount: 0, // pdf文件总页数
                fileType: 'pdf', // 文件类型
                src: 'http://202.115.17.243:/home/实验手册-音效.pdf', // pdf文件地址
                srcList:[
                    {
                        url:'http://202.115.17.243:9999/home/实验手册.pdf'
                    },
                    {
                        url:'http://202.115.17.243:9999/home/实验手册-天气.pdf'
                    },
                    {
                        url:'http://202.115.17.243:9999/home/实验手册-音效.pdf'
                    },
                    {
                        url:'http://202.115.17.243:9999/home/实验手册-人车.pdf'
                    },
                ],

                tableData: [], // bootstrap-table的数据
                // custom bootstrap-table
                // options: {
                /*search: true,
                showColumns: true,
                showExport: true,
                pagination: true,*/
                // toolbar: '#toolbar',
                // 下面两行是支持高级搜索，即按照字段搜索
                /* advancedSearch: true,
                 idTable: 'advancedTable'*/
                // 下面是常用的事件，更多的点击事件可以参考：http://www.itxst.com/bootstrap-table-events/tutorial.html
                // onClickRow: that.clickRow,
                // onClickCell: that.clickCell, // 单元格单击事件
                // onDblClickCell: that.dblClickCell // 单元格双击事件
                //}
            }
        },
        mounted () {
            // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
            this.src = pdf.createLoadingTask(this.src)
            console.log(pdf)
            // 从后端数据获取实验列表，适配前端卡片
            getExamCardList().then(res => {
                console.log(res)
                if (res.code === 0) {
                    this.dataSource = res.data
                } else {
                    this.$notification.error({
                        message: '获取实验列表失败',
                        description: res.msg
                    })
                }
            }).catch(err => {
                // 失败就弹出警告消息
                this.$notification.error({
                    message: '获取实验列表失败',
                    description: err.message
                })
            })
        },
        methods:{
            showVideo(index){
                this.playerOptions.sources = [];
                if(index==0){
                    this.playerOptions.sources.push({
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: 'http://202.115.17.243:9999/home/1.mp4' // url地址
                    })
                }else if(index==1){
                    this.playerOptions.sources.push({
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: 'http://202.115.17.243:9999/home/2.mp4' // url地址
                    })
                }else if(index==2){
                    this.playerOptions.sources.push({
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: 'http://202.115.17.243:9999/home/3.mp4' // url地址
                    })
                }else if(index==3){
                    this.playerOptions.sources.push({
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: 'http://202.115.17.243:9999/home/4.mp4' // url地址
                    })
                }

                this.visibleVideo=true;
            },
            // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
            changePdfPage (val) {
                // console.log(val)
                if (val === 0 && this.currentPage > 1) {
                    this.currentPage--
                    // console.log(this.currentPage)
                }
                if (val === 1 && this.currentPage < this.pageCount) {
                    this.currentPage++
                    // console.log(this.currentPage)
                }
            },

            // pdf加载时
            loadPdfHandler (e) {
                this.currentPage = 1 // 加载的时候先加载第一页
            },
            showModal(index) {
                this.visible = true;
                this.src = this.srcList[index].url

            },
            handleOk(e) {
                this.loadAll();
                this.visible = false;
            },
            handleCancel(e) {
                console.log('Clicked cancel button');
                this.visible = false;
            },
            handleOkVideo(e) {
                this.visibleVideo = false;
            },
            handleCancelVideo(e) {
                this.visibleVideo = false;
            },
            handleToHome () {
                // this.$router.push({ name: 'dashboard' })
                //this.$router.push({ name: 'exam-card' })
                location.href='https://ias.uestc.edu.cn/';
            },
            handleEdit (record) {
                // Todo:修改实验信息和下面的题目，弹出一个可修改的输入框，实际上复用创建题目的模态框即可，还没做完
                console.log('开始编辑啦')
                console.log(record)
                this.$refs.editExamModal.edit(record)
            },
            handleAvatarEdit (record) {
                // Todo:修改实验信息和下面的题目，弹出一个可修改的输入框，实际上复用创建题目的模态框即可，还没做完
                console.log('开始更新封面啦')
                console.log(record)
                this.$refs.updateAvatarModal.edit(record)
            },
            handleSub (record) {
                // 查看实验，不在模态框里查啦，太麻烦
                // console.log(record)
                // this.$refs.modalView.edit(record)

                // 直接跳到参加实验的页面，查看所有题目的详细情况
                const routeUrl = this.$router.resolve({
                    path: `/exam/${record.id}`
                })
                // 和点击实验大厅效果一样，跳转到实验页面，里面有所有题目的情况，相当于就是详情了
                window.open(routeUrl.href, '_blank')
            },

        }
    }
</script>

<style lang="less" scoped>
  /deep/.ant-spin-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  /deep/.ant-card-body{
    padding: 37px;
  }
  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }

  .ant-card-actions {
    background: #f7f9fa;

    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }

  .meta-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .btn{
    display: flex !important;
    justify-content: space-between;
  }

</style>
