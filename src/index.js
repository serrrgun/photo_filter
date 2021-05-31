import './styles/index.scss';
import './assets/fonts/Roboto-Regular.ttf';
import { AppController } from './js/components/app-controller/AppController';
import { Header } from './js/components/header/Header';
import { Footer } from './js/components/footer/Footer';
import { Filters } from './js/components/filters/Filters';
import { Editor } from './js/components/editor/Editor';

const app = new AppController('#app', {
  components: [
    Header,
    [Filters, Editor],
    Footer
  ]
})

app.render()