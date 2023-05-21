## Getting Started

First, install the all the dependencies:

```bash
yarn install

```

Second, run the development server:

```bash
yarn dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Top 3 degisn choices/trade-offs

1. Server-side Rendering (SSR) vs. Client-side Rendering (CSR):The reason that I chose Next.js over other framwework e.g. React or Vanilla is that Next.js supports both server-side rendering and client-side rendering approaches. SSR renders the initial HTML on the server, which can provide better performance for SEO and initial page load times. On the other hand, CSR allows for more dynamic and interactive experiences by rendering content on the client-side using JavaScript. When making this choice, consider the balance between initial load performance and interactivity. SSR might be preferred for static pages or content that needs to be visible to search engines, while CSR can be useful for complex interactivity and frequent updates.

2. API Routes vs. External APIs: Next.js provides API Routes, which allow you to build API endpoints directly within your Next.js app. These routes can handle both backend and frontend requests, making it convenient to consolidate API logic within the same codebase.

3. Code Organization and Modularity: As your Next.js app grows, maintaining a well-organized and modular codebase becomes crucial. Consider using a modular folder structure, where I separate different concerns such as components, pages, API routes, and utilities. This helps improve code readability, maintainability, and collaboration.
