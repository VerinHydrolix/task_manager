import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accounts: JSON.parse(localStorage.getItem('accounts')) || [],
    connected: false,
    tasks: {
      tc1: JSON.parse(localStorage.getItem('tc1')) || [], 
      tc2: JSON.parse(localStorage.getItem('tc2')) || [], 
      tc3: JSON.parse(localStorage.getItem('tc3')) || [], 
    }
  },
  mutations: {
    createAccount(state, {nom, prenom, password}){
      state.accounts.push({id: state.accounts.length, nom: nom, prenom: prenom, password: password});
    },
    deleteAccount(state, id){
      state.accounts.splice(state.indexOf(state.accounts.filter(a => a.id == id)[0]), 1);
    },
    modifyAccount(state, account){
      state[state.indexOf(state.accounts.filter(a => a.id == account.id))] = account;
    },
    setConnected(state, {nom, prenom, password}){
      if(nom == null){
        state.connected = false;
      }
      else{
        state.connected = {nom: nom, prenom: prenom, password: password};
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
    aCreateAccount({commit}, {nom, prenom, password}){
      if(this.state.accounts.filter(a => a.nom == nom && a.prenom == prenom).length == 0){
        console.log("création du compte");
        commit('createAccount', {nom, prenom, password});
        commit('setConnected', {nom, prenom, password});
        this.dispatch('aSaveAccounts');
        return true;
      }
      else{
        console.log("non création du compte");
        return false;
      }
    },
    aDeleteAccount({commit}, id){
      commit('deleteAccount', id);
      this.dispatch('aSaveAccounts');
    },
    aModifyAccount({commit}, account){
      commit('modifyAccount', account);
      this.dispatch('aSaveAccounts');
    },
    aSaveAccounts(){
      localStorage.setItem('accounts', JSON.stringify(this.state.accounts));
    },
    aDisconnect({commit}){
      commit('setConnected', {nom: null, prenom: null, password: null});
    },
    aConnect({commit}, {nom, prenom, password}){
      if(this.state.accounts.filter(a => a.nom == nom && a.prenom == prenom && a.password == password).length == 1){
        commit('setConnected', {nom, prenom, password});
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
      console.log(column);
      console.log(this.getters.getTasks["tc1"][0]);
      localStorage.setItem(column, JSON.stringify(this.getters.getTasks[column]));
    }


  },
  getters: {
    getConnected: state => state.connected,

    getTasks: state => {
      return state.tasks
    }
  },
  modules: {
  },
  methods: {
    
  }
})
