import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accounts: JSON.parse(localStorage.getItem('accounts')) || [],
    connected: false,
    tasks: {
      tc1: [], 
      tc2: [], 
      tc3: [], 
    }
  },
  mutations: {
    createAccount(state, {username, password}){
      state.accounts.push({id: state.accounts.length, username: username, password: password});
    },
    deleteAccount(state, username){
      state.accounts.splice(state.accounts.findIndex(a => a.username == username), 1);
    },
    modifyAccount(state, account){
      state[state.indexOf(state.accounts.filter(a => a.id == account.id))] = account;
    },
    setConnected(state, {username, password}){
      if(username == null){
        state.connected = false;
        state.tasks = {tc1: [], tc2: [], tc3: []}
      }
      else{
        state.connected = {username: username, password: password};
        state.tasks.tc1 = JSON.parse(localStorage.getItem('tc1'+username)) || []
        state.tasks.tc2 = JSON.parse(localStorage.getItem('tc2'+username)) || []
        state.tasks.tc3 = JSON.parse(localStorage.getItem('tc3'+username)) || []
      }
    },

    addTask(state, { task, column}){
      state.tasks[column].push(task);
    },

    deleteTask(state, { index, column}){
      state.tasks[column].splice(index, 1);
    },

    modifyTask(state, {index, column, task}){
      state.tasks[column][index] = task;
    }    
  },
  actions: {
    aCreateAccount({commit}, {username, password}){
      if(this.state.accounts.filter(a => a.username == username).length == 0){
        console.log("création du compte");
        commit('createAccount', {username, password});
        commit('setConnected', {username, password});
        this.dispatch('aSaveAccounts');
        return true;
      }
      else{
        console.log("non création du compte");
        return false;
      }
    },
    aDeleteAccount({commit}){
      commit('deleteAccount', this.getters.getUsername);
      this.dispatch('aSaveAccounts');
      this.dispatch('aDeleteAllUserTasks')
    },
    aDeleteAllUserTasks(){
      let user = this.getters.getUsername
      localStorage.removeItem("tc1"+user)
      localStorage.removeItem("tc2"+user)
      localStorage.removeItem("tc3"+user)
    },
    aModifyAccount({commit}, account){
      commit('modifyAccount', account);
      this.dispatch('aSaveAccounts');
    },
    aSaveAccounts(){
      localStorage.setItem('accounts', JSON.stringify(this.state.accounts));
    },
    aDisconnect({commit}){
      commit('setConnected', {username: null, password: null});
    },
    aConnect({commit}, {username, password}){
      if(this.state.accounts.filter(a => a.username == username && a.password == password).length == 1){
        commit('setConnected', {username, password});
        return true;
      }
      else{
        return false;
      }
    },

    aAddTask({commit}, {task, column}){
      commit('addTask', { task, column});
      this.dispatch('aSaveLocalStorage', column);
    },

    aDeleteTask({commit}, {index, column}){
      commit('deleteTask', { index, column});
      this.dispatch('aSaveLocalStorage', column);
    },

    aModifyTask({commit}, {index, column, task}){
      commit('modifyTask', {index, column, task});
      this.dispatch('aSaveLocalStorage', column);
    },

    aSaveLocalStorage({commit}, column){
      console.log(commit)
      localStorage.setItem(column+this.getters.getUsername, JSON.stringify(this.getters.getTasks[column]));
    }


  },
  getters: {
    getConnected: state => state.connected,
    getUsername: state => state.connected.username,
    getUserId: state => state.connected.id,
    getTasks: state => state.tasks
  },
  modules: {
  },
  methods: {
    
  }
})
