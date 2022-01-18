<template id="task">
    <div :id="id" :draggable="draggable" @dragstart="dragStart(_self, $event)" style="margin-bottom: 20px;">
        
                

                <div >
                  <v-card class="pa-2" outlined tile style="border-radius: 10px;">
                    <v-card-title style="padding: 0 0 0 0;">{{ taskData.title }}</v-card-title>
                    <v-divider></v-divider>
                    <p>{{ taskData.description }}</p>
                    
                    <v-icon v-if="taskData.beginDate" small>mdi-calendar</v-icon>
                    <p v-if="taskData.beginDate" class="font-weight-medium" style="font-size: small; width: fit-content; font-size: small; display: inline; margin-left: 10px;">{{taskData.beginDate}}</p>
                    <p style="font-size: small; width: fit-content; font-size: small; display: inline;" v-if="taskData.beginTime" class="font-weight-medium">  -  {{taskData.beginTime}}</p>
                    <br>
                    <v-icon v-if="taskData.endDate" small>mdi-calendar</v-icon>
                    <p v-if="taskData.endDate" class="font-weight-medium" style="font-size: small; width: fit-content; font-size: small; display: inline; margin-left: 10px;">{{taskData.endDate}}</p>
                    <p style="font-size: small; width: fit-content; font-size: small; display: inline;" v-if="taskData.endTime" class="font-weight-medium">  -  {{taskData.endTime}}</p>
                    
                    <div v-for="(a,i) in taskData.affectation" :key="i">
                      <v-icon v-if="taskData.affectation[i]" small>mdi-account</v-icon>
                      <p v-if="taskData.affectation[i]" style="width: fit-content; display: inline; margin-left: 10px;" >{{ taskData.affectation[i] }}</p><br>
                    </div>
                    <v-img :src="taskData.image" style="margin-top: 10px;" max-height="500px" max-width="100%" contain />
                    <div style="text-align: center; width: 100%; margin-top: 10px;">
                      <Dialog @clicked="noteModified" :taskData='taskData'/>
                      <v-btn id="delete" @click="deleteNote()" class="mx-2" fab dark small color="primary">
                        <v-icon dark>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-card>
                </div>

    </div>
</template>


<script>
  import Dialog from './Dialog.vue';
  export default {

    name: 'Task',
    data: () => ({
      dateOK: true,
    }),

    components: {
      Dialog
    },

    methods: {

      dragStart: (task, e) =>{
        const target = e.target;
        //var id = task.id;
        //e.dataTransfer.setData('card_id', target.id);
        e.dataTransfer.setData('title', JSON.stringify(task.taskData.title));
        e.dataTransfer.setData('description', JSON.stringify(task.taskData.description));
        e.dataTransfer.setData('image', task.taskData.image);
        e.dataTransfer.setData('affectation', JSON.stringify(task.taskData.affectation));
        e.dataTransfer.setData('beginDate', JSON.stringify(task.taskData.beginDate));
        e.dataTransfer.setData('beginTime', JSON.stringify(task.taskData.beginTime));
        e.dataTransfer.setData('endDate', JSON.stringify(task.taskData.endDate));
        e.dataTransfer.setData('endTime', JSON.stringify(task.taskData.endTime));
        e.dataTransfer.setData('id', JSON.stringify(task.id));

        setTimeout(() => {
            target.style.display = "none";
        }, 0);
        //task.$emit('clicked', {delete: true, modify: false, index: id.substring(7, id.length)})
      },

      /*dragEnd: (task, event) =>{
        console.log("Drag end !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        console.log(event.dataTransfer.getData("title"));
        //console.log(task);
        //console.log(event);
        //task.deleteNote();
      },*/

      noteModified: function(values){
        this.taskData = values
        var idTask = this.id;
        this.$emit('clicked', idTask.substring(7, idTask.length), values)
      },

      deleteNote: function(){
        var idTask = this.id;
        console.log(idTask.substring(7, idTask.length));

        this.$emit('clicked', idTask.substring(7, idTask.length), null);
      },

      // test: function(value){
      //   console.log(value);
      // }
      




    },

    props: ['id', 'draggable', 'taskData'],
  }
</script>