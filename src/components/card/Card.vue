<script setup lang="ts">
export interface CardProps {
  imgUrl?: string
  title?: string
  content?: string
  alt?: string
}

withDefaults(defineProps<CardProps>(), {
  imgUrl: undefined,
  title: undefined,
  content: undefined,
  alt: 'card image',
})
</script>

<template>
  <div class="relative flex flex-col items-center">
    <div
      class="flex aspect-square w-full items-center justify-center rounded-xl border bg-white"
    >
      <template v-if="imgUrl">
        <img
          class="h-full w-full rounded-lg object-cover"
          :src="imgUrl"
          :alt="alt"
        />
      </template>
      <template v-else>
        <IconPost class="h-1/2 w-1/2 fill-gray-100" />
      </template>
    </div>
    <div class="-mt-8 w-5/6 rounded-xl border bg-white p-1">
      <slot>
        <div>{{ title }}</div>
        <div>{{ content }}</div>
      </slot>
    </div>
  </div>
</template>
