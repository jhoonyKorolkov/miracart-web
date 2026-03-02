<template>
  <div class="container">
    <div class="visit-form__inner">
      <div class="visit-form__info">
        <h4 class="visit-form__title">
          Оставьте заявку на бесплатную консультацию
        </h4>
        <div class="visit-form__author">
          <img
            :src="props.imageUrl"
            alt="Виталина Бакланова"
            class="visit-form__author-photo"
          />
          <div class="visit-form__author-meta">
            <p class="visit-form__author-text">
              Мы перезвоним в течение 15 минут. Наш эксперт проконсультирует по
              всем важным моментам и подскажет, с чего лучше начать
            </p>
            <span class="visit-form__author-name">
              Виталина Бакланова, руководитель проектов
            </span>
          </div>
        </div>
      </div>

      <form class="visit-form__form" @submit.prevent="handleSubmit">
        <div class="visit-form__fields">
          <div
            class="visit-form__field"
            :class="{ 'visit-form__field--error': errors.name }"
          >
            <input
              id="visit-name"
              v-model="formData.name"
              class="visit-form__input"
              type="text"
              name="name"
              autocomplete="name"
              placeholder=" "
              @blur="validateField('name')"
            />
            <label class="visit-form__label" for="visit-name">Ваше имя</label>
            <span class="visit-form__error">{{ errors.name }}</span>
          </div>

          <div
            class="visit-form__field"
            :class="{ 'visit-form__field--error': errors.phone }"
          >
            <input
              id="visit-phone"
              v-model="formData.phone"
              class="visit-form__input"
              type="tel"
              name="phone"
              autocomplete="tel"
              inputmode="tel"
              placeholder=" "
              @blur="validateField('phone')"
            />
            <label class="visit-form__label" for="visit-phone"
              >Ваш телефон</label
            >
            <span class="visit-form__error">{{ errors.phone }}</span>
          </div>
        </div>

        <div
          class="visit-form__agree"
          :class="{ 'visit-form__agree--error': errors.agree }"
        >
          <input
            id="visit-agree"
            v-model="formData.agree"
            class="visit-form__checkbox"
            type="checkbox"
          />
          <label class="visit-form__agree-label" for="visit-agree">
            Я согласен на обработку
            <a :href="props.policyUrl">персональных данных</a> и с
            <a :href="props.policyUrl">политикой конфиденциальности</a>
          </label>
          <span class="visit-form__error">{{ errors.agree }}</span>
        </div>

        <button
          class="visit-form__submit btn"
          type="submit"
          :disabled="state.loading"
        >
          {{ state.loading ? 'Отправка...' : 'Записаться на экскурсию' }}
        </button>

        <p v-if="successMessage" class="visit-form__success">
          {{ successMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useForm } from '../composables/useForm';

interface Props {
  apiUrl?: string;
  imageUrl?: string;
  policyUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
  apiUrl: '/api/submit-form',
  imageUrl: '/images/visit-form.jpg',
  policyUrl: '/privacy-policy',
});

const {
  formData,
  state,
  handleSubmit: submitForm,
} = useForm({
  name: '',
  phone: '',
  agree: true,
});

const errors = reactive({ name: '', phone: '', agree: '' });
const successMessage = computed(() =>
  state.success
    ? 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.'
    : '',
);

function validateField(field: 'name' | 'phone' | 'agree') {
  errors[field] = '';

  if (field === 'name') {
    if (!formData.name.trim()) {
      errors.name = 'Введите ваше имя';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Имя слишком короткое';
    }
  }

  if (field === 'phone') {
    const digits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      errors.phone = 'Введите номер телефона';
    } else if (digits.length < 10) {
      errors.phone = 'Введите корректный номер телефона';
    }
  }

  if (field === 'agree' && !formData.agree) {
    errors.agree = 'Необходимо согласие';
  }
}

function validateAll() {
  validateField('name');
  validateField('phone');
  validateField('agree');
  return !errors.name && !errors.phone && !errors.agree;
}

async function handleSubmit() {
  if (!validateAll()) return;

  await submitForm(
    async (data) => {
      const response = await fetch(props.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки формы');
      }

      return response.json();
    },
    {
      resetOnSuccess: true,
      onError: () => {
        errors.name = 'Ошибка отправки. Попробуйте позже.';
      },
    },
  );
}
</script>

<style lang="scss" scoped>
@use '../styles/abstracts/variables' as *;
@use '../styles/abstracts/functions' as *;
@use '../styles/abstracts/mixins' as *;

.visit-form {
  padding: spacing(20) 0;
}
</style>
