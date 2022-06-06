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
const HrManager = () => import('../views/hr_manager/HrManager')
const Recruitment = () => import('../views/hr_manage_table/Recruitment')
const RecruitChart = () => import('../views/hr_manage_table/RecruitChart')
const PojectStatus = () => import('../views/hr_manage_table/PojectStatus')
const pduinfo = () => import('../views/project_manager/PduInfo')
const ProjectInfo = () => import('../views/project_manager/ProjectInfo')
const PoInfo = () => import('../views/project_manager/PoInfo')
const CustomerInfo = () => import('../views/project_manager/CustomerInfo')
const PoList = () => import('../views/business_manager/PoList')
const Salary = () => import('../views/business_manager/Salary')
const Employee = () => import('../views/hr_manager/Employee')
const EmployeeNum = () => import('../views/hr_manager/EmployeeNum')
const Contact = () => import('../views/hr_manager/Contact')
const AppHome = ()  => import('../views/AppHome.vue')
const HomeMenu = ()  => import('../views/HomeMenu.vue')
const LoginView = ()  => import('../views/LoginView.vue')

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
          },
          {
            path: 'CustomerInfo',
            name: 'customerinfo',
            component: CustomerInfo,
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
            name: 'polist',
            component: PoList,
          },
          {
            path: 'salary',
            name: 'salary',
            component: Salary,
          },
          {
            path: 'commonTable',
            name: 'CommonTable',
            component: CommonTable,
          }
        ]
      },
      {
        path: '/hrManager',
        name: 'HrManager',
        component: HrManager,
        redirect:'/hrManager/Employee',
        children: [
          {
            path: 'employee',
            name: 'employee',
            component: Employee,
          },
          {
            path: 'employeenum',
            name: 'employeenum',
            component: EmployeeNum,
          },
          {
            path: 'contact',
            name: 'contact',
            component: Contact,
          }
        ]
      }
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
