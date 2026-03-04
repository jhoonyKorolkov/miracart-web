import { createApp } from 'vue';
import RepairForm from '../components/RepairForm.vue';
import { parseProps } from '../utils/islands';

export function mount(el: HTMLElement) {
  const props = parseProps(el.dataset.props);
  const app = createApp(RepairForm, props);
  app.mount(el);
  return app;
}
