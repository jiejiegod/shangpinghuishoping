import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
import VueRouter from 'vue-router';
import routes from './routes';

import store from '@/store'

// 重写push|replace方法
let originPush = Router.prototype.push;

VueRouter.prototype.push = function (location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location).catch(()=>{});
    }
}
VueRouter.prototype.replace = function (location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location).catch(()=>{});
    }

}

let router= new Router({
    routes,
    scrollBehavior(to, from , savadPosition){
        return {y:0}
    }
})
router.beforeEach(async(to,from,next)=>{
    let name=store.state.user.userInfo.name
    // console.log(to);
    // console.log(from); 
    // console.log(next);
    // next();
    let token=store.state.user.token;
    if(token){
        if(to.path==='/login'||to.path==='/register'){
            next('/home');
        }else{
            if(name){
                next();
            }else{
                try {
                    await store.dispatch('getUserInfo')
                    next();
                } catch (error) {
                    await store.dispatch('userLogout')
                    next('/login');
                }
            }
        }
    }else{
        let toPath=to.path;
        if(toPath.indexOf('/center')!==-1 || toPath.indexOf('/trade')!==-1 || toPath.indexOf('/center')!==-1){ 
            next('/login?redirect='+toPath);
        }else{
        next()
    }
    }

})

export default router