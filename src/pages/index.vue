<script setup lang="ts">

const nuxtDirectories = [
  "assets", "components", "composables", "layouts", "middleware", "pages", "plugins", "server", "utils"
]

const selectedModules = ref<Array<Module>>([])

const selectedDirectories = ref<Array<string>>(["public"])

const srcDir = ref("src")

const projectName = ref("nuxt-app")

const modulesList = computed(() => {
  return selectedModules.value.map(module => module.value)
})

async function scaffoldApp() {
  const dirPickerHandle = await window.showDirectoryPicker();
  const rootDir = await createDirectory(dirPickerHandle, projectName.value)
  const srcDirHandle = await createDirectory(rootDir, srcDir.value)

  await generateDirectories(srcDirHandle, selectedDirectories.value)
  await generateModuleDependentDirectories(srcDirHandle, selectedModules.value)
  await generateAppDotVueFile(srcDirHandle, selectedDirectories.value.includes("pages"), selectedDirectories.value.includes("layouts"))

  // use the same root handle these
  await generatePackageDotJsonFile(rootDir, projectName.value, selectedModules.value)
  await generateNuxtConfigFile(rootDir, srcDir.value, modulesList.value)
  await generateReadmeFile(rootDir)
  await generateGitignoreFile(rootDir)
  if (modulesList.value.includes('@nuxtjs/tailwindcss')) {
    await generateTailwindConfigFile(rootDir)
  }
  await generateTSConfigFile(rootDir)
}

// suggested nuxt modules - tailwindcss, i18n, color-mode, vue use, pinia
// official modules, nuxt image, test-utils, content, ui, eslint, fonts, scripts,

</script>

<template>
  <form @submit.prevent="" class="relative p-4">
    <button @click="scaffoldApp">Open</button>
    <div class=" ">
      <h1 class="uppercase text-sm font-semibold text-slate-600">Quickly Scaffold your nuxt app on the web</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <GlobalInfoCard title="Application settings">
          <div class="grid md:flex flex-wrap lg:flex-nowrap gap-4">
            <GlobalInput label="Project Name" placeholder="e.g nuxt-app" required v-model.trim="projectName" />
            <GlobalInput label="Src Directory" placeholder="e.g src, source, project" required v-model.trim="srcDir" />
          </div>
        </GlobalInfoCard>
        <GlobalInfoCard title="Nuxt official Modules">
          <div class="flex flex-wrap gap-4">
            <GlobalCheckbox v-for="module in officialNuxtModules" :key="module.value" :value="module"
              v-model="selectedModules" :label="module.name" />
          </div>
        </GlobalInfoCard>
        <GlobalInfoCard title="Suggested Nuxt Modules">
          <div class="flex flex-wrap gap-4">
            <GlobalCheckbox v-for="module in suggestedModules" :key="module.value" :value="module"
              v-model="selectedModules" :label="module.name" />
          </div>
        </GlobalInfoCard>
        <GlobalInfoCard title="Directories">
          <div class="flex flex-wrap gap-4">
            <GlobalCheckbox v-model="selectedDirectories" value="public" label="public" disabled />
            <GlobalCheckbox v-model="selectedDirectories" :value="directory" :label="directory" :key="directory"
              v-for="directory in nuxtDirectories" />
          </div>
        </GlobalInfoCard>
      </div>
    </div>
    <button
      class="mt-5 sticky bottom-[10px] flex w-full rounded-full text-white uppercase text-sm font-medium max-w-[230px] items-center justify-center p-5 bg-slate-800">Scaffold
      My App</button>
  </form>
</template>
