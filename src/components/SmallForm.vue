<template>
  <div class="container">
    <div class="visit-form__inner">
      <div class="visit-form__info">
        <h4 class="visit-form__title">
          Оставьте заявку на бесплатную консультацию
        </h4>
        <div class="visit-form__author">
          <img
            :src="props.user?.url"
            :alt="props.user?.name"
            class="visit-form__author-photo"
          />
          <div class="visit-form__author-meta">
            <p class="visit-form__author-text">
              Мы перезвоним в течение 15 минут. Наш эксперт проконсультирует по
              всем важным моментам и подскажет, с чего лучше начать
            </p>
            <span class="visit-form__author-name">
              {{ props.user?.name }}, {{ props.user?.job }}
            </span>
          </div>
        </div>
      </div>

      <form class="visit-form__form" @submit.prevent="handleSubmit">
        <div class="visit-form__fields">
          <div>
            <div class="visit-form__field input-floating-wrapper">
              <input
                id="visit-name"
                v-model="formData.name"
                class="visit-form__input"
                :class="{ error: errors.name }"
                type="text"
                name="name"
                autocomplete="name"
                placeholder=" "
                @blur="validateField('name')"
              />
              <label class="visit-form__label" for="visit-name">Имя</label>
            </div>
            <span class="form-error" v-if="errors.name">{{ errors.name }}</span>
          </div>
          <div>
            <div class="visit-form__field input-floating-wrapper">
              <input
                id="visit-phone"
                v-model="formattedPhone"
                class="visit-form__input"
                :class="{ error: errors.phone }"
                type="tel"
                name="phone"
                autocomplete="tel"
                inputmode="tel"
                placeholder=" "
                @input="handlePhoneInput"
                @blur="validateField('phone')"
              />
              <label class="visit-form__label" for="visit-phone">
                Ваш телефон
              </label>
            </div>
            <span class="form-error" v-if="errors.phone">{{
              errors.phone
            }}</span>
          </div>
        </div>

        <div class="visit-form__agree">
          <input
            id="visit-agree"
            v-model="formData.agree"
            class="visit-form__checkbox"
            type="checkbox"
          />
          <label class="visit-form__agree-label" for="visit-agree">
            Я соглашаюсь на обработку персональных данных согласно
            <a :href="props.policyUrl">политике конфиденциальности</a>
          </label>
          <span class="form-error" v-if="errors.agree">{{ errors.agree }}</span>
        </div>

        <button
          class="visit-form__submit"
          type="submit"
          :disabled="state.loading"
        >
          {{ state.loading ? 'Отправка...' : 'Отправить заявку' }}
        </button>
      </form>
    </div>

    <SuccessModal
      :isOpen="isSuccessModalOpen"
      :isShown="isSuccessModalShown"
      :isClosing="isSuccessModalClosing"
      :image="SuccessImg"
      @close="closeSuccessModal"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useForm } from '../composables/useForm';
import { usePhoneMask } from '../composables/usePhoneMask';
import { useModal } from '../composables/useModal';
import SuccessModal from './SuccessModal.vue';
import SuccessImg from '../assets/images/success.svg';

interface Props {
  apiUrl?: string;
  user?: { url?: string; name?: string; job?: string };
  policyUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
  apiUrl: '/api/submit-form',
  user: () => ({
    url: '',
    name: '',
    job: '',
  }),
  policyUrl: '/privacy-policy',
});

const {
  formData,
  state,
  handleSubmit: submitForm,
} = useForm({
  name: '',
  phone: '+7',
  agree: true,
});

const {
  phone: formattedPhone,
  handleInput: handlePhoneInput,
  isValid: isPhoneValid,
  reset: resetPhone,
  getDigits,
} = usePhoneMask('+7');

const {
  isOpen: isSuccessModalOpen,
  isShown: isSuccessModalShown,
  isClosing: isSuccessModalClosing,
  open: openSuccessModal,
  close: closeSuccessModal,
} = useModal();

// Синхронизация маски телефона с formData
watch(formattedPhone, (newValue) => {
  formData.phone = newValue;
});

const errors = reactive({ name: '', phone: '', agree: '' });

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
    if (formattedPhone.value === '+7' || formattedPhone.value.trim() === '') {
      errors.phone = 'Введите номер телефона';
    } else if (!isPhoneValid()) {
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

  // Подготавливаем данные для отправки с телефоном без маски
  const dataToSubmit = {
    ...formData,
    phone: getDigits(), // Отправляем только цифры
  };

  await submitForm(
    async () => {
      const response = await fetch(props.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки формы');
      }

      return response.json();
    },
    {
      resetOnSuccess: true,
      onSuccess: () => {
        resetPhone();
        openSuccessModal();
      },
      onError: () => {
        errors.name = 'Ошибка отправки. Попробуйте позже.';
      },
    },
  );
}
</script>
