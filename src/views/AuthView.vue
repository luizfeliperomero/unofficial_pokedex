<script setup>
import { ref, watch, reactive } from 'vue';

import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { useToast } from 'primevue/usetoast';
import { authenticate } from '@/services/authService.js';
import { saveUser, getUser } from '@/services/userService.js';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'

const mode = ref('signin');
const toast = useToast();
const router = useRouter();
const userStore = useUserStore();

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
      const response = await authenticate(values.email, values.password);
	  localStorage.setItem('token', response.data.token);
	  localStorage.setItem('id', response.data.id);

	  const userResponse = await getUser();	
	  userStore.setUser(userResponse.data.user);

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
		<div class="min-h-screen flex items-center justify-center px-3
            bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
  <!-- DESKTOP CONTAINER -->
  <div
    class="w-full
           md:max-w-6xl
           md:border-2 md:border-black/20
           md:rounded-2xl
           md:p-6
           md:grid md:grid-cols-2 md:gap-6
           md:bg-white/60 md:backdrop-blur"
  >

    <!-- LEFT PANEL (DESKTOP ONLY) -->
    <div
      class="hidden md:flex
             border-2 border-black/20 rounded-xl
             p-6
             flex-col justify-between
             bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
             text-white gap-10"
    >
      <div class="flex flex-col gap-6">
        <img
          src="../assets/unofficial_pokedex.png"
          alt="Unofficial Pokedex"
          class="max-w-xs mx-auto drop-shadow-lg"
        />

        <!-- Feature cards -->
        <div class="grid gap-4">
          <div class="flex items-center gap-3 bg-white/20 p-4 rounded-xl">
            <i class="pi pi-star-fill text-yellow-300 text-lg"></i>
            <span class="font-medium">Save favorite Pokémon</span>
          </div>

          <div class="flex items-center gap-3 bg-white/20 p-4 rounded-xl">
            <i class="pi pi-filter text-cyan-200 text-lg"></i>
            <span class="font-medium">Filter by type & attributes</span>
          </div>

          <div class="flex items-center gap-3 bg-white/20 p-4 rounded-xl">
            <i class="pi pi-bolt text-yellow-200 text-lg"></i>
            <span class="font-medium">Fast & responsive Pokédex</span>
          </div>
        </div>
      </div>

      <!-- Disclaimer (desktop) -->
      <p class="text-xs leading-relaxed text-white/90">
        This is an unofficial, non-commercial demo project created for evaluation purposes only.
        Pokémon and Pokémon character names are trademarks of Nintendo, Game Freak, and Creatures Inc.
        Pokémon data is provided by PokéAPI (pokeapi.co).
      </p>
    </div>

    <!-- RIGHT PANEL (YOUR ORIGINAL MOBILE CONTENT) -->
    <div class="w-full max-w-md px-3 mx-auto md:flex md:items-center">

      <!-- YOUR ORIGINAL CARD -->
      <div class="surface-card shadow-2 border-round-xl p-4 sm:p-5 md:border-2 border-black/20 md:border-none md:w-full">
        <Form
          v-slot="$form"
          :initialValues="initialValues"
          :resolver="resolver"
          :key="mode"
          @submit="onSubmit"
          class="flex flex-col gap-4"
        >
		<img
            class="h-3rem sm:h-4rem object-contain mx-auto mb-2 md:hidden"
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
            :disabled="mode === 'signup' && $form.confirmPassword?.invalid"
            type="submit"
            class="w-full mt-2 active:!bg-[#FFCB05] active:!border-[#FFCB05]
                   focus:!border-[#FFCB05] focus:!bg-[#FFCB05]
                   hover:!bg-[#FFCB05] hover:!border-[#FFCB05]"
            :label="mode === 'signin' ? 'Sign In' : 'Sign Up'"
          />

          <!-- MODE TOGGLE -->
          <Button
            type="button"
            text
            severity="secondary"
            class="w-full"
            @click="toggleMode"
            :label="mode === 'signin'
              ? 'Create an account'
              : 'Already have an account?'"
          />
        </Form>
      </div>

      <!-- MOBILE DISCLAIMER (UNCHANGED) -->
      <p class="text-center text-xs text-gray-500 mt-4 px-2 md:hidden">
        This is an unofficial, non-commercial demo project created for evaluation purposes only.
        Pokémon and Pokémon character names are trademarks of Nintendo, Game Freak, and Creatures Inc.
        Pokémon data is provided by PokéAPI (pokeapi.co).
      </p>
    </div>
  </div>
</div>
</template>
