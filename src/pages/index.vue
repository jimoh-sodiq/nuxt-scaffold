<script setup lang="ts">
// import { createFile } from "../index"

type Module = {
  name: string, version: string, dependency: boolean
}

const nuxtDirectories = [
  "assets", "components", "composables", "layouts", "middleware", "pages", "plugins", "server", "utils"
]

// App State
const selectedModules = ref<Array<Module>>([])
const selectedDirectories = ref<Array<string>>(["public"])
const srcDir = ref("src")
const projectName = ref("nuxt-app")



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

  await generateDirectories(dirHandle, selectedDirectories.value)
  await generateAppDotVueFile(dirHandle, selectedDirectories.value.includes("pages"), selectedDirectories.value.includes("layouts"))

  // use the same root handle these
  await generateGitignoreFile(dirHandle)
  await generateTailwindConfigFile(dirHandle)
  await generateTSConfigFile(dirHandle)
}

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

async function generateReadmeFile(roothandle: any) {
  // await createFile(roothandle, "README.md",)
}

async function generateGitignoreFile(rootHandle: any) {
  await createFile(rootHandle, ".gitignore", `# Nuxt dev/build outputs
.output
.data
.nuxt
.nitro
.cache
dist

# Node dependencies
node_modules

# Logs
logs
*.log

# Misc
.DS_Store
.fleet
.idea

# Local env files
.env
.env.*
!.env.example

  `)
}

async function generateTailwindConfigFile(rootHandle: any) {
  await createFile(rootHandle, "tailwind.config.ts", `import type { Config } from "tailwindcss"\n
export default <Partial<Config>>{
	content: [
	],
	theme: {
		extend: {},
	},
}
`)
}

async function generateTSConfigFile(rootHandle: any) {
  await createFile(rootHandle, "tsconfig.json", `{
  // https://nuxt.com/docs/guide/concepts/typescript
  "extends": "./.nuxt/tsconfig.json"
}
`)
}

async function generatePagesDirectory(handle: any) {
  await createDirectoryWithSingleFile(handle, "pages", "index.vue", `<template>
  <div>
    Nuxt Application Scaffold
  </div>
</template>
`)
}

async function generateAppDotVueFile(handle: any, pagesExist?: boolean, layoutExists?: boolean) {
  let content = `<template>
  <h1>Hello World!</h1>
</template>`

  const pageContent = `<template>
  <div>
    <NuxtPage/>
  </div>
</template>`

  const layoutContent = `<template>
  <div>
    <NuxtLayout>
      <NuxtPage/> 
    </NuxtLayout>
  </div>
</template>`

  if (pagesExist) {
    content = pageContent
  }
  if (layoutExists) {
    content = layoutContent
  }

  await createFile(handle, "app.vue", content)
}

async function generateDirectories(handle: any, directories: Array<string>) {
  directories.forEach(async (directory: string) => {
    if (directory == 'layouts') {
      return await generateLayoutsDirectory(handle)
    }
    if (directory == 'server') {
      return await generateServerDirectory(handle)
    }
    if (directory == "pages") {
      return await generatePagesDirectory(handle)
    }
    await createDirectory(handle, directory)
  })
}



async function scaffoldApp(rootHandle: any) {
  // await generateGitignoreFile()
  // await generateReadmeFile()
  // await generateDirectories()

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
            <GlobalInput label="Project Name" placeholder="e.g nuxt-app" v-model="projectName" />
            <GlobalInput label="Src Diriectory" placeholder="e.g src, source, project" v-model="srcDir" />
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
            <GlobalCheckbox v-model="selectedDirectories" value="public" label="public" disabled />
            <GlobalCheckbox v-model="selectedDirectories" :value="directory" :label="directory" :key="directory"
              v-for="directory in nuxtDirectories" />
          </div>
        </GlobalInfoCard>
      </div>
    </div>
    <button @click="scaffoldApp"
      class="mt-5 sticky bottom-[10px] flex w-full rounded-full text-white uppercase text-sm font-medium max-w-[230px] items-center justify-center p-5 bg-slate-800">Scaffold
      My App</button>
  </main>
</template>
