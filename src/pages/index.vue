<script setup lang="ts">


async function createProject(name: string, fileName: string, fileContent: string) {
  const dirHandle = await window.showDirectoryPicker();

  await createDirectoryWithSingleFile(dirHandle, "server", "tsconfig.json", `{
  "extends": "../.nuxt/tsconfig.server.json"
}`)
}
</script>

<template>
  <main>
    <nuxt-link to="/roadmap">View Roadmap</nuxt-link>
    <button @click="createProject">Open</button>
  </main>
</template>
