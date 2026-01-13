<script setup>
import { ref, watch, reactive } from 'vue';

import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { useToast } from 'primevue/usetoast';
import { authenticate } from '@/services/authService.js';
import { saveUser } from '@/services/userService.js';
import { useRouter } from 'vue-router';

const mode = ref('signin'); // 'signin' | 'signup'
const toast = useToast();
const router = useRouter();

const initialValues = reactive({
  email: '',
  password: '',
  confirmPassword: ''
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.email) {
    errors.email = [{ message: 'Email is required' }];
  }

  if (!values.password) {
    errors.password = [{ message: 'Password is required' }];
  }

  if (mode.value === 'signup') {
    if (!values.confirmPassword) {
      errors.confirmPassword = [{ message: 'Confirm your password' }];
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = [{ message: 'Passwords do not match' }];
    }
  }

  return { values, errors };
};

const onSubmit = async ({ values, valid }) => {
  if (!valid) return;

  try {
    if (mode.value === 'signin') {
      await authenticate(values.email, values.password);

      toast.add({
        severity: 'success',
        summary: 'Welcome back!',
        detail: 'You have been signed in successfully.',
        life: 3000
      });

      router.push('/');
    }

    if (mode.value === 'signup') {
      await saveUser(values.email, values.password);

      toast.add({
        severity: 'success',
        summary: 'Account created',
        detail: 'You can now sign in.',
        life: 3000
      });

      mode.value = 'signin';
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Request failed',
      detail: error.response?.data?.message ?? 'Something went wrong',
      life: 3000
    });
  }
};

const resetForm = () => {
  Object.assign(initialValues, {
    email: '',
    password: '',
    confirmPassword: ''
  });
};

watch(mode, () => {
  resetForm();
});

const toggleMode = () => {
  mode.value = mode.value === 'signin' ? 'signup' : 'signin';
   Object.assign(initialValues, {
    email: '',
    password: '',
    confirmPassword: ''
  });
};
</script>
<template>
  <div class="min-h-screen flex items-center align-center justify-center px-3">
    <div class="w-full max-w-md px-3">

      <div class="surface-card shadow-2 border-round-xl p-4 sm:p-5">
        <Form
          v-slot="$form"
          :initialValues="initialValues"
          :resolver="resolver"
		  :key="mode"
          @submit="onSubmit"
          class="flex flex-col gap-4"
        >
          <!-- LOGO -->
          <img
            class="h-3rem sm:h-4rem object-contain mx-auto mb-2"
            alt="App logo"
			src="../assets/unofficial_pokedex.png"
          />

          <h2 class="text-center text-xl sm:text-2xl font-semibold">
            {{ mode === 'signin' ? 'Sign In' : 'Create Account' }}
          </h2>

          <!-- EMAIL -->
          <div class="flex flex-col gap-1">
            <InputText name="email" placeholder="Email" fluid />
            <Message
              v-if="$form.email?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.email.error?.message }}
            </Message>
          </div>

          <!-- PASSWORD -->
          <div class="flex flex-col gap-1">
            <Password
              name="password"
              placeholder="Password"
              toggleMask
              :feedback="false"
              fluid
            />
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.password.error?.message }}
            </Message>
          </div>

          <!-- CONFIRM PASSWORD -->
          <div v-if="mode === 'signup'" class="flex flex-col gap-1">
            <Password
              name="confirmPassword"
              placeholder="Confirm Password"
              toggleMask
              :feedback="false"
              fluid
            />
            <Message
              v-if="$form.confirmPassword?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.confirmPassword.error?.message }}
            </Message>
          </div>

          <!-- SUBMIT -->
          <Button
            type="submit"
			class="w-full mt-2 active:!bg-[#FFCB05] active:!border-[#FFCB05] focus:!border-[#FFCB05] focus:!bg-[#FFCB05] hover:!bg-[#FFCB05] hover:!border-[#FFCB05]"
            :label="mode === 'signin' ? 'Sign In' : 'Sign Up'"
          />

          <!-- MODE TOGGLE -->
          <Button
            type="button"
            text
            severity="secondary"
            class="w-full "
            @click="toggleMode"
            :label="mode === 'signin'
              ? 'Create an account'
              : 'Already have an account?'"
          />
        </Form>
      </div>

    </div>
  </div>
</template>
