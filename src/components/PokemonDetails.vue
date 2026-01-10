<script setup lang="ts">
	import { ref, onMounted } from 'vue';

	const fullText = 'Click on a Pokémon to see details';
	const displayedText = ref('');
	const typingSpeed = 50;

	onMounted(() => {
	  let i = 0;
	  const interval = setInterval(() => {
		if (i < fullText.length) {
		  displayedText.value += fullText[i];
		  i++;
		} else {
		  clearInterval(interval);
		}
	  }, typingSpeed);
	});
</script>
<template>
  <div class="font-press text-xs p-5">
    <div class="w-full h-50 bg-[#8C868B] rounded-md rounded-br-[3.5rem] p-7">
      <div class="bg-[#7C9F51] text-[#D1F793] border-black w-full h-full border p-2">
		  <span class="">{{ displayedText }}</span><span class="cursor">|</span>
	  </div>
    </div>
  </div>
</template>
<style scoped>
	.cursor {
	  display: inline-block;
	  width: 0.6ch;
	  animation: blink 0.7s steps(1) infinite;
	}

	@keyframes blink {
	  0%, 50%, 100% {
		opacity: 1;
	  }
	  25%, 75% {
		opacity: 0;
	  }
	}
</style>
