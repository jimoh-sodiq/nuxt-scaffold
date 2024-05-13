export type Module = {
  name: string;
  value: string;
  version: string;
  devDependency: boolean;
  directories?: Array<string>;
  dependencies?: Array<Dependency>;
};

export type Dependency = {
  name: string;
  value: string;
  version: string;
  devDependency: boolean;
};
export const officialNuxtModules: Array<Module>  = [
  {
    name: "nuxt content",
    value: "@nuxt/content",
    version: "^2.12.1",
    devDependency: true,
    directories: ["content"],
  },
];

export const  suggestedModules: Array<Module> = [
  {
    name: "pinia",
    value: "@pinia/nuxt",
    version: "^2.1.7",
    devDependency: true,
    directories: ["stores"],
  },
  {
    name: "vue-use",
    value: "@vueuse/nuxt",
    version: "^10.9.0",
    devDependency: true,
    dependencies: [
      {
        name: "vue-use",
        value: "@vueuse/core",
        version: "^10.9.0",
        devDependency: true,
      },
    ],
  },
  {
    name: "tailwind",
    value: "@nuxtjs/tailwindcss",
    version: "^6.12.0",
    devDependency: true,
  },
];
// add @vueuse/core as dependency
