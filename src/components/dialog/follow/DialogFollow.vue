<script setup lang="ts">
import {
  GetFollowerUsersDocument,
  GetFollowingUsersDocument,
} from '@/api/graphql'
import { useAuthStore } from '@/store/auth'
import { useFilterStore } from '@/store/filter'
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

const props = withDefaults(defineProps<DialogProps>(), {
  type: DialogFollowType.Follower,
})

const emit = defineEmits<DialogEmits>()

const useFilter = useFilterStore()
const auth = useAuthStore()

const { followPerPage, followPage } = useFilter.on({
  followPerPage: {
    type: Number,
    ignore: true,
    default: 10,
  },
  followPage: {
    type: Number,
    ignore: true,
    default: 1,
  },
})

const { result: followerResult, loading: followerLoading } = useQuery(
  GetFollowerUsersDocument,
  {
    followerId: props.targetId,
    page: followPage.value,
    perPage: followPerPage.value,
  }
)
const {
  result: followingResult,
  loading: followingLoading,
  refetch,
} = useQuery(GetFollowingUsersDocument, {
  followingId: props.targetId,
  page: followPage.value,
  perPage: followPerPage.value,
})

const loading = computed(() => followerLoading.value || followingLoading.value)
const followers = computed(() => followerResult.value?.users?.nodes ?? [])
const followings = computed(() => followingResult.value?.users?.nodes ?? [])
const totalCount = computed(() =>
  props.type === DialogFollowType.Follower
    ? followerResult.value?.users?.totalCount ?? 0
    : followingResult.value?.users?.totalCount ?? 0
)

function update(type: string) {
  emit('update:type', type as DialogFollowType)
}

async function cancelLike(likedUserId: string) {
  const user = await auth.unFollow(likedUserId)

  if (user) {
    await refetch()
    emit('cancelLike')
  }
}

onUnmounted(() => {
  followPerPage.value = null
  followPage.value = null
})
</script>

<template>
  <Dialog
    class="flex w-96 flex-col items-center justify-center"
    @close="$emit('close')"
    @cancel="$emit('cancel')"
  >
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
      <template v-if="loading"> 로딩중... </template>
      <template v-else>
        <template v-if="type === DialogFollowType.Follower">
          <UserList :users="followers" empty-text="팔로워가 없습니다." />
        </template>
        <template v-else>
          <UserList :users="followings" empty-text="팔로우한 유저가 없습니다.">
            <template #action="{ user }">
              <div
                class="cursor-pointer text-red-500"
                @click="cancelLike(user.id)"
              >
                취소
              </div>
            </template>
          </UserList>
        </template>
      </template>

      <Pagination
        v-model:page="followPage"
        v-model:perPage="followPerPage"
        class="flex w-full justify-center"
        :per-page-option="10"
        :total="totalCount"
        type="next-button"
        @update:per-page="followPage = 1"
      />
    </div>
  </Dialog>
</template>
