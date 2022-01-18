import ToDoList from '../components/ToDoList.vue'
import Settings from '../components/Settings.vue'
import Connection from '../components/Connection.vue'
import Error405 from '../components/Error405.vue'
import Account from '../components/Account.vue'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router);


export default new Router({
    routes: [
        {path: '/', component: Connection},
        {path: '/settings', component: Settings},
        {path: '/home', component: ToDoList},
        {path: '/error405', component: Error405},
        {path: '/account', component: Account},
        {path: '*', component: ToDoList}
      ],

      mode: 'history'
      

});

