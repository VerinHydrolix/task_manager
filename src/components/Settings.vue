<template>
  <v-container style="max-width: 100%">
    <!-- <v-card style="text-align: center; background-color: rgb(25 118 210 / 76%); color: white" class="pa-2" outlined tile>
                <h2>Paramètres</h2>
            </v-card> -->

    <v-card
      elevation="10"
      style="color: rgba(0, 0, 0, 0.54); margin: 20px; padding: 20px"
    >
      <h2 style="margin-left: 15px;">Thème</h2>
      <v-color-picker :value="this.$vuetify.theme.themes.light.primary" class="ma-2" v-model="color"></v-color-picker>
      <br>
      <v-btn color="primary" @click="validateThemeChange()">Valider la couleur de thème</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
        color: "#1976d2"
    }
  },
  methods: {
    ...mapGetters(["getConnected"]),
    validateThemeChange() {

      var theme = {
        primary: this.color,
        primaryAttenuate1: this.LightenDarkenColor(this.color, 40),
        primaryAttenuate2: this.LightenDarkenColor(this.color, 80)
      }

      this.$vuetify.theme.themes.light.primary = theme.primary;
      this.$vuetify.theme.themes.light.primaryAttenuate1 = theme.primaryAttenuate1;
      this.$vuetify.theme.themes.light.primaryAttenuate2 = theme.primaryAttenuate2;

      localStorage.setItem('theme', JSON.stringify(theme));


    },
    LightenDarkenColor(col, amt) {
      var usePound = false;

      if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
      }

      var num = parseInt(col, 16);

      var r = (num >> 16) + amt;

      if (r > 255) r = 255;
      else if (r < 0) r = 0;

      var b = ((num >> 8) & 0x00ff) + amt;

      if (b > 255) b = 255;
      else if (b < 0) b = 0;

      var g = (num & 0x0000ff) + amt;

      if (g > 255) g = 255;
      else if (g < 0) g = 0;

      return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    },
  },
  beforeMount() {
    var a = this.getConnected();
    if (!a) {
      this.$router.push("/error405");
    }
  },

  
};
</script>