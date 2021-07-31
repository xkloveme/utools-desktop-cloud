import Vue from 'vue';
import Vuetify, {
  VApp,
  VIcon,
  // VCard,
  // VRating,
  // VToolbar,
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
// Vue.use(Vuetify);
Vue.use(Vuetify, {
  components: {
    VApp,
    VIcon,
    // VCard,
    // VRating,
    // VToolbar,
  },
  directives: {
    Ripple,
  },
})

export default new Vuetify({
});
