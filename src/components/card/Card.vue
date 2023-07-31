<script setup lang="ts">
export interface CardProps {
  imgUrl?: string
  title?: string
  content?: string
  alt?: string
}

interface CardEmits {
  (_e: 'click', _value: MouseEvent): void
}

withDefaults(defineProps<CardProps>(), {
  imgUrl: undefined,
  title: undefined,
  content: undefined,
  alt: 'card image',
})

defineEmits<CardEmits>()
</script>

<template>
  <div class="relative mb-6 flex flex-col items-center">
    <div
      class="flex aspect-square w-full cursor-pointer items-center justify-center rounded-xl border bg-white"
      @click="$emit('click', $event)"
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
    <slot name="active" />
    <div
      class="absolute -bottom-5 left-1/2 w-5/6 -translate-x-1/2 rounded-xl border bg-white p-1"
    >
      <slot>
        <div>{{ title }}</div>
        <div>{{ content }}</div>
      </slot>
    </div>
  </div>
</template>
