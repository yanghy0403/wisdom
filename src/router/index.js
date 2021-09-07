import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);
 
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('../views/Home.vue')//路由懒加载
  },
  {
    path: "/talent",
    name: "talent",
    meta:{
        requireAuth:true
    },
    component: () => import('../views/knowledge/TalentMain.vue')//人才查询列表页
  },
  {
    path: "/talentdetails",
    name: "talentdetails",
    meta:{
      requireAuth:true
  },
    component: () => import('../views/knowledge/Talent/talentDetails.vue')//人才查询
  },
  {
    path: "/results",
    name: "results",
    redirect:'/results/domesticPaper',
    meta:{
      requireAuth:true
     },
    component: () => import('../views/knowledge/resultsMain.vue'),//成果查询
    children:[
      {
        path: "/results/journal",
        name: "journal",
        meta:{
          requireAuth:true
         },
        component: () => import('../views/knowledge/result/journal/index.vue')//国内期刊
      },

      {
        path: "/results/journaldetail",
        name: "journaldetail",
        meta:{
          requireAuth:true
         },
        component: () => import('../views/knowledge/result/journal/journaldetail.vue')//成果查询期刊详情
      },
      {
        path: "/results/patent",
        name: "patent",
        meta:{
          requireAuth:true
         },
        component: () => import('../views/knowledge/result/patent/index.vue')//成果查询专利
      },
      {
        path: "/results/patentdetail",
        name: "patentdetail",
        meta:{
          requireAuth:true
         },
        component: () => import('../views/knowledge/result/patent/patentdetail.vue')//成果查询专利详情
      },
      {
        path: "/results/internationalPaper",
        name: "internationalPaper",
        meta:{
          requireAuth:true
         },
        component: () => import('../views/knowledge/result/internationalPaper/index.vue')//成果查询国际论文
      },
      {
        path: "/results/internationaldetail",
        name: "internationaldetail",
        meta:{
          requireAuth:true
         },
        component: () => import('../views/knowledge/result/internationalPaper/internationaldetail.vue')//成果查询国际论文详情
      },
      {
        path: "/results/domesticPaper",
        name: "domesticPaper",
        meta:{
          requireAuth:true
         },
        component: () => import('../views/knowledge/result/domesticPaper/index.vue')//成果查询国内论文
      },
      {
        path: "/results/domesticdetail",
        name: "domesticdetail",
        meta:{
          requireAuth:true
         },
        component: () => import('../views/knowledge/result/domesticPaper/domesticdetail.vue')//成果查询国内论文详情
      },
      {
        path: "/results/reward",
        name: "reward",
        meta:{
          requireAuth:true
         },
        component: () => import('../views/knowledge/result/reward/index.vue')//成果查询国内论文
      },
      {
        path: "/results/rewarddetail",
        name: "rewarddetail",
        meta:{
          requireAuth:true
         },
        component: () => import('../views/knowledge/result/reward/rewarddetail.vue')//成果查询国内论文详情
      },
    ]
  },
  
  {
    path: "/org",
    name: "org",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/knowledge/orgMain.vue')//机构查询
  },
  {
    path: "/orgDetails",
    name: "orgDetails",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/knowledge/org/orgDetails.vue')//机构查询
  },
  {
    path: "/orgsetting",
    name: "orgsetting",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/network/orgsettingMain.vue')//网络挖掘中的机构挖掘
  },
  {
    path: "/talentperson",
    name: "talentperson",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/network/talentpersonMain.vue')//网络挖掘中的人才合作
  },
  {
    path: "/orgcoop",
    name: "orgcoop",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/network/orgcoop.vue')//网络挖掘中的机构合作
  },
  {
    path: "/personsetting",
    name: "personsetting",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/network/personsettingMain.vue')//网络挖掘中的人才挖掘
  },
  {
    path: "/trendanaly",
    name: "trendanaly",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/hottrend/trendanaly.vue')//热点趋势分析
  },
  {
    path: "/wordanaly",
    name: "wordanaly",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/hottrend/wordanaly.vue')//热点趋势下的热点词分析
  },
  {
    path: "/mygraph",
    name: "mygraph",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/iframe/mygraph.vue')//磁铁关系图
  },
  {
    path: "/brokenline",
    name: "brokenline",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/iframe/brokenline.vue')//磁铁关系图
  },
  {
    path: "/login",
    name: "login",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/login.vue')//登录界面
  },
  {
    path: "/systemmanage",
    name: "systemmanage",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/managedesign/systemmanage/index.vue')//系统管理
  },
  {
    path: "/securityaudit",
    name: "securityaudit",
     meta:{
        requireAuth:true
    },
    component: () => import('../views/managedesign/securityaudit/index.vue')//安全审计
  },
];

const router = new VueRouter({
 mode: "history",
  routes
});

export default router;
