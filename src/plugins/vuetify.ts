// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';
import { VBtn } from 'vuetify/components/VBtn';

export default createVuetify({
  aliases: {
    VPrimaryBtn: VBtn,
  },
  defaults: {
    VTextField: {
      density: 'compact',
      variant: 'outlined',
      rounded: 'sm',
      style: 'color: white',
    },
    VTextarea: {
      density: 'compact',
      variant: 'outlined',
      rounded: 'sm',
      style: 'color: white',
    },
    VAutocomplete: {
      density: 'compact',
      variant: 'outlined',
      rounded: 'sm',
      style: 'color: white',
    },
    VCard: {
      color: '#23395d',
      style: 'color: #cadeff',
    },
    VPrimaryBtn: {
      color: '#4a1e9b',
      style: 'color: white; box-shadow: #4a1e9b 0 0 20px;',
    },
  },
});
