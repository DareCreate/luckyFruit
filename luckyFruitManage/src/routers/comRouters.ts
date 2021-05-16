import Layout from '@/components/Layout/Layout.vue';
export default [
  {
    path: '/',
    redirect: '/login',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '../pages/home/home.vue'),
        meta: {
          title: '首页',
        },
      },
      // 系统管理
      {
        path: '/admin/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '../pages/admin/user.vue'),
        meta: {
          title: '用户管理',
          needAuth: true,
        },
      },
      {
        path: '/admin/role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "role" */ '../pages/admin/role.vue'),
        meta: {
          title: '角色管理',
          needAuth: true,
        },
      },
      {
        path: '/admin/menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "menu" */ '../pages/admin/menu.vue'),
        meta: {
          title: '菜单管理',
          needAuth: true,
        },
      },
      {
        path: '/user/userProfile',
        name: 'userProfile',
        component: () => import(/* webpackChunkName: "userProfile" */ '../pages/user/userProfile.vue'),
        meta: {
          title: '个人信息',
        },
      },
      {
        path: '/user/userChangePwd',
        name: 'userChangePwd',
        component: () => import(/* webpackChunkName: "userChangePwd" */ '../pages/user/userChangePwd.vue'),
        meta: {
          title: '修改密码',
        },
      },
      {
        path: '/tenant/tenantList',
        name: 'TenantList',
        component: () => import(/* webpackChunkName: "TenantList" */ '../pages/admin/tenant/TenantList.vue'),
      },
      // 内容管理
      {
        path: '/cms/slideshow/slideList',
        component: () => import(/* webpackChunkName: "slideList" */ '../pages/cms/slideShow/slideList.vue'),
        meta: {
          title: '幻灯片轮播',
        },
      },
      {
        path: '/cms/slideshow/createSlideShow',
        name: 'CreateSlideShow',
        component:
        () => import(/* webpackChunkName: "CreateSlideShow" */ '../pages/cms/slideShow/createSlideShow.vue'),
        meta: {
          title: '创建幻灯片',
        },
      },
      {
        path: '/cms/slideshow/editSlideShow/:slideshowId',
        name: 'EditSlideShow',
        component: () => import(/* webpackChunkName: "EditSlideShow" */ '../pages/cms/slideShow/editSlideShow.vue'),
        meta: {
          title: '编辑幻灯片',
        },
      },
      {
        path: '/cms/videoGroup/groupList',
        name: 'VideoGroupList',
        component: () => import(/* webpackChunkName: "VideoGroupList" */ '../pages/cms/videoGroup/VideoGroupList.vue'),
        meta: {
          title: '视频组列表',
        },
      },
      {
        path: '/cms/videoGroup/createVideoGroup',
        name: 'CreateVideoGroup',
        component: () =>
        import(/* webpackChunkName: "CreateVideoGroup" */ '../pages/cms/videoGroup/CreateVideoGroup.vue'),
        meta: {
          title: '创建视频组',
        },
      },
      {
        path: '/cms/videoGroup/editVideoGroup/:videoGroupId',
        name: 'EditVideoGroup',
        component: () =>
        import(/* webpackChunkName: "EditVideoGroup" */ '../pages/cms/videoGroup/EditVideoGroup.vue'),
        meta: {
          title: '修改视频组',
        },
      },
      {
        path: '/cms/videoGroup/:videoGroupId/createVideo',
        name: 'CreateVideo',
        component: () =>
        import(/* webpackChunkName: "CreateVideo" */ '../pages/cms/videoGroup/CreateVideo.vue'),
        meta: {
          title: '创建视频',
        },
      },
      {
        path: '/cms/videoGroup/:videoGroupId/editVideo/:videoId',
        name: 'EditVideo',
        component: () =>
        import(/* webpackChunkName: "EditVideo" */ '../pages/cms/videoGroup/EditVideo.vue'),
        meta: {
          title: '修改视频',
        },
      },
      {
        path: '/cms/videoGroup/:videoGroupId/videoList',
        name: 'VideoList',
        component: () =>
        import(/* webpackChunkName: "VideoList" */ '../pages/cms/videoGroup/VideoList.vue'),
        meta: {
          title: '视频列表',
        },
      },
      {
        path: '/cms/category/categoryList',
        name: 'CategoryList',
        component: () =>
        import(/* webpackChunkName: "CategoryList" */ '../pages/cms/category/CategoryList.vue'),
        meta: {
          title: '类目列表',
        },
      },
      {
        path: '/cms/category/createCategory',
        name: 'CreateCategory',
        component: () =>
        import(/* webpackChunkName: "CreateCategory" */ '../pages/cms/category/CreateCategory.vue'),
        meta: {
          title: '添加类目',
        },
      },
      {
        path: '/cms/category/editCategory/:categoryId',
        name: 'EditCategory',
        component: () =>
        import(/* webpackChunkName: "EditCategory" */ '../pages/cms/category/EditCategory.vue'),
        meta: {
          title: '修改类目',
        },
      },
      {
        path: '/cms/category/:categoryId/articleList',
        name: 'ArticleList',
        component: () =>
        import(/* webpackChunkName: "ArticleList" */ '../pages/cms/category/ArticleList.vue'),
        meta: {
          title: '类目文章',
        },
      },
      {
        path: '/cms/category/:categoryId/CreateArticle',
        name: 'CreateArticle',
        component: () =>
        import(/* webpackChunkName: "CreateArticle" */ '../pages/cms/category/CreateArticle.vue'),
        meta: {
          title: '创建文章',
        },
      },
      {
        path: '/cms/category/:categoryId/editArticle/:articleId',
        name: 'EditArticle',
        component: () =>
        import(/* webpackChunkName: "EditArticle" */ '../pages/cms/category/EditArticle.vue'),
        meta: {
          title: '修改文章',
        },
      },
      // 竞猜管理
      {
        path: '/cms/guess/guessList',
        name: 'GuessList',
        component: () =>
        import(/* webpackChunkName: "GuessList" */ '../pages/cms/guess/GuessList.vue'),
        meta: {
          title: '竞猜管理',
        },
      },
      {
        path: '/cms/guess/createGuess',
        name: 'CreateGuess',
        component: () =>
        import(/* webpackChunkName: "CreateGuess" */ '../pages/cms/guess/CreateGuess.vue'),
        meta: {
          title: '创建竞猜',
        },
      },
      {
        path: '/cms/guess/:guessId/editGuess',
        name: 'EditGuess',
        component: () =>
        import(/* webpackChunkName: "EditGuess" */ '../pages/cms/guess/EditGuess.vue'),
        meta: {
          title: '修改竞猜',
        },
      },
      // 支付管理
      {
        path: '/pay/:tenantId/payClientList',
        name: 'PayClientList',
        component: () =>
        import(/* webpackChunkName: "PayClientList" */ '../pages/pay/PayClientList.vue'),
        meta: {
          title: '支付客户端列表',
        },
      },
      {
        path: '/pay/:tenantId/createPayClient',
        name: 'CreatePayClient',
        component: () =>
        import(/* webpackChunkName: "CreatePayClient" */ '../pages/pay/CreatePayClient.vue'),
        meta: {
          title: '创建客户端',
        },
      },
      {
        path: '/pay/editPayClient/:payClientId',
        name: 'EditPayClient',
        component: () =>
        import(/* webpackChunkName: "EditPayClient" */ '../pages/pay/EditPayClient.vue'),
        meta: {
          title: '修改客户端',
        },
      },
      {
        path: '/pay/:payClientId/PayClientPhoneList',
        name: 'PayClientPhoneList',
        component: () =>
        import(/* webpackChunkName: "PayClientPhoneList" */ '../pages/pay/PayClientPhoneList.vue'),
        meta: {
          title: '客户端手机列表',
        },
      },
      {
        path: '/pay/:payClientId/createPayClientPhone',
        name: 'CreatePayClientPhone',
        component: () =>
        import(/* webpackChunkName: "CreatePayClientPhone" */ '../pages/pay/CreatePayClientPhone.vue'),
        meta: {
          title: '创建手机',
        },
      },
      {
        path: '/pay/editPayClientPhone/:payClientPhoneId',
        name: 'EditPayClientPhone',
        component: () =>
        import(/* webpackChunkName: "EditPayClientPhone" */ '../pages/pay/EditPayClientPhone.vue'),
        meta: {
          title: '修改手机信息',
        },
      },
      {
        path: '/pay/:payClientPhoneId/payClientPhoneAmountList',
        name: 'PayClientPhoneAmountList',
        component: () =>
        import(/* webpackChunkName: "PayClientPhoneAmountList" */ '../pages/pay/PayClientPhoneAmountList.vue'),
        meta: {
          title: '手机金额列表',
        },
      },
      {
        path: '/pay/:payClientPhoneAmountId/payClientPhoneQrcodeList',
        name: 'PayClientPhoneQrcodeList',
        component: () =>
        import(/* webpackChunkName: "PayClientPhoneQrcodeList" */ '../pages/pay/PayClientPhoneQrcodeList.vue'),
        meta: {
          title: '二维码列表',
        },
      },
      {
        path: '/pay/:payClientPhoneId/payClientPhoneQrCodeTaskList',
        name: 'PayClientPhoneQrCodeTaskList',
        component: () =>
        import(/* webpackChunkName: "PayClientPhoneQrCodeTaskList" */ '../pages/pay/PayClientPhoneQrCodeTaskList.vue'),
        meta: {
          title: '二维码任务列表',
        },
      },
      {
        path: '/pay/:payClientPhoneId/CreatePayClientPhoneQrCodeTask',
        name: 'CreatePayClientPhoneQrCodeTask',
        component: () =>
        import(/* webpackChunkName: "CreatePayClientPhoneQrCodeTask" */
        '../pages/pay/CreatePayClientPhoneQrCodeTask.vue'),
        meta: {
          title: '创建二维码任务',
        },
      },
    ],
  },
  {
    path: '/:tenantId/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../pages/common/Login.vue'),
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '../pages/common/Login.vue'),
  },
  {
      path: '/404',
      component: () => import(/* webpackChunkName: "NotFound" */ '../pages/common/NotFound.vue'),
  },
  {
      path: '/403',
      component: () => import(/* webpackChunkName: "NoPower" */ '../pages/common/NoPower.vue'),
  },
  {
      path: '*',
      redirect: '/404',
  },
];
