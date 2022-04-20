import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
// import Home from '../views/Home.vue'

// const Allprofile = () => import('../views/hr_manage_table/Allprofile')
const Applicant = () => import('../views/hr_manage_table/Applicant')
const CommonTable = () => import('@/components/CommonTable.vue')
const HrManageTable = () => import('../views/hr_manage_table/HrManageTable')
const ProjectManager = () => import('../views/project_manager/ProjectManger')
const Recruitment = () => import('../views/hr_manage_table/Recruitment')
const PojectStatus = () => import('../views/hr_manage_table/PojectStatus')
const ProjectInfo = () => import('../views/hr_manage_table/ProjectInfo')
const ProjectInfo2 = () => import('../views/project_manager/ProjectInfo')
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
const LoginView = ()  => import('../views/LoginView.vue')
// const Studyhome = ()  => import('../views/study/Studyhome')

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'appHome',
    component: AppHome,
    redirect:'/hrManageTable/applicant',
    children: [
      {
        path:'/hrManageTable',
        name:'home',
        component: HrManageTable,
        redirect:'/hrManageTable/applicant',
      },
      {
        path: '/hrManageTable',
        name: 'HrManageTable',
        component: HrManageTable,
        redirect:'/hrManageTable/applicant',
        children: [
          {
            path: 'applicant',
            name: 'Applicant',
            component: Applicant,
          },
          {
            path: 'recruitment',
            name: 'Recruitment',
            component: Recruitment,
          },
          {
            path: 'pojectStatus',
            name: 'PojectStatus',
            component: PojectStatus,
          },
          {
            path: 'projectInfo',
            name: 'ProjectInfo',
            component: ProjectInfo,
          },
          {
            path: 'commonTable',
            name: 'CommonTable',
            component: CommonTable,
          }
        ]
      },
      {
        path: '/projectManager',
        name: 'ProjectManager',
        component: ProjectManager,
        redirect:'/hrManageTable/projectInfo',
        children: [
          {
            path: 'projectInfo',
            name: 'ProjectInfo',
            component: ProjectInfo2,
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
