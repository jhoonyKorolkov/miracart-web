import { createApp } from 'vue';
import SmallForm from '../components/SmallForm.vue';
import { parseProps } from '../utils/islands';

export function mount(el: HTMLElement) {
  const props = parseProps(el.dataset.props);
  const app = createApp(SmallForm, props);
  app.mount(el);
  return app;
}
