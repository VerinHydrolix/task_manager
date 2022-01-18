<template>
  <v-container>
    <v-card style="margin: 20px; padding: 20px">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="prenom"
          label="Prénom"
          outlined
          :rules="[(v) => !!v || 'Ce champ est obligatoire']"
        />
        <v-text-field
          v-model="nom"
          label="Nom"
          outlined
          :rules="[(v) => !!v || 'Ce champ est obligatoire']"
        />
        <v-text-field
          type="password"
          v-model="password"
          label="Mot de passe"
          outlined
          :rules="[(v) => !!v || 'Ce champ est obligatoire']"
        />

        <v-btn color="primary" @click="createAccount">Créer un compte</v-btn>
        <v-btn color="primary" style="margin-left: 20px" @click="connect">Se connecter</v-btn>
      </v-form>
      <br>
      <!-- <v-btn @click="test()">Test</v-btn> -->
      <v-alert v-if="existingAccountError" type="error">
      Le compte que vous essayez de créer existe déjà (paire nom + prénom déjà utilisée)
      </v-alert>
      <v-alert v-if="connectionFailedError" type="error">
      La connection a echouée (les informations sont incorrectes)
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {

  beforeMount(){
    this.aDisconnect();
  },
  methods: {
    ...mapActions(["aCreateAccount", "aDisconnect", "aConnect"]),

    connect() {
      if (this.$refs.form.validate()) {
        this.aConnect({nom: this.nom, prenom: this.prenom, password: this.password}).then((validation) => {
          console.log(validation);
          if(validation){
            this.$router.push('/home');
          }
          else{
            this.existingAccountError = false;
            this.connectionFailedError = true;
          }
        });
      }
    },

    createAccount() {
      if (this.$refs.form.validate()) {
          this.aCreateAccount({nom: this.nom, prenom: this.prenom, password: this.password}).then((validation) => {
            console.log(validation);
            
            if(validation){
              this.$router.push('/home');
            }
            else{
              this.existingAccountError = true;
              this.connectionFailedError = false;
            }
          });
      }
    },
    test(){
        console.log(localStorage.getItem('accounts'));
    }
  },
  data() {
    return {
      existingAccountError: false,
      connectionFailedError: false,
      valid: true,
      prenom: undefined,
      nom: undefined,
      password: undefined,
    };
  },
};
</script>