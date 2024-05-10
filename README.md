# Nuxt 3 Minimal Starter Template

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install

```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev

```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build

```

Locally preview production build:

```bash
# pnpm
pnpm run preview

```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

### My Code Guideline

1. Every directory, subdirectory must be in lowercase e.g pages, components, layouts.
2. Every component should be in PascalCase.
3. Every component should be in a directory (named with respect to the use case).
4. Every component should be named beginning with the name of the parent directory e.g a button component found in the components/user directory should be named UserButton.vue, the same rule applies to subdirectory components. e.g components/user/auth becomes UserAuthButton.vue
5. Common resuable components based on the design system will be in the common folder and should follow the same naming convention as other components.
6. All composables should begin with the use keyword when naming.
7. Remove all commented codes, except when necessary for later reuse, and a //TODO tag should be added in this case.
8. Build and run the application on your machine before pushing to the remote repository after completing a feature (pnpm run preview).
