import {
  createRouter,
  createWebHashHistory,
  RouterOptions,
  Router,
  RouteRecordRaw,
} from "vue-router";
//由于router的API默认使用了类型进行初始化，内部包含类型定义，所以本文内部代码中的所有数据类型是可以省略的
//RouterRecordRaw是路由组件对象
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: import("../views/index.vue"),
    name: "首页",
  },
  {
    path: '/p5',
    component: ()=>import('../views/p5/index.vue'),
    children: [
      {
        path: "demo",
        component: ()=>import("../views/p5/demo.vue"),
        name: "p5.js",
      },
      {
        path: 'raycasting',
        name: '2d光线渲染',
        component: ()=>import('../views/p5/Raycasting.vue'),
      },
      
    ],
  },
  {
    path: "/tensorflow",
    name: "Tensorflow",
    component: ()=>import('../views/tensorflow/index.vue'),
    // redirect: {
    //   path: '/tensorflow/one'
    // },
    children: [
      {
        path: "one",
        name: "第一个",
        meta: {
          title: "tensorflow",
        },
        component: ()=>import("../views/tensorflow/one.vue"),
      },
      {
        path: "two",
        name: "第二个",
        component: ()=>import("../views/tensorflow/two.vue")
      },
      {
        path: "backgroundTest",
        name:"背景分离",
        component: ()=>import("../views/tensorflow/backgroundTest.vue")
      }
    ],
  },
];

// RouterOptions是路由选项类型
const options: RouterOptions = {
  history: createWebHashHistory(),
  routes,
};

// Router是路由对象类型
const router: Router = createRouter(options);

export default router;
