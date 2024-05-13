<script setup lang="ts">
// import { createFile } from "../index"

const nuxtDirectories = [
  "assets", "components", "composables", "layouts", "middleware", "pages", "plugins", "server", "utils"
]


// App State
const selectedModules = ref<Array<Module>>([])
const selectedDirectories = ref<Array<string>>(["public"])
const srcDir = ref("src")
const projectName = ref("nuxt-app")

const modulesList = computed(() => {
  return selectedModules.value.map(module => module.value)
})

async function createProject() {
  const dirHandle = await window.showDirectoryPicker();

  await generateDirectories(dirHandle, selectedDirectories.value)
  await generateModuleDependentDirectories(dirHandle, selectedModules.value)
  await generateAppDotVueFile(dirHandle, selectedDirectories.value.includes("pages"), selectedDirectories.value.includes("layouts"))

  // use the same root handle these
  await generatePackageDotJsonFile(dirHandle, projectName.value, selectedModules.value)
  await generateNuxtConfigFile(dirHandle, srcDir.value, modulesList.value)
  await generateGitignoreFile(dirHandle)
  if (modulesList.value.includes('@nuxtjs/tailwindcss')) {
    await generateTailwindConfigFile(dirHandle)
  }
  await generateTSConfigFile(dirHandle)
}


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

async function generateModuleDependentDirectories(handle: any, modules: Array<Module>) {
  modules.forEach(async (module: Module) => {
    if (module.directories) {
      module.directories.forEach(async (directory) => {
        await createDirectory(handle, directory)
      })
    }
  })
}


async function generateNuxtConfigFile(handle: any, srcDir: string, modules: Array<string>) {
  let generatedModules = `${modules.map(module => `"${module}"`)}`
  console.log(generatedModules)
  let content = `
  // https://nuxt.com/docs/api/configuration/nuxt-config
  export default defineNuxtConfig({
    devtools: { enabled: true },
    srcDir: "${srcDir}",
    modules: [${generatedModules}],
  })
  `
  await createFile(handle, "nuxt.config.ts", content)
}

async function generatePackageDotJsonFile(handle: any, projectName: string, modules: Array<Module>) {

  const devDependencies = `${modules.filter(module => module.devDependency == true).map(module => `    "${module.value}": "${module.version}"`).join(",\n")}`
  const dependencies = `${modules.filter(module => module.devDependency == false).map(module => `    "${module.value}": "${module.version}"`).join(",\n")}`

  let content = `
  {
  "name": "${projectName.split(" ").join("-")}",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
  },
  "devDependencies": {\n${devDependencies}\n  },
  "dependencies": {\n${dependencies}\n  }
}
  `
  await createFile(handle, "package.json", content)
}


// generate stores directory


async function scaffoldApp(rootHandle: any) {
  // await generateGitignoreFile()
  // await generateReadmeFile()
  // await generateDirectories()

}

/**
 * official modules, nuxt image, test-utils, content, ui, eslint, fonts, scripts, 
 * 
 * 
 *suggested nuxt modules - tailwindcss, i18n, color-mode, vue use, pinia
 * 
 * 
 * 
 */
</script>

<template>
  <form @submit.prevent class="relative p-4">
    <button @click="createProject">Open</button>
    app name, srcDir, modules checkboxes, optional folders checkboxes, favicon upload, layouts folders,
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
    <button @click="scaffoldApp"
      class="mt-5 sticky bottom-[10px] flex w-full rounded-full text-white uppercase text-sm font-medium max-w-[230px] items-center justify-center p-5 bg-slate-800">Scaffold
      My App</button>
  </form>
</template>
