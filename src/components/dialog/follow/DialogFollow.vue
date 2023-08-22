<script setup lang="ts">
import { DialogFollowType } from './types'

interface DialogProps {
  type: DialogFollowType
  targetId: string
}

interface DialogEmits {
  (_: 'update:type', __: DialogFollowType): void
  (_: 'cancelLike'): void
  (_: 'cancel'): void
  (_: 'close'): void
}

withDefaults(defineProps<DialogProps>(), {
  type: DialogFollowType.Follower,
})

const emit = defineEmits<DialogEmits>()

function update(type: string) {
  emit('update:type', type as DialogFollowType)
}
</script>

<template>
  <Dialog
    class="flex flex-col items-center justify-center"
    @close="$emit('close')"
    @cancel="$emit('cancel')"
  >
    <div class="w-96">
      <Tab
        :model-value="type"
        :tabs="[
          {
            label: '팔로워',
            value: DialogFollowType.Follower,
          },
          {
            label: '팔로잉',
            value: DialogFollowType.Following,
          },
        ]"
        @update:model-value="update"
      />

      <div class="w-full px-6 pt-4">
        <template v-if="type === DialogFollowType.Follower">
          <UserFollowerList :target-id="targetId" />
        </template>
        <template v-else>
          <UserFollowingList
            :target-id="targetId"
            @cancel-like="$emit('cancelLike')"
          />
        </template>
      </div>
    </div>
  </Dialog>
</template>
