<template>
  <div
    :id="id"
    @dragover.prevent
    @drop.prevent="drop"
    @drop="drop($event, _self)"
  >
    <div style="text-align: center">
      <Dialog @clicked="noteCreated" />
    </div>
    <br />
    <v-container ref="taskContainer" style="min-height: 200px">
      <Task
        style="width: 100%"
        @clicked="modifyOrDelete"
        v-for="(t, index) in getTasks()[id]"
        :key="index"
        :taskData="t"
        :draggable="true"
        :id="id + 'task' + index"
      />
    </v-container>
    <!-- <v-btn @click="test">test</v-btn> -->
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import Dialog from "./Dialog.vue";
import Task from "./Task.vue";
//import mapGetters from 'vuex';
export default {
  name: "taskContainer",
  data: () => ({
    dateOK: true,
    tasks: [],
  }),

  components: {
    Dialog,
    Task,
  },

  methods: {

    ...mapActions(['aAddTask', "aDeleteTask", "aModifyTask"]),
    ...mapGetters(["getTasks"]),

    //...mapGetters(["getConnected"]),

    drop: (e, container) => {
      console.log("drop !!!!!!!!!!!!!!!!!!!!");
      console.log(e);
      if(container){
        container.noteCreated({
          title: JSON.parse(e.dataTransfer.getData("title")),
          description: JSON.parse(e.dataTransfer.getData("description")),
          image: e.dataTransfer.getData("image"),
          affectation: JSON.parse(e.dataTransfer.getData("affectation")),
          beginDate: JSON.parse(e.dataTransfer.getData("beginDate")),
          beginTime: JSON.parse(e.dataTransfer.getData("beginTime")),
          endDate: JSON.parse(e.dataTransfer.getData("endDate")),
          endTime: JSON.parse(e.dataTransfer.getData("endTime")),
        });
        var idTask = JSON.parse(e.dataTransfer.getData("id"));
        console.log(JSON.parse(e.dataTransfer.getData("id")));
        container.modifyOrDelete(idTask.substring(7, idTask.length), null, idTask.substring(0, 3));
        //container.aDeleteTask()
      }
      //console.log(container);
      //console.log(e);
      
    },

    noteCreated: function (value) {
      console.log(value)
      this.aAddTask({task: value, column: this.id});
    },

    modifyOrDelete: function (index, task, column) {
      //this.tasks.splice(index, 1);
      if(!column){
        column = this.id;
      }

      console.log(index);
      console.log(task);
      if(task){
        this.aModifyTask({index: index, column: column, task: task})
      }
      else{
        this.aDeleteTask({index: index, column: column});
      }
      

    },
  },

  beforeMount(){
    this.tasks = this.getTasks(this.id);
  },

  props: ["id"],
};
</script>