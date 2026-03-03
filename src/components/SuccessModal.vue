<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="modal modal--success"
      :class="{ show: isShown }"
      :aria-hidden="!isOpen"
    >
      <div class="modal__overlay" @click="handleClose"></div>
      <div
        class="modal__container"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        @click="handleContainerClick"
      >
        <div class="modal__scroll">
          <div class="modal__content modal__content--compact">
            <button
              type="button"
              class="modal__close"
              @click="handleClose"
              aria-label="Закрыть"
            >
              <svg
                class="icon"
                width="32"
                height="32"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>

            <div class="modal__body">
              <img
                v-if="image"
                class="modal__image"
                :src="image"
                :alt="imageAlt"
              />
              <h2 class="modal__title" :id="titleId">
                {{ title }}
              </h2>
              <p class="modal__text">
                {{ text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  isOpen: boolean;
  isShown?: boolean;
  isClosing?: boolean;
  title?: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isShown: false,
  isClosing: false,
  title: 'Спасибо за заявку!',
  text: 'Наш менеджер свяжется с вами в ближайшее время',
  image: '/images/success.svg',
  imageAlt: 'Готово',
  id: 'modal-success',
});

const emit = defineEmits<{
  close: [];
}>();

const titleId = computed(() => `${props.id}-title`);

function handleClose() {
  emit('close');
}

function handleContainerClick(event: MouseEvent) {
  // Закрываем только если клик был по самому контейнеру, а не по его содержимому
  if (event.target === event.currentTarget) {
    handleClose();
  }
}
</script>
