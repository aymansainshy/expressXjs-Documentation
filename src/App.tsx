import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DocsLayout } from '@/components/layout/DocsLayout';

// Pages
import { Home } from '@/pages/Home';
import { Examples } from '@/pages/Examples';
import { Community } from '@/pages/Community';

import {
  Installation,
  Introduction,
  ProjectStructure,
  QuickStart,
} from '@/pages/docs/GettingStarted';
import {
  ApplicationLifecycle,
  ControllersRouting,
  DependencyInjection,
} from '@/pages/docs/CoreConcepts';
import {
  DiscoveryConfiguration,
  ErrorHandling,
  RequestPipeline,
  RequestResponseGuide,
} from '@/pages/docs/RuntimeGuide';
import { AutoConfigurationCache } from '@/pages/docs/AutoConfiguration';
import { CLICommands, CLIOverview, Generators } from '@/pages/docs/CLI';
import { BuildDeployment, CompleteApplication } from '@/pages/docs/Operations';
import {
  APIReference,
  LimitationsVersioning,
  Troubleshooting,
} from '@/pages/docs/Reference';

// Main Layout for non-docs pages
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Examples Page */}
        <Route
          path="/examples"
          element={
            <MainLayout>
              <Examples />
            </MainLayout>
          }
        />

        {/* Community Page */}
        <Route
          path="/community"
          element={
            <MainLayout>
              <Community />
            </MainLayout>
          }
        />

        {/* Docs Pages */}
        <Route path="/docs" element={<DocsLayout />}>
          {/* Getting started */}
          <Route index element={<Introduction />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="getting-started/installation" element={<Installation />} />
          <Route path="getting-started/quick-start" element={<QuickStart />} />
          <Route path="getting-started/project-structure" element={<ProjectStructure />} />

          {/* Core */}
          <Route path="core/application" element={<ApplicationLifecycle />} />
          <Route path="core/auto-configuration-cache" element={<AutoConfigurationCache />} />
          <Route path="core/controllers-routing" element={<ControllersRouting />} />
          <Route path="core/dependency-injection" element={<DependencyInjection />} />
          <Route path="core/request-response" element={<RequestResponseGuide />} />
          <Route path="core/request-pipeline" element={<RequestPipeline />} />
          <Route path="core/error-handling" element={<ErrorHandling />} />
          <Route path="core/discovery-configuration" element={<DiscoveryConfiguration />} />

          {/* CLI */}
          <Route path="cli" element={<CLIOverview />} />
          <Route path="cli/commands" element={<CLICommands />} />
          <Route path="cli/generators" element={<Generators />} />

          {/* Examples and operations */}
          <Route path="examples/complete-application" element={<CompleteApplication />} />
          <Route path="operations/build-deployment" element={<BuildDeployment />} />

          {/* Reference */}
          <Route path="reference/api" element={<APIReference />} />
          <Route path="reference/troubleshooting" element={<Troubleshooting />} />
          <Route path="reference/limitations" element={<LimitationsVersioning />} />

          {/* Compatibility routes for earlier documentation URLs */}
          <Route path="introduction/philosophy" element={<Introduction />} />
          <Route path="introduction/installation" element={<Installation />} />
          <Route path="overview/first-steps" element={<QuickStart />} />
          <Route path="overview/controllers" element={<ControllersRouting />} />
          <Route path="overview/providers" element={<DependencyInjection />} />
          <Route path="overview/modules" element={<ProjectStructure />} />
          <Route path="fundamentals/middleware" element={<RequestPipeline />} />
          <Route path="fundamentals/exception-filters" element={<ErrorHandling />} />
          <Route path="fundamentals/pipes" element={<RequestPipeline />} />
          <Route path="fundamentals/guards" element={<RequestPipeline />} />
          <Route path="fundamentals/interceptors" element={<RequestPipeline />} />
          <Route path="techniques/configuration" element={<DiscoveryConfiguration />} />
          <Route path="recipes/crud" element={<CompleteApplication />} />
          <Route path="recipes/deployment" element={<BuildDeployment />} />
          <Route path="faq" element={<Troubleshooting />} />
          <Route path="api-reference" element={<APIReference />} />
          <Route path="migration" element={<LimitationsVersioning />} />
          <Route path="changelog" element={<LimitationsVersioning />} />

          {/* Catch-all for docs */}
          <Route path="*" element={<Introduction />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
