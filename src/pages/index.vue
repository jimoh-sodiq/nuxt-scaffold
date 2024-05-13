<script setup lang="ts">
// import { createFile } from "../index"


function generateNuxtConfig({ srcDir = ".", modules = [] }: {
  srcDir?: string, modules?: Array<string>
}) {

  let generatedModules = `${modules}`
  return `
  // https://nuxt.com/docs/api/configuration/nuxt-config
  export default defineNuxtConfig({
    devtools: { enabled: true },
    srcDir: "${srcDir}",
    modules: "[${generatedModules}]",
  })
  `
}

async function createProject(name: string, fileName: string, fileContent: string) {
  const dirHandle = await window.showDirectoryPicker();

  //   await createDirectoryWithSingleFile(dirHandle, "server", "tsconfig.json", `{
  //   "extends": "../.nuxt/tsconfig.server.json"
  // }`)

  // await createFile(dirHandle, "nuxt.config.ts", generateNuxtConfig({ srcDir: 'src', modules: ["@nuxt/image", "@vueuse/nuxt"] }))
  await generateDirectories(dirHandle, nuxtDirectories)
}

const nuxtDirectories = [
  "assets", "components", "composables", "layouts", "middleware", "plugins", "server", "utils"
]

const nuxtModules = [

]


async function generateLayoutsDirectory(handle: any) {
  await createDirectoryWithSingleFile(handle, "layouts", "default.vue", `
<template>
  <div>
    <slot />
  </div>
</template>
  `)
}


async function generateServerDirectory(handle: any) {
  await createDirectoryWithSingleFile(handle, "server", "tsconfig.json", `
{
  "extends": "../.nuxt/tsconfig.server.json"
}
  `)
}

async function generateDirectories(handle: any, directories: Array<string>) {
  directories.forEach(async (directory: string) => {
    if (directory == 'layouts') {
      return await generateLayoutsDirectory(handle)
    }
    if (directory == 'server') {
      return await generateServerDirectory(handle)
    }
    await createDirectory(handle, directory)
  })
}


async function scaffoldApp() {

}

/**
 * official modules, nuxt image, test-utils, content, ui, eslint, fonts, scripts, 
 * 
 * 
 *suggested nuxt modules - tailwindcss, i18n, color-mode
 * 
 * 
 * 
 */
</script>

<template>
  <main class="relative p-4">
    <button @click="createProject">Open</button>
    app name, srcDir, modules checkboxes, optional folders checkboxes, favicon upload, layouts folders,
    <div class=" ">
      <h1 class="uppercase text-sm font-semibold text-slate-600">Quickly Scaffold your nuxt app on the web</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <GlobalInfoCard title="Application settings">
          <div class="grid md:flex flex-wrap lg:flex-nowrap gap-4">
            <GlobalInput label="Project Name" placeholder="e.g nuxt-app" />
            <GlobalInput label="Src Diriectory" placeholder="e.g src, source, project" />
          </div>
        </GlobalInfoCard>
        <GlobalInfoCard title="Nuxt official Modules">
          <div class="flex flex-wrap gap-4">
            <GlobalCheckbox label="@nuxt/tailwind" />
            <GlobalCheckbox label="@nuxt/tailwind" />
            <GlobalCheckbox label="@nuxt/tailwind" />
            <GlobalCheckbox label="@nuxt/tailwind" />
          </div>
        </GlobalInfoCard>
        <GlobalInfoCard title="Suggested Nuxt Modules">
          <div class="flex flex-wrap gap-4">
            <GlobalCheckbox label="@nuxt/tailwind" />
            <GlobalCheckbox label="@nuxt/tailwind" />
            <GlobalCheckbox label="@nuxt/tailwind" />
            <GlobalCheckbox label="@nuxt/tailwind" />
          </div>
        </GlobalInfoCard>
        <GlobalInfoCard title="Directories">
          <div class="flex flex-wrap gap-4">
            <GlobalCheckbox label="pages" disabled />
            <GlobalCheckbox label="public" disabled />
            <GlobalCheckbox :label="directory" :key="directory" v-for="directory in nuxtDirectories" />
          </div>
        </GlobalInfoCard>
      </div>
    </div>
    <button @click="scaffoldApp"
      class="mt-5 sticky bottom-[10px] flex w-full rounded-full text-white uppercase text-sm font-medium max-w-[230px] items-center justify-center p-5 bg-slate-800">Scaffold
      My App</button>
  </main>
</template>
