/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Типы для SVG спрайта
declare module 'virtual:svg-icons-register';

// Типы для островов
interface IslandModule {
  mount: (el: HTMLElement) => any;
}

interface HTMLElement {
  dataset: DOMStringMap & {
    vueIsland?: string;
    props?: string;
  };
}
