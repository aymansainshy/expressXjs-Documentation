import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DocsLayout } from '@/components/layout/DocsLayout';

// Pages
import { Home } from '@/pages/Home';
import { Examples } from '@/pages/Examples';
import { Community } from '@/pages/Community';

// Docs - Introduction
import { Introduction } from '@/pages/docs/Introduction';

// Docs - Overview
import { FirstSteps, Controllers, Providers, Modules } from '@/pages/docs/Overview';

// Docs - Fundamentals
import { Middleware, ExceptionFilters, Pipes, Guards, Interceptors } from '@/pages/docs/Fundamentals';

// Docs - Techniques
import { Database, Validation, Configuration, Testing } from '@/pages/docs/Techniques';

// Docs - WebSockets
import { Gateways, Broadcasting } from '@/pages/docs/WebSockets';

// Docs - Security
import { Authentication, Authorization, CORS } from '@/pages/docs/Security';

// Docs - CLI
import { CLIOverview, Commands } from '@/pages/docs/CLI';

// Docs - FAQ & Recipes
import { FAQ } from '@/pages/docs/FAQ';
import { CRUD, Swagger, Deployment } from '@/pages/docs/Recipes';

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
          {/* Introduction */}
          <Route index element={<Introduction />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="introduction/philosophy" element={<Introduction />} />
          <Route path="introduction/installation" element={<Introduction />} />

          {/* Overview */}
          <Route path="overview/first-steps" element={<FirstSteps />} />
          <Route path="overview/controllers" element={<Controllers />} />
          <Route path="overview/providers" element={<Providers />} />
          <Route path="overview/modules" element={<Modules />} />

          {/* Fundamentals */}
          <Route path="fundamentals/middleware" element={<Middleware />} />
          <Route path="fundamentals/exception-filters" element={<ExceptionFilters />} />
          <Route path="fundamentals/pipes" element={<Pipes />} />
          <Route path="fundamentals/guards" element={<Guards />} />
          <Route path="fundamentals/interceptors" element={<Interceptors />} />

          {/* Techniques */}
          <Route path="techniques/database" element={<Database />} />
          <Route path="techniques/validation" element={<Validation />} />
          <Route path="techniques/configuration" element={<Configuration />} />
          <Route path="techniques/testing" element={<Testing />} />

          {/* WebSockets */}
          <Route path="websockets/gateways" element={<Gateways />} />
          <Route path="websockets/broadcasting" element={<Broadcasting />} />

          {/* Security */}
          <Route path="security/authentication" element={<Authentication />} />
          <Route path="security/authorization" element={<Authorization />} />
          <Route path="security/cors" element={<CORS />} />

          {/* CLI */}
          <Route path="cli" element={<CLIOverview />} />
          <Route path="cli/commands" element={<Commands />} />

          {/* Recipes */}
          <Route path="recipes/crud" element={<CRUD />} />
          <Route path="recipes/swagger" element={<Swagger />} />
          <Route path="recipes/deployment" element={<Deployment />} />

           {/* FAQ */}
          <Route path="faq" element={<FAQ />} />

          {/* Catch-all for docs */}
          <Route path="*" element={<Introduction />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
