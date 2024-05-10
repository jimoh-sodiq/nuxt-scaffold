<template>
    <div class="p-4 space-y-4">
        nuxt config, package.json, optional and blank folders created, layout folder, server folder, app.vue generator,
        readme and gitignore generator, tailwind config generator, tsconfig generator
        <div>
            <h1>nuxt.config.ts generator</h1>
            <div>default modules added ( official ones ), - name, version, devDependency or dependency
            </div>
        </div>
        <div>
            <h1>Package.json generator</h1>
            <div>Name,add scripts and command, devDependencies (default installed already), dependencies (any one in
                nuxt
                config will affect this)
            </div>
        </div>
        <div>
            <h1>Generate blank optional folder</h1>
            <div>components, composables, middleware, plugins, utils, assets</div>
        </div>
        <div>
            <h1>layouts folder generator optional</h1>
            <div>default.vue file, affects app.vue</div>
        </div>
        <div>
            <h1>server folder generator</h1>
            <div>favicon.ico needs to be added</div>
        </div>
        <div>
            <h1>Public folder generator (must)</h1>
            <div>favicon.ico needs to be added</div>
        </div>
        <div>
            <h1>Pages folder generator (must)</h1>
            <div>index.vue child content</div>
        </div>
        <div>
            <h1>app.vue generator</h1>
            <div>depends on layout for its contents</div>
        </div>
        <div>
            <h1>tailwind.config.ts generator</h1>
            <div>generated if tailwind module is added, package.json affected
            </div>
        </div>
        <div>
            <h1>tsconfig.json generator</h1>
            <div>must
            </div>
        </div>
        <div>
            <h1>readme generator</h1>
            <div>configure your readme
            </div>
        </div>
        <div>
            <h1>.gitignore generator</h1>
            <div>add more git ignore strings
            </div>
        </div>
        <div>
            <h1>Folder Structure implementation</h1>
            <div>srcDir, affects nuxt-config (adds srcDir option)
            </div>
        </div>
    </div>
</template>


<style scoped>
h1 {
    color: red;
}
</style>