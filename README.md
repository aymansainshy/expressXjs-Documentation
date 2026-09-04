# ExpressX.js documentation

The official developer documentation site for ExpressX.js Core and CLI 0.0.6. The content is reviewed against the tagged implementation and covers installation, architecture, application lifecycle, routing, dependency injection, request pipelines, responses, error handling, discovery, every CLI command, production builds, deployment practices, troubleshooting, and known limitations.

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`.

## Verify

```bash
npm run lint
npm run build
npm run preview
```

## Content map

- `src/pages/docs/GettingStarted.tsx` — introduction, installation, quick start, and project structure
- `src/pages/docs/CoreConcepts.tsx` — application lifecycle, routing, and dependency injection
- `src/pages/docs/Architecture.tsx` — under-the-hood discovery, bootstrap, routing, and request-flow diagrams
- `src/pages/docs/AutoConfiguration.tsx` — auto-configuration, discovery cache, file tracking, and production mapping
- `src/pages/docs/RuntimeGuide.tsx` — request/response, pipeline, errors, discovery, and configuration
- `src/pages/docs/CLI.tsx` — CLI overview, command reference, and generators
- `src/pages/docs/Operations.tsx` — complete application and production deployment
- `src/pages/docs/Reference.tsx` — API reference, troubleshooting, limitations, and versioning
- `src/data/navigation.ts` — sidebar and search navigation

## Documentation policy

The current Core and CLI source is authoritative. Incomplete or disconnected surfaces are identified as limitations rather than presented as supported features. When framework behavior changes, update the relevant concept page, API reference, troubleshooting guidance, and limitations page together.

## Source

- Framework: <https://github.com/aymansainshy/expressXjs>
- Documentation: <https://github.com/aymansainshy/expressXjs-Documentation>

ExpressX.js is available under the MIT license.
