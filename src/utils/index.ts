/**
 * creates a new directory
 * @param parentHandle
 * @param name
 */
export async function createDirectory(parentHandle: any, name: string) {
  const createdDirectoryHandle = await parentHandle.getDirectoryHandle(name, {
    create: true,
  });
  return createdDirectoryHandle;
}

/**
 * Creates a new file in the directory with handle specified
 * @param directoryHandle
 * @param fileName
 * @param fileContent
 */
export async function createFile(
  directoryHandle: any,
  fileName: string,
  fileContent?: string
) {
  const fileHandle = await directoryHandle.getFileHandle(fileName, {
    create: true,
  });
  if (fileContent) {
    await writeFile(fileHandle, fileContent);
  }
  return fileHandle;
}

type FileWithContent = {
  name: string;
  content?: string;
};

/**
 * creates a directory with multiple files passed in as FileWithContent array in fileOptions
 * @param parentHandle
 * @param directoryName
 * @param fileOptions
 */
export async function createDirectoryWithMultipleFiles(
  parentHandle: any,
  directoryName: string,
  fileOptions: Array<FileWithContent>
) {
  const directoryHandle = await createDirectory(parentHandle, directoryName);
  await createMultipleFiles(directoryHandle, fileOptions);
}

/**
 * creates multiple files in a directory
 * @param directoryHandle
 * @param data
 */
export async function createMultipleFiles(
  directoryHandle: any,
  data: Array<FileWithContent>
) {
  data.forEach(async (fileOption) => {
    await createFile(directoryHandle, fileOption.name, fileOption.content);
  });
}

/**
 * creates a directory with a single file
 * @param parentHandle
 * @param directoryName
 * @param fileName
 * @param fileContent
 */
export async function createDirectoryWithSingleFile(
  parentHandle: any,
  directoryName: string,
  fileName: string,
  fileContent?: string
) {
  const directoryHandle = await createDirectory(parentHandle, directoryName);
  const fileHandle = await createFile(directoryHandle, fileName, fileContent);
  return { directoryHandle, fileHandle };
}

/**
 * Writes into a file with the specified handle
 * @param fileHandle
 * @param contents
 */
export async function writeFile(fileHandle: any, contents: string) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}

////////////////////////////////////////////////////////////////////

export async function generateTailwindConfigFile(rootHandle: any) {
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

////////////////////////////////////////////////////////////////////

export async function generateLayoutsDirectory(handle: any) {
  await createDirectoryWithSingleFile(handle, "layouts", "default.vue", `
<template>
  <div>
    <slot />
  </div>
</template>
  `)
}

////////////////////////////////////////////////////////////////////

export async function generateReadmeFile(rootHandle: any) {
  const content = `# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

\`\`\`bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
\`\`\`

## Development Server

Start the development server on \`http://localhost:3000\`:

\`\`\`bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
\`\`\`

## Production

Build the application for production:

\`\`\`bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
\`\`\`

Locally preview production build:

\`\`\`bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
\`\`\`

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.`;

  await createFile(rootHandle, "README.md", content)
}

////////////////////////////////////////////////////////////////////

export async function generatePagesDirectory(handle: any) {
  await createDirectoryWithSingleFile(handle, "pages", "index.vue", `<template>
  <div>
    Nuxt Application Scaffold
  </div>
</template>
`)
}

////////////////////////////////////////////////////////////////////

export async function generateAppDotVueFile(handle: any, pagesExist?: boolean, layoutExists?: boolean) {
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

////////////////////////////////////////////////////////////////////

export async function generateModuleDependentDirectories(handle: any, modules: Array<Module>) {
  modules.forEach(async (module: Module) => {
    if (module.directories) {
      module.directories.forEach(async (directory) => {
        await createDirectory(handle, directory)
      })
    }
  })
}

////////////////////////////////////////////////////////////////////

export async function generateNuxtConfigFile(handle: any, srcDir: string, modules: Array<string>) {
  let generatedModules = `${modules.map(module => `"${module}"`)}`
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

////////////////////////////////////////////////////////////////////

export async function generatePackageDotJsonFile(handle: any, projectName: string, modules: Array<Module>) {

  const devDependencies = `${modules.filter(module => module.devDependency == true).map(module => `    "${module.value}": "${module.version}"`).join(",\n")}`
  const dependencies = `${modules.filter(module => module.devDependency == false).map(module => `    "${module.value}": "${module.version}"`).join(",\n")}`

  let content = `{
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

////////////////////////////////////////////////////////////////////

export async function generateTSConfigFile(rootHandle: any) {
  await createFile(rootHandle, "tsconfig.json", `{
  // https://nuxt.com/docs/guide/concepts/typescript
  "extends": "./.nuxt/tsconfig.json"
}
`)
}


////////////////////////////////////////////////////////////////////

export async function generateServerDirectory(handle: any) {
  await createDirectoryWithSingleFile(handle, "server", "tsconfig.json", `
{
  "extends": "../.nuxt/tsconfig.server.json"
}
  `)
}


////////////////////////////////////////////////////////////////////


export async function generateGitignoreFile(rootHandle: any) {
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


////////////////////////////////////////////////////////////////////

export async function generateDirectories(handle: any, directories: Array<string>) {
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

////////////////////////////////////////////////////////////////////
