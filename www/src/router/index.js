import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Home from '@/components/home/Home'
import Help from '@/components/Help'
import Explorer from '@/components/community/Explorer'
import UserProfile from '@/components/profile/UserProfile'
import ProjectShowspace from '@/components/ProjectShowspace'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/userprofile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/explorer',
      name: 'Explorer',
      component: Explorer
    },
    {
      path: '/project/:projectId',
      name: 'ProjectShowspace',
      component: ProjectShowspace
    }
  ]
})