
<template>
    <v-dialog class="light"
      v-model="dialog"
      persistent
    >
      <template v-slot:activator="{ attrs }">
        <v-btn v-if="$options.propsData.taskData == null" color="primary" fab dark v-bind="attrs" @click.stop="openPopup()">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
        <v-btn v-else class="mx-2" fab dark small color="primary" @click.stop="openPopup()">
                          <v-icon dark>
                            mdi-pencil
                          </v-icon>
                        </v-btn>
      </template>
      <v-card style="border-radius: 0px">
        <v-card-text>
            <v-container>
                <br>
                <v-form ref="form" lazy-validation>
                    <v-text-field  v-model="title" label="Nom de la tâche" outlined clearable></v-text-field>
                    <v-textarea clearable v-model="description" label="Description" auto-grow outlined rows="1" row-height="15"></v-textarea>
                    <div style="border: solid; border-radius: 5px; padding: 15px 15px 15px 15px; text-align: center; border-color: grey; border-width: 1px;">
                      <div v-for="(a, i) in affectation" :key="i">
                        <v-text-field v-model="affectation[i]" label="Affectation">
                          <v-icon slot="append" @click="deleteAffectation(i)">mdi-delete</v-icon>
                          <v-icon slot="prepend">mdi-account</v-icon>
                        </v-text-field>
                      </div>
                      <v-btn v-if="affectation.length < 5" color="primary" fab dark @click.stop="addAnotherAccount()">
                        <v-icon dark> mdi-account-plus </v-icon>
                      </v-btn>
                    </div>
                    <br>
                    <br>
                    <div style="border: solid; border-radius: 5px; padding: 15px 15px 15px 15px; text-align: center; border-color: grey; border-width: 1px;">
                      <v-file-input id="fileInput" v-model="image" style="display: none" accept="image/*"></v-file-input>
                      <v-btn @click="addImage" color="primary" rounded ><v-icon left>mdi-file-image</v-icon>Ajouter une image</v-btn>
                      <br>
                      <br>
                      <v-card elevation="0" height="20vh"   >
                        <v-img v-if="imageString" :src="imageString" style="top: 50%; transform: translateY(-50%); float: left" max-height="100%" max-width="100%" contain/>
                      </v-card>
                    </div>

                    <!-- <v-file-input prepend-icon="mdi-file-image" v-model="image" accept="image/*" label="Veuillez cliquer pour ajouter une image" :disabled="taskData != null"></v-file-input> -->

                    <v-row>
                        <v-col style="text-align: center">
                            <br>
                            <h3>Début</h3>
                            <div style="border: solid; border-radius: 5px; padding: 15px 15px 15px 15px; border-color: grey; border-width: 1px;">
                                <br>
                                <v-date-picker v-model="beginDate" elevation="15" ></v-date-picker>
                                <br>
                                <br>
                                <v-time-picker v-model="beginTime" format="24hr" ></v-time-picker>
                            </div>
                        </v-col>
                        <v-col style="text-align: center"> 
                            <br>
                            <h3>Fin</h3>
                            <div style="border: solid; border-radius: 5px; padding: 15px 15px 15px 15px; border-color: grey; border-width: 1px;">
                                <br>
                                <v-date-picker v-model="endDate" elevation="15"></v-date-picker>
                                <br>
                                <br>
                                <v-time-picker v-model="endTime" format="24hr" ></v-time-picker>
                            </div>
                        </v-col>
                    </v-row>
                </v-form>
                <v-alert v-if="!dateOK" dense text type="error">Un problème est survenu au niveau de la cohésion des dates (début/fin)</v-alert>
                <v-alert v-if="!timeOK" dense text type="error">Un problème est survenu au niveau de la cohésion des heures (début/fin)</v-alert>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="initFieldsAndClose()"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="save()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!-- </v-row> -->
</template>

<script>
  import Vue from 'vue';
  import Vuetify from 'vuetify'
  Vue.use(Vuetify);
  export default {

    name: 'Dialog',
    data: () => ({
      dateOK: true,
      timeOK: true,
      dialog: false,

      title: "",
      description: "",
      image: undefined,
      imageString: undefined,
      affectation: [""],
      beginDate: null,
      endDate: null,
      beginTime: null,
      endTime: null
    }),

    watch: {
      image(file){
        console.log("changed")
        if(file!=undefined){
          var reader = new FileReader();
          reader.readAsDataURL(file)
          reader.onload = () => {
              this.imageString = reader.result
          }
        }
      }
    },

    methods: {

      openPopup: function(){
        this.dialog = true;
        if(this.taskData != null){
          this.title = this.taskData.title;
          this.description = this.taskData.description;
          this.imageString= this.taskData.image;
          this.affectation= this.taskData.affectation;
          this.beginDate= this.taskData.beginDate;
          this.endDate= this.taskData.endDate;
          this.beginTime= this.taskData.beginTime;
          this.endTime= this.taskData.endTime;
        }

      },
      
      save: function () {
          this._data.dateOK = true;
          this._data.timeOK = true;

          //validation
          if(this._data.beginDate && this._data.endDate && (new Date(this._data.beginDate) > (new Date(this._data.endDate) ))) {
              this._data.dateOK = false;
          }

          else if(this._data.beginDate && this._data.beginDate == this._data.endDate &&  this._data.beginTime &&  this._data.endTime && this._data.beginTime >  this._data.endTime){
              this._data.timeOK = false;
          }

          //données validées
          else{
            console.log(this.imageString)
              this.$emit('clicked', { title: this._data.title, 
                                  description: this._data.description, 
                                  image: this.imageString, 
                                  affectation: this._data.affectation, 
                                  beginDate: this._data.beginDate,
                                  beginTime: this._data.beginTime,
                                  endDate: this._data.endDate,
                                  endTime: this._data.endTime,
                                  });
              
              this.initFieldsAndClose();
          }
      },

      initFieldsAndClose: function(){
        //reinistialisation des champs
        this._data.title = null; 
        this._data.description = null;
        this._data.affectation = [""];
        this._data.beginDate = null;
        this._data.beginTime = null;
        this._data.endDate = null;
        this._data.endTime = null;
        this.image = undefined;
        this.imageString = undefined;

          //fermeture du popup
          this._data.dialog = false;
      },

      addAnotherAccount: function(){
        this._data.affectation.push("");
      },

      deleteAffectation: function(i){
        this._data.affectation.splice(i, 1);
      },

      addImage(){
        document.getElementById('fileInput').click()
      },

    },

    props: ['taskData']
  }
</script>
