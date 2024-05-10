<script setup lang="ts">
import { twMerge } from "tailwind-merge"

const emit = defineEmits<{
  (event: "closeModal"): void
}>()

onMounted(() => {
  document!.body.style.overflow = "hidden"
})
onUnmounted(() => (document!.body.style.overflow = "auto"))

const props = withDefaults(
  defineProps<{
    backgroundClose?: boolean
    modalContentClass?: string
    modalBackgroundClass?: string
  }>(),
  {
    backgroundClose: true,
    modalBackgroundClass: "",
    modalContentClass: "",
  },
)

const defaultModalBackgroundClass = computed(() =>
  twMerge(
    "fixed inset-0 flex justify-center  items-center bg-black bg-opacity-50 p-4 z-[890]",
    props.modalBackgroundClass,
  ),
)
const defaultModalContentClass = computed(() =>
  twMerge(
    "rounded-md bg-white max-w-2xl w-full p-[19px] overflow-hidden max-h-[90%] overflow-y-auto",
    props.modalContentClass,
  ),
)

function handleBackgroundClick() {
  if (props.backgroundClose) emit("closeModal")
  return
}
</script>

<template>
  <teleport to="body">
    <div :class="defaultModalBackgroundClass" @click.self.exact="handleBackgroundClick">
      <div :class="defaultModalContentClass">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<style scoped></style>