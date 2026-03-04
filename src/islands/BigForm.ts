import { createApp } from 'vue';
import BigForm from '../components/BigForm.vue';
import { parseProps } from '../utils/islands';

export function mount(el: HTMLElement) {
  const props = parseProps(el.dataset.props);
  const app = createApp(BigForm, props);
  app.mount(el);
  return app;
}
