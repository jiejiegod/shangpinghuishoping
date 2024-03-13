
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'


//二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path: '/shopcart',
        component: ShopCart,
        meta:{
            show:true
        }
    },
    {
        path: '/center',
        component: Center,
        meta:{
            show:true
        },
        children:[
            {
                path:'myorder',
                component:MyOrder,
            },
            {
                path:'grouporder',
                component:GroupOrder,
            },
            {
                path:'/center',
                redirect:'myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta:{
            show:true
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta:{
            show:true
        },
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: Trade,
        meta:{
            show:true
        },
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/detail/:skuid?',
        component: Detail,
        meta:{
            show:true
        }
    },
    {
        path: '/addcartsuccess',
        name:'addcartsuccess',
        component: AddCartSuccess,
        meta:{
            show:true
        }
    },
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta:{
            show:true
        }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        name:'search',
        meta:{
            show:true
        },
        props:true
    },
    {
        path: '/login',
        component: Login,
        meta:{
            show:false
        }
    },
    {
        path: '/register',
        component: Register,
        meta:{
            show:false
        }
    },
    // 重定向
    {
        path:'*',
        redirect:'/home'
    }
]