<script setup lang="ts">
import {
  GetFollowerUsersDocument,
  GetFollowingUsersDocument,
} from '@/api/graphql'
import { DialogFollowType } from './dialogTypes'

interface DialogProps {
  type: DialogFollowType
  targetId: string
}

interface DialogEmits {
  (_: 'update:type', __: DialogFollowType): void
  (_: 'cancel'): void
  (_: 'close'): void
}

const props = withDefaults(defineProps<DialogProps>(), {
  type: DialogFollowType.Follower,
})

const emit = defineEmits<DialogEmits>()

const { result: followerResult, loading: followerLoading } = useQuery(
  GetFollowerUsersDocument,
  {
    followerId: props.targetId,
  }
)

const { result: followingResult, loading: followingLoading } = useQuery(
  GetFollowingUsersDocument,
  {
    followingId: props.targetId,
  }
)

const loading = computed(() => followerLoading.value || followingLoading.value)
const followers = computed(() => followerResult.value?.users?.nodes ?? [])
const followings = computed(() => followingResult.value?.users?.nodes ?? [])

function update(type: string) {
  emit('update:type', type as DialogFollowType)
}
</script>

<template>
  <Dialog
    class="flex w-80 flex-col items-center justify-center"
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
    <div>
      <template v-if="loading"> 로딩중... </template>
      <template v-else>
        <template v-if="type === DialogFollowType.Follower">
          <template v-if="followers.length === 0">
            팔로워가 없습니다.
          </template>
          <template v-else>
            <div class="flex flex-col items-center justify-center">
              <template v-for="follower in followers">
                {{ follower.name }}
              </template>
            </div>
          </template>
        </template>
        <template v-else>
          <template v-if="followings.length === 0">
            팔로우한 유저가 없습니다.
          </template>
          <template v-else>
            <div class="flex flex-col items-center justify-center">
              <template v-for="following in followings">
                {{ following.name }}
              </template>
            </div>
          </template>
        </template>
      </template>
    </div>
  </Dialog>
</template>
