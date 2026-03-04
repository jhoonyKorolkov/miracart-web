<template>
  <div class="container">
    <div class="repair-form__inner">
      <picture>
        <source
          :srcset="`${RepairMobImg2x} 2x, ${RepairMobImg} 1x`"
          media="(max-width: 1240px)"
        />
        <img
          :src="RepairImg"
          :srcset="`${RepairImg2x} 2x`"
          alt=""
          loading="lazy"
        />
      </picture>
      <form class="repair-form__form" @submit.prevent="handleSubmit">
        <h4 class="repair-form__title">Нужна готовая квартира без хлопот?</h4>
        <div class="repair-form-text">
          Вы можете полностью снять с себя все вопросы по ремонту и материалам с
          компанией MIRASPACE.
        </div>
        <div class="repair-form__fields">
          <div>
            <div class="repair-form__field input-floating-wrapper">
              <input
                id="repair-name"
                v-model="formData.name"
                class="repair-form__input"
                :class="{ error: errors.name }"
                type="text"
                name="name"
                autocomplete="name"
                placeholder=" "
                @blur="validateField('name')"
              />
              <label class="repair-form__label" for="repair-name">Имя</label>
            </div>
            <span class="form-error" v-if="errors.name">{{ errors.name }}</span>
          </div>
          <div>
            <div class="repair-form__field input-floating-wrapper">
              <input
                id="repair-phone"
                v-model="formattedPhone"
                class="repair-form__input"
                :class="{ error: errors.phone }"
                type="tel"
                name="phone"
                autocomplete="tel"
                inputmode="tel"
                placeholder=" "
                @input="handlePhoneInput"
                @blur="validateField('phone')"
              />
              <label class="repair-form__label" for="repair-phone">
                Ваш телефон
              </label>
            </div>
            <span class="form-error" v-if="errors.phone">{{
              errors.phone
            }}</span>
          </div>
        </div>
        <div class="repair-form__agree">
          <input
            id="repair-agree"
            v-model="formData.agree"
            class="repair-form__checkbox"
            type="checkbox"
          />
          <label class="repair-form__agree-label" for="repair-agree">
            Я соглашаюсь на обработку персональных данных согласно
            <a :href="props.policyUrl">политике конфиденциальности</a>
          </label>
          <span class="form-error" v-if="errors.agree">{{ errors.agree }}</span>
        </div>

        <button
          class="repair-form__submit"
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
import RepairImg from '../assets/images/repair.png';
import RepairImg2x from '../assets/images/repair@2x.png';
import RepairMobImg from '../assets/images/repair-mob.png';
import RepairMobImg2x from '../assets/images/repair-mob@2x.png';

interface Props {
  apiUrl?: string;
  user?: { url?: string; name?: string; job?: string };
  policyUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
  apiUrl: '/api/submit-form',

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
