# Localify Client

Frontend for the Localify localization platform.

## Tech Stack

- Vue 3 (Composition API)
- Vite
- TypeScript
- Pinia
- Vue Router
- Tailwind CSS

## Features

- Projects dashboard with create/edit/delete
- Translation keys management with namespaces
- Inline translation editing across languages
- Language visibility and filtering controls
- Dark mode + toast notifications
- LocalStorage persistence for mock data

## Project Structure

```text
src/
  assets/
  components/
    layout/
    projects/
    translations/
    ui/
  composables/
  data/
  router/
  services/
  stores/
  types/
  views/
```

## Setup

```bash
npm install
```

## Run (Development)

```bash
npm run dev
```

Default dev URL: `http://localhost:5173`

## Build (Production)

```bash
npm run build
npm run preview
```

## Notes

- This frontend currently uses a fake service layer + localStorage to simulate backend behavior.
- It is structured so services can be replaced with real API calls to the NestJS server.
