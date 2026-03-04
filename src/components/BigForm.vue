<template>
  <div class="container">
    <div class="calc-materials-info">
      <h2 class="calc-materials__title">Рассчитать стоимость материалов</h2>
      <p class="calc-materials__desc">
        Ответьте на несколько вопросов — это займёт 35 секунд
      </p>
      <!-- Какая у вас задача -->
      <div class="calc-materials__box">
        <div class="calc-materials__label">Какая у вас задача</div>
        <div class="calc-materials__grid">
          <label
            v-for="task in props.tasks"
            :key="task.id"
            class="calc-materials__item"
          >
            <input
              class="radio"
              type="radio"
              name="task"
              :value="task.id"
              v-model="calcData.task"
            />
            <div
              class="calc-materials__item-icon"
              v-html="taskImages[task.id]"
            ></div>
            <div class="calc-materials__item-title">{{ task.title }}</div>
            <div class="calc-materials__item-text">{{ task.description }}</div>
          </label>
        </div>
      </div>

      <!-- Тип объекта -->
      <div class="calc-materials__box">
        <div class="calc-materials__label">Тип объекта</div>
        <div class="calc-materials__buttons">
          <label
            v-for="type in props.propertyType"
            :key="type.id"
            class="calc-materials__btn"
            :class="{ active: calcData.propertyType === type.id }"
          >
            <input
              type="radio"
              name="propertyType"
              :value="type.id"
              v-model="calcData.propertyType"
            />
            {{ type.value }}
          </label>
        </div>
      </div>

      <!-- Примерная площадь -->
      <div class="calc-materials__box">
        <div class="calc-materials__label">Примерная площадь</div>
        <div class="calc-materials__buttons">
          <label
            v-for="sq in props.square"
            :key="sq.id"
            class="calc-materials__btn"
            :class="{ active: calcData.square === sq.id }"
          >
            <input
              type="radio"
              name="square"
              :value="sq.id"
              v-model="calcData.square"
            />
            {{ sq.value }}
          </label>
        </div>
      </div>

      <div class="calc-materials__grid --gap-24">
        <!-- Бюджет на материалы -->
        <div class="calc-materials__field-group input-floating-wrapper">
          <select
            id="budget"
            v-model="calcData.budget"
            class="calc-materials__select"
          >
            <option
              v-for="item in props.budget"
              :key="item.id"
              :value="item.id"
            >
              {{ item.value }}
            </option>
          </select>
          <label class="calc-materials__label-block" for="budget">
            Бюджет на материалы
          </label>
        </div>

        <!-- Тип жилья -->
        <div class="calc-materials__field-group input-floating-wrapper">
          <select
            id="house"
            v-model="calcData.house"
            class="calc-materials__select"
          >
            <option v-for="item in props.house" :key="item.id" :value="item.id">
              {{ item.value }}
            </option>
          </select>
          <label class="calc-materials__label-block" for="house"
            >Тип жилья</label
          >
        </div>

        <!-- Образ вашего интерьера -->
        <div class="calc-materials__field-group input-floating-wrapper">
          <select
            id="interior"
            v-model="calcData.interior"
            class="calc-materials__select"
          >
            <option
              v-for="item in props.interior"
              :key="item.id"
              :value="item.id"
            >
              {{ item.value }}
            </option>
          </select>
          <label class="calc-materials__label-block" for="interior">
            Образ вашего интерьера
          </label>
        </div>

        <!-- Этап вашего ремонта на данный момент -->
        <div class="calc-materials__field-group input-floating-wrapper">
          <select
            id="state"
            v-model="calcData.state"
            class="calc-materials__select"
          >
            <option v-for="item in props.state" :key="item.id" :value="item.id">
              {{ item.value }}
            </option>
          </select>
          <label class="calc-materials__label-block" for="state">
            Этап вашего ремонта на данный момент
          </label>
        </div>
      </div>
    </div>

    <form class="calc-materials__form" @submit.prevent="handleSubmit">
      <div class="calc-materials__fields">
        <div>
          <div class="calc-materials__field input-floating-wrapper">
            <input
              id="calc-name"
              v-model="formData.name"
              class="calc-materials__input"
              :class="{ error: errors.name }"
              type="text"
              name="name"
              autocomplete="name"
              placeholder=" "
              @blur="validateField('name')"
            />
            <label class="calc-materials__label" for="calc-name">Имя</label>
          </div>
          <span class="form-error" v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div>
          <div class="calc-materials__field input-floating-wrapper">
            <input
              id="calc-phone"
              v-model="formattedPhone"
              class="calc-materials__input"
              :class="{ error: errors.phone }"
              type="tel"
              name="phone"
              autocomplete="tel"
              inputmode="tel"
              placeholder=" "
              @input="handlePhoneInput"
              @blur="validateField('phone')"
            />
            <label class="calc-materials__label" for="calc-phone">
              Ваш телефон
            </label>
          </div>
          <span class="form-error" v-if="errors.phone">{{ errors.phone }}</span>
        </div>
        <div class="calc-materials__field --long-field">
          <textarea
            id="calc-comment"
            v-model="formData.comment"
            class="calc-materials__textarea"
            name="comment"
            placeholder="Комментарий (необязательно)"
            rows="3"
          ></textarea>
        </div>
      </div>

      <!-- Комментарий -->

      <div class="calc-materials__agree">
        <input
          id="calc-agree"
          v-model="formData.agree"
          class="calc-materials__checkbox"
          type="checkbox"
        />
        <label class="calc-materials__agree-label" for="calc-agree">
          Я соглашаюсь на обработку персональных данных согласно
          <a :href="props.policyUrl">политике конфиденциальности</a>
        </label>
        <span class="form-error" v-if="errors.agree">{{ errors.agree }}</span>
      </div>

      <button
        class="calc-materials__submit"
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
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
import SuccessModal from './SuccessModal.vue';
import { useForm } from '../composables/useForm';
import { usePhoneMask } from '../composables/usePhoneMask';
import { useModal } from '../composables/useModal';
import SuccessImg from '../assets/images/success.svg';
import Task1Svg from '../assets/images/task1.svg?raw';
import Task2Svg from '../assets/images/task2.svg?raw';
import Task3Svg from '../assets/images/task3.svg?raw';
import Task4Svg from '../assets/images/task4.svg?raw';

