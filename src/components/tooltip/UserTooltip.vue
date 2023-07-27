<script setup lang="ts">
import { GetUserPublicDocument, UserFullFragment } from '@/api/graphql'
import { apolloClient } from '@/plugins/apollo'

export interface UserTooltipProps {
  name: string
  id: string
}

const props = defineProps<UserTooltipProps>()

async function getUser() {
  const { data } = await apolloClient.query({
    query: GetUserPublicDocument,
    variables: {
      id: props.id,
    },
  })

  if (data?.user) {
    user.value = data.user
  }
}

const user = ref<UserFullFragment | null>(null)
const loading = ref(false)
</script>

<template>
  <Tooltip @enter="getUser">
    {{ name }}
    <template #tooltip>
      <div class="rounded-xl bg-violet-50 p-4">
        <template v-if="loading">로딩중</template>
        <template v-else-if="!user">없는 유저입니다.</template>
        <template v-else>
          <UserCard :user="user" />
        </template>
      </div>
    </template>
  </Tooltip>
</template>
