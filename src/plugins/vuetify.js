import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons:{
        iconfont: 'md' || 'fa'
    },
    theme: {
        themes: {
            light: {
                primary: '#1867C0',
                secondary: '#5CBBF6',
                tertiary: '#E57373',
                accent: '#005CAF',
            }
        }
    }
});
