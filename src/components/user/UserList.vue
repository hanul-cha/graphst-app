<script setup lang="ts">
import { UserFullFragment } from '@/api/graphql'

export interface UserCardProps {
  users: UserFullFragment[]
  emptyText?: string
  loading?: boolean
}

defineProps<UserCardProps>()
</script>

<template>
  <div>
    <template v-if="!loading && users.length === 0">
      <div class="flex justify-center">
        {{ emptyText || '유저가 없습니다.' }}
      </div>
    </template>
    <template v-else>
      <div class="space-y-5">
        <template v-for="(user, index) of users" :key="index">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-x-3">
              <div class="h-10 w-10 rounded-full bg-white shadow-inner" />

              <div>{{ user.name }}</div>
              <div class="flex items-center">
                <IconFillHeart class="h-5 w-5" /> {{ user.countFollower }}
              </div>
            </div>
            <slot name="action" :user="user" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
