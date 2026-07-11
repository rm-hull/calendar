# Development Guidelines for Agents

Welcome! This document provides instructions for agentic coding agents working on this project.

## 1. Build, Lint, and Test Commands

This project uses `pnpm` as the package manager and `vitest` for testing.

- **Build:** `pnpm build` (Runs `tsc -b` and `vite build`)
- **Lint:** `pnpm lint` (Runs `eslint --cache --fix ./src`)
- **Format:** `pnpm format` (Runs `prettier --write ./src`)
- **Test (All):** `pnpm test`
- **Test (Single File/Pattern):** `pnpm vitest run <path/to/test.tsx>` or `pnpm vitest run <pattern>`
- **Test (With Coverage):** `pnpm test:ci`

## 2. Coding Style Guidelines

### General

- **TypeScript:** Use strict mode. Avoid `any` types. Leverage TypeScript's inference where appropriate.
- **Language:** ES Modules (`type: "module"` in `package.json`).
- **Formatting:** Managed by `prettier` (configuration in `.prettierrc`). Run `pnpm format` before committing.
- **Linting:** Managed by `eslint` (configuration in `eslint.config.js`). Ensure code passes `pnpm lint`.

### React & Components

- **Framework:** React 19, functional components only.
- **Routing:** Use `@tanstack/react-router`.
- **UI Library:** `@chakra-ui/react` (v3). Use built-in components and style props whenever possible.
- **State Management:** Use `jotai` for global state and `@rm-hull/use-local-storage` for persistence.
- **Hooks:** Custom hooks should follow the `use[Name].ts` naming convention and reside in `src/hooks/`.
- **Component Structure:**
  - Standard UI components reside in `src/components/ui/`.
  - Feature-specific components reside in their respective folders (e.g., `src/components/settings/`).
- **Imports:**
  - Use absolute paths based on `tsconfig.json` path mappings if defined, otherwise use relative paths.
  - Group imports: external, internal, styles/types.

### Error Handling

- Use `@rm-hull/chakra-error-fallback` for error boundaries.
- Use `tiny-invariant` for assertions.

### Naming Conventions

- **Components:** `PascalCase`.
- **Hooks:** `camelCase` (e.g., `useGeneralSettings`).
- **Files/Folders:** `kebab-case` for most files/folders.
- **Constants:** `UPPER_SNAKE_CASE`.

### Testing

- Use `vitest` and `@testing-library/react`.
- Prefer integration tests over unit tests for components to ensure functional correctness.
- Place tests in `src/__tests__/` or next to the file being tested (e.g., `App.test.tsx`).

## 3. Project Structure

- `src/`: Main source code.
- `src/components/`: React components.
- `src/hooks/`: Custom React hooks.
- `src/routes/`: Route definitions using TanStack Router.
- `src/services/`: API services and data fetching.
- `src/types/`: TypeScript type definitions.
- `public/`: Static assets.

Please adhere strictly to these conventions. Always run `pnpm lint` and `pnpm test` before submitting changes.
