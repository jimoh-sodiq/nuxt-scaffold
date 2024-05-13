<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>

<template>
    <div class="border border-dashed w-full border-slate-500 rounded-[9px] p-4 bg-gray-100 shadow-sm">
        <h2 class="uppercase font-semibold text-sm text-rose-600">{{ title }}</h2>
        <div class="mt-2.5">
            <slot />
        </div>
    </div>
</template>