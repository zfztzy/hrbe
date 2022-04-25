import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
// import Home from '../views/Home.vue'

// const Allprofile = () => import('../views/hr_manage_table/Allprofile')
const Applicant = () => import('../views/hr_manage_table/Applicant')
const CommonTable = () => import('@/components/CommonTable.vue')
const HrManageTable = () => import('../views/hr_manage_table/HrManageTable')
const BusinessManager = () => import('../views/business_manager/BusinessManager')
const ProjectManager = () => import('../views/project_manager/ProjectManger')
const Recruitment = () => import('../views/hr_manage_table/Recruitment')
const RecruitChart = () => import('../views/hr_manage_table/RecruitChart')
const PojectStatus = () => import('../views/hr_manage_table/PojectStatus')
const pduinfo = () => import('../views/project_manager/PduInfo')
const ProjectInfo = () => import('../views/project_manager/ProjectInfo')
const PoInfo = () => import('../views/project_manager/PoInfo')
const PoList = () => import('../views/business_manager/PoList')
const ClockIn = () => import('../views/clockIn/ClockIn.vue')
const Diary = () => import('../views/diary/Diary')
const Difficulty = () => import('../views/difficulty/Difficulty')
const Qa = () => import('../views/qa/Qa')
const Study = () => import('../views/study/Study')
const Studyhome = ()  => import('../views/study/Studyhome')
const Studyparagraph = ()  => import('../views/study/Studyparagraph')
const Studyleetcode = ()  => import('../views/study/Studyleetcode')
const Studyparagraphlist = ()  => import('../views/study/Studyparagraphlist')
const AppHome = ()  => import('../views/AppHome.vue')
const HomeMenu = ()  => import('../views/HomeMenu.vue')
const LoginView = ()  => import('../views/LoginView.vue')
// const Studyhome = ()  => import('../views/study/Studyhome')

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'appHome',
    component: AppHome,
    redirect:'/home',
    children: [
      {
        path: '/hrManageTable',
        name: 'HrManageTable',
        component: HrManageTable,
        redirect:'/hrManageTable/applicant',
        children: [
          {
            path: 'applicant',
            name: 'applicant',
            component: Applicant,
          },
          {
            path: 'recruitment',
            name: 'recruitment',
            component: Recruitment,
          },
          {
            path: 'pojectStatus',
            name: 'pojectstatus',
            component: PojectStatus,
          },
          {
            path: 'RecruitChart',
            name: 'recruitchart',
            component: RecruitChart,
          }
        ]
      },
      {
        path: '/projectManager',
        name: 'projectmanager',
        component: ProjectManager,
        redirect:'/hrManageTable/projectInfo',
        children: [  
          {
            path: 'pduinfo',
            name: 'pduinfo',
            component: pduinfo,
          },
          {
            path: 'projectInfo',
            name: 'projectinfo',
            component: ProjectInfo,
          },
          {
            path: 'PoInfo',
            name: 'poinfo',
            component: PoInfo,
          }
        ]
      },
      {
        path: '/businessManager',
        name: 'BusinessManager',
        component: BusinessManager,
        redirect:'/businessManager/PoList',
        children: [
          {
            path: 'PoList',
            name: 'PoList',
            component: PoList,
          },
          {
            path: 'commonTable',
            name: 'CommonTable',
            component: CommonTable,
          }
        ]
      },
      {
        path: '/clockIn',
        name: 'ClockIn',
        component: ClockIn
      },
      {
        path: '/diary',
        name: 'Diary',
        component: Diary
      },
      {
        path: '/difficulty',
        name: 'Difficulty',
        component: Difficulty
      },
      {
        path: '/qa',
        name: 'Qa',
        component: Qa
      },
      {
        path: '/study',
        name: 'Study',
        component: Study,
        redirect:'/study/home',
        children:[
          {
            path: 'home',
            name: 'StudyHome',
            component: Studyhome,
          },
          {
            path: '/study/content',
            name: 'Studyparagraph',
            component: Studyparagraph,
          },
          {
            path: 'leetcode',
            name: 'Studyleetcode',
            component: Studyleetcode,
          },
          {
            path: '/study/list',
            name: 'Studyparagraphlist',
            component: Studyparagraphlist,
          },
        ]
      },
      
    ]
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path:'/home',
    name:'home',
    component: HomeMenu
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
