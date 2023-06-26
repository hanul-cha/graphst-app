<script setup lang="ts"></script>

<template>
  <RouterView />
  <Dialog
    v-if="$dialog.opened.value"
    v-bind="$dialog.option.value"
    @confirm="$dialog.close(true)"
    @cancel="$dialog.close(false)"
    @close="$dialog.close(null)"
  />
</template>
