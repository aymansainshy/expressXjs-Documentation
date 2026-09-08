import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DocsRouter } from '@/components/docs/DocsRouter';

// Pages
import { Home } from '@/pages/Home';
import { Examples } from '@/pages/Examples';
import { Community } from '@/pages/Community';

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

        {/* Versioned docs and redirects for earlier unversioned URLs */}
        <Route path="/docs/*" element={<DocsRouter />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
