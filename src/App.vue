<style>
  .v-dialog{
    width: auto;
  }
</style>

<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h1 v-if="$router.history.current['path'] == '/home'" >
          Gestionnaire de tâches
        </h1>
        <h1 v-if="$router.history.current['path'] == '/account'" >
          Mon compte
        </h1>
        <h1 v-if="$router.history.current['path'] == '/settings'" >
          Paramètres
        </h1>
        <h1 v-if="$router.history.current['path'] == '/'" >
          Connexion
        </h1>
        <h1 v-if="$router.history.current['path'] == '/error405'" >
          Ooooops
        </h1>
         
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

        

    <v-main>
      <div style="display: flex;">

        <div style="float: left;">
          <v-navigation-drawer v-if="$router.history.current['path'] != '/' && $router.history.current['path'] != '/error405'"
            permanent
            absolute
            expand-on-hover
          >
            <v-list nav dense>

              <v-list-item to="/home">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Accueil</v-list-item-title>
              </v-list-item>

              <v-list-item to="/account">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Gestion de compte</v-list-item-title>
              </v-list-item>
            
              <v-list-item to="/settings">
                <v-list-item-icon>
                  <v-icon>mdi-cog</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Paramètres</v-list-item-title>
              </v-list-item>

            </v-list>
          </v-navigation-drawer>
        </div>

        <div style="float: right; display: flex; margin-left: 50px; width: 100%">
          <router-view></router-view>
        </div>


      </div>

      <v-dialog v-model="showPopup" width="500">
        <v-card>
          <v-card-title>
          {{popupTitle}}
          </v-card-title>
          <v-card-text>
          {{popupText}}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="closePopup">{{popupButtonAbortText}}</v-btn>
          <v-btn color="red" text @click="confirm">{{popupButtonConfirmText}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      

     
      
      
      <!-- <v-btn color="blue darken-1" text @click="test">Test</v-btn> -->

    </v-main>
  </v-app>
</template>

<script>
import popup from './mixins/popup'

export default {
  name: 'App',
  mixins: [popup],
  data: () => ({
  }),
};
</script>
