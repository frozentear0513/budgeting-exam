// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '../layouts'
import { examList, examAdmin, questionAdmin } from '../core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '车载智能虚拟仿真实验平台' },
    redirect: '/dashboard/home',
    children: [
      // dashboard
      /*{
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/home',
        component: RouteView,
        hideChildrenInMenu: true,
        meta: { title: '首页', keepAlive: true, icon: 'home', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/home',
            name: 'Workplace',
            component: () => import('../views/Home'),
            meta: { title: '简介', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },*/

      {
        path: '/exam-card',
        name: 'exam-card',
        redirect: '/list/exam-card',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '实验大厅', keepAlive: true, icon: examList, permission: ['exam-card'] },
        children: [
          {
            path: '/list/exam-card',
            name: 'ExamCardList',
            component: () => import('../views/list/ExamCardList'),
            meta: { title: '实验大厅列表', keepAlive: true, permission: ['exam-card'] }
          }
        ]
      },
      // list
      {
        path: '/list/exam-table-list',
        name: 'exam-table-list',
        component: PageView,
        redirect: '/list/exam-table-list',
        hideChildrenInMenu: true,
        meta: { title: '实验管理', icon: examAdmin, permission: ['exam-table-list'] },
        children: [
          {
            path: '/list/exam-table-list',
            name: 'ExamTableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('../views/list/ExamTableList'),
            meta: { title: '实验列表', keepAlive: true, permission: ['exam-table-list'] }
          }
        ]
      },
      {
        path: '/list/exam-book-list',
        name: 'exam-book-list',
        component: PageView,
        redirect: '/list/exam-book-list',
        hideChildrenInMenu: true,
        meta: { title: '实验报告管理', icon: examAdmin, permission: ['exam-book'] },
        children: [
          {
            path: '/list/exam-book-list',
            name: 'ExamBookListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('../views/list/ExamBookList'),
            meta: { title: '实验报告列表', keepAlive: true, permission: ['exam-book'] }
          }
        ]
      },
      /*{
        path: '/exam-record-list',
        name: 'exam-record-list',
        redirect: '/list/exam-record-list',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '我的实验', keepAlive: true, icon: 'user', permission: ['exam-record-list'] },
        children: [
          {
            path: '/list/exam-record-list',
            name: 'ExamRecordList',
            component: () => import('../views/list/ExamRecordList'),
            meta: { title: '我参与过的实验列表', keepAlive: true, permission: ['exam-record-list'] }
          }
        ]
      },*/
      {
        path: '/list/exam-student-table-list',
        name: 'exam-student-table-list',
        component: PageView,
        redirect: '/list/exam-student-table-list',
        hideChildrenInMenu: true,
        meta: { title: '我的实验', keepAlive: true,  icon: examAdmin, permission: ['exam-record-list'] },
        children: [
          {
            path: '/list/exam-student-table-list',
            name: 'ExamStudentTableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('../views/list/ExamStudentTableList'),
            meta: { title: '实验列表', keepAlive: true, permission: ['exam-record-list'] }

          }
        ]
      },
      {
        path: '/question-admin',
        name: 'question-admin',
        redirect: '/list/question-table-list',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '参数管理', keepAlive: true, icon: questionAdmin, permission: ['question-admin'] },
        children: [
          {
            path: '/list/question-table-list',
            name: 'QuestionTableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('../views/list/QuestionTableList'),
            meta: { title: '参数管理', keepAlive: true, permission: ['question-admin'] }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        // 隐藏当前菜单，但是因为是需要的，所以不能删掉
        hidden: true,
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('../views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('../views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('../views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    // 所有访问不到的路径最终都会落到404里
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由，不在主菜单上展示，独立的路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('../views/Home')
      },
      {
        path: 'note',
        name: 'NoteTest',
        component: () => import('@views/test/SummerNoteDemo')
      },
      {
        path: 'table',
        name: 'TableTest',
        component: () => import('@views/test/BootStrapTableDemo')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '../views/exception/404')
  },
  {
    path: '/exam/:id',
    component: () => import(/* webpackChunkName: "fail" */ '../views/list/ExamDetail')
  },
  {
    path: '/exam/record/:exam_id/:record_id',
    component: () => import(/* webpackChunkName: "fail" */ '../views/list/ExamRecordDetail')
  }
]
