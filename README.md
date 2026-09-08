# ExpressX.js documentation

The official developer documentation site for ExpressXjs Core and CLI. Versioned snapshots are currently published for 0.0.8 and 0.0.7, with 0.0.8 selected as the latest release. The content is reviewed against each tagged implementation and covers installation, architecture, application lifecycle, routing, dependency injection, request pipelines, responses, error handling, discovery, every CLI command, production builds, deployment practices, troubleshooting, and known limitations.

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

- `src/docs/registry.ts` — available releases plus the page and navigation structure used by routing, search, and the sidebar
- `src/docs/paths.ts` — canonical versioned URL generation
- `src/pages/docs/versions/v0_0_8` — the complete 0.0.8 documentation snapshot
- `src/pages/docs/versions/v0_0_7` — the complete 0.0.7 documentation snapshot
- `src/components/docs/DocsRouter.tsx` — version resolution, legacy redirects, and missing-version/page handling

## Documentation policy

The tagged Core and CLI source for each snapshot is authoritative. Incomplete or disconnected surfaces are identified as limitations rather than presented as supported features. When framework behavior changes, add a new version definition and content snapshot rather than modifying an older release. Update the relevant concept page, API reference, troubleshooting guidance, and limitations page together.

## Source

- Framework: <https://github.com/aymansainshy/expressXjs>
- Documentation: <https://github.com/aymansainshy/expressXjs-Documentation>

ExpressX.js is available under the MIT license.
