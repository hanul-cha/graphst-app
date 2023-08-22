<script setup lang="ts">
import { GetFollowingUsersDocument, UserFullFragment } from '@/api/graphql'
import { apolloClient } from '@/plugins/apollo'
import { useAuthStore } from '@/store/auth'

interface DialogProps {
  targetId: string
}

interface DialogEmits {
  (_: 'cancelLike'): void
}

const props = defineProps<DialogProps>()
const emit = defineEmits<DialogEmits>()

const auth = useAuthStore()

const page = ref<number>(1)
const requireLoad = ref(false)

const variablesParameter = computed(() => ({
  perPage: 10,
  page: 1,
  followingId: props.targetId,
}))

const { onResult, loading, refetch } = useQuery(
  GetFollowingUsersDocument,
  variablesParameter
)
onResult(({ data }) => {
  if (data.users?.nodes) {
    followings.value = data.users.nodes
  }
  if (data.users?.pageInfo.hasNextPage) {
    requireLoad.value = true
  }
})

const followings = ref<UserFullFragment[]>([])

async function cancelLike(likedUserId: string) {
  const user = await auth.unFollow(likedUserId)

  if (user) {
    await refetch()
    emit('cancelLike')
  }
}

async function loadEvent(
  continueLoad: () => Promise<void>,
  endLoad: () => void
) {
  if (loading.value) {
    continueLoad()
    return
  }
  page.value += 1

  const { data } = await apolloClient.query({
    query: GetFollowingUsersDocument,
    variables: {
      ...variablesParameter.value,
      page: page.value,
    },
  })
  if (
    followings.value.length &&
    data.users?.nodes &&
    data.users?.nodes.length
  ) {
    followings.value.push(...data.users.nodes)
  }
  if (data.users?.pageInfo.hasNextPage) {
    await continueLoad()
  } else {
    endLoad()
    requireLoad.value = false
  }
}
</script>

<template>
  <div class="h-64">
    <UserList
      :loading="loading"
      :users="followings"
      empty-text="팔로우한 유저가 없습니다."
    >
      <template #action="{ user }">
        <div class="cursor-pointer text-red-500" @click="cancelLike(user.id)">
          취소
        </div>
      </template>
    </UserList>
    <Loader v-if="requireLoad" :event="loadEvent" />
  </div>
</template>
