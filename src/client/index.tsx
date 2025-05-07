import routes from './routes';
import { App } from './components/App';

export default function createApp() {
  return {
    routes,
    render() {
      return App;
    }
  };
}

