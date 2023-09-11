import { createApp } from 'vue';
import '@/style/reset.scss';
import '@/style/helper.scss';
import App from './App.vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router/index';

const app = createApp(App);
app.use(Vant);
app.use(router);
app.mount('#app');
