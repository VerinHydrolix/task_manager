<template>
  <v-container>
    <v-card style="color: rgba(0, 0, 0, 0.54); margin: 20px; padding: 20px">
      <h2>Nom: {{ connectedNom }}</h2>
      <br />
      <v-divider />
      <br />
      <h2>Prénom: {{ connectedPrenom }}</h2>
      <br />
      <v-btn color="red accent-1" style="color: white;" @click="disconnect()">Se déconnecter</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapGetters(["getConnected"]),
    ...mapActions(['aDisconnect']),

    disconnect(){
        this.aDisconnect();
        this.$router.push('/')
    }
  },




  beforeMount() {
    var a = this.getConnected();
    if (!a) {
      this.$router.push("/error405");
    }
  },

  computed: {
    connectedNom() {
      return this.getConnected().nom;
    },
    connectedPrenom() {
      return this.getConnected().prenom;
    },
  },
};
</script>

<style>
</style>