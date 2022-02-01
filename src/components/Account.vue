<template>
  <v-container>
    <v-card style="color: rgba(0, 0, 0, 0.54); margin: 20px; padding: 20px">
      <h2>Nom d'utilisateur: {{ connectedUsername }}</h2>
      <br>
      <v-divider />
      <br>
      <v-btn dark color="red" rounded @click="openDisconnectPopup">Se déconnecter</v-btn>
      <br>
      <br>
      <v-btn dark color="red" rounded @click="openDeleteAccountPopup">Supprimer le compte</v-btn>
      <!-- <v-dialog v-model="dialogDisconnect" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          color="red" rounded
          >
          Se déconnecter
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
          Déconnexion
          </v-card-title>
          <v-card-text>
          Vous allez être déconnecté, voulez-vous continuer?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialogDisconnect = false">Non</v-btn>
          <v-btn color="red" text @click="disconnect()">Oui</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <br>
      <br>
      <v-dialog v-model="dialogDelete" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          color="red" rounded
          >
          Supprimer le compte
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
          Suppression
          </v-card-title>
          <v-card-text>
          Voulez-vous vraiment supprimer votre compte, toutes les données de celui-ci seront perdues?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialogDelete = false">Non</v-btn>
          <v-btn color="red" text @click="deleteAccount()">Oui</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Vue from 'vue';
export default {
  methods: {
    ...mapGetters(["getConnected"]),
    ...mapActions(['aDisconnect', 'aDeleteAccount']),

    disconnect(){
        this.aDisconnect();
        this.$router.push('/')
    },
    deleteAccount(){
      this.aDeleteAccount();
      this.aDisconnect();
      this.$router.push('/')
    },
    openDisconnectPopup(){
      Vue.prototype.$taskManager.openPopup(
        "Déconnexion", 
        "Voulez allez être déconnecté, voulez-vous continuer ?", 
        "Non", 
        "Oui", 
        this.disconnect)
    },
    openDeleteAccountPopup(){
      Vue.prototype.$taskManager.openPopup(
        "Suppression", 
        "En supprimant votre compte, vous perdrez les données relatives à celui-ci... Voulez-vous continuer?", 
        "Non", 
        "Oui", 
        this.deleteAccount)
    }
  },
  beforeMount() {
    var a = this.getConnected();
    if (!a) {
      this.$router.push("/error405");
    }
  },
  computed: {
    connectedUsername() {
      return this.getConnected().username;
    }
  },
};
</script>

<style>
</style>