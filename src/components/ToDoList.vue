<template>
    <v-container style="margin: 0 0 0 0; padding: 0 0 0 0; max-width: 100%">
        <v-row no-gutters>
          <v-col class="col-lg-4">
            <v-card color="primaryAttenuate2" style="text-align: center;  color: white" class="pa-2" outlined tile>
              <h2>A faire</h2>
            </v-card>
              <v-container class="grey lighten-5" style="background-color: lavender;">
                <taskContainer id="tc1">

                </taskContainer>
              </v-container>
              
          </v-col>
          <v-col class="col-lg-4">
            <v-card color="primaryAttenuate1" style="text-align: center;  color: white" class="pa-2" outlined tile>
              <h2>En cours</h2>
            </v-card>
              <v-container class="grey lighten-5" style="background-color: lavender;">
                <taskContainer id="tc2">

                </taskContainer>
              </v-container>
              
          </v-col>
          <v-col class="col-lg-4">
            <v-card color="primary" style="text-align: center; color: white" class="pa-2" outlined tile>
              <h2>Terminé</h2>
            </v-card>
              <v-container class="grey lighten-5" style="background-color: lavender;">
                <taskContainer id="tc3">

                </taskContainer>
              </v-container>
              
          </v-col>
        </v-row>
      </v-container>
</template>


<script>
import { mapGetters } from 'vuex';
import taskContainer from './taskContainer';
export default {
  methods: {
    ...mapGetters(["getConnected"]),
  },
    name: 'ToDoList',
    components: {
        taskContainer,
    },
    beforeMount(){
        var a = this.getConnected();
        if(!a){
            this.$router.push('/error405');
        }
    }
    
    
}
</script>
