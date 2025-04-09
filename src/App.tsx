
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";

// Pages
import Index from "@/pages/Index";
import Browse from "@/pages/Browse";
import Profile from "@/pages/Profile";
import StreamPage from "@/pages/StreamPage";
import NotFound from "@/pages/NotFound";
import Header from "@/components/Header";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stream/:streamId" element={<StreamPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