interface Props {
  tasks?: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  propertyType?: Array<{
    id: number;
    value: string;
  }>;
  square?: Array<{
    id: number;
    value: string;
  }>;
  budget?: Array<{
    id: number;
    value: string;
  }>;
  house?: Array<{
    id: number;
    value: string;
  }>;
  interior?: Array<{
    id: number;
    value: string;
  }>;
  state?: Array<{
    id: number;
    value: string;
  }>;
  apiUrl?: string;
  policyUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tasks: () => [],
  propertyType: () => [],
  square: () => [],
  budget: () => [],
  house: () => [],
  interior: () => [],
  state: () => [],
});

// Маппинг картинок для задач
const taskImages: Record<number, string> = {
  1: Task1Svg,
  2: Task2Svg,
  3: Task3Svg,
  4: Task4Svg,
};

const {
  formData,
  state,
  handleSubmit: submitForm,
} = useForm({
  name: '',
  phone: '+7',
  comment: '',
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
watch(formattedPhone, (newValue: string) => {
  formData.phone = newValue;
});

const errors = reactive({ name: '', phone: '', agree: '' });

// Данные калькулятора
const calcData = reactive({
  task: 1 as number | null,
  propertyType: 1 as number | null,
  square: 1 as number | null,
  budget: 1 as number | null,
  house: 1 as number | null,
  interior: 1 as number | null,
  state: 1 as number | null,
});

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

  const dataToSubmit = {
    ...formData,
    phone: getDigits(), // Отправляем только цифры
    calculation: {
      task: calcData.task,
      propertyType: calcData.propertyType,
      square: calcData.square,
      budget: calcData.budget,
      house: calcData.house,
      interior: calcData.interior,
      state: calcData.state,
    },
  };

  await submitForm(
    async () => {
      const response = await fetch(props.apiUrl || '/api/submit', {
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
        // Сбрасываем данные калькулятора на первые варианты
        calcData.task = 1;
        calcData.propertyType = 1;
        calcData.square = 1;
        calcData.budget = 1;
        calcData.house = 1;
        calcData.interior = 1;
        calcData.state = 1;
        openSuccessModal();
      },
      onError: () => {
        errors.name = 'Ошибка отправки. Попробуйте позже.';
      },
    },
  );
}
</script>
