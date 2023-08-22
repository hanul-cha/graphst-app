<script setup lang="ts">
import { GetFollowerUsersDocument, UserFullFragment } from '@/api/graphql'
import { apolloClient } from '@/plugins/apollo'

interface DialogProps {
  targetId: string
}

const props = defineProps<DialogProps>()

const page = ref<number>(1)
const requireLoad = ref(false)

const variablesParameter = computed(() => ({
  perPage: 5,
  page: 1,
  followerId: props.targetId,
}))

const { onResult, loading } = useQuery(
  GetFollowerUsersDocument,
  variablesParameter
)
onResult(({ data }) => {
  if (data.users?.nodes) {
    followers.value = data.users.nodes
  }
  if (data.users?.pageInfo.hasNextPage) {
    requireLoad.value = true
  }
})

const followers = ref<UserFullFragment[]>([])

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
    query: GetFollowerUsersDocument,
    variables: {
      ...variablesParameter.value,
      page: page.value,
    },
  })
  if (followers.value.length && data.users?.nodes && data.users?.nodes.length) {
    followers.value.push(...data.users.nodes)
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
  <div class="h-64 overflow-y-auto">
    <UserList
      :loading="loading"
      :users="followers"
      empty-text="팔로워가 없습니다."
    />
    <Loader v-if="requireLoad" :event="loadEvent" />
  </div>
</template>
