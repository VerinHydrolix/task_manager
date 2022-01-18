import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

// export default new Vuetify({
// });

export default  new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#1976d2',
          secondary: '#b0bec5',
          primaryAttenuate1: '#5894dc',
          primaryAttenuate2: '#a8ccec',

        },
      },
    },
  })
  
