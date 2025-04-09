
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useTheme } from "@/components/ThemeProvider";

// Pages
import Index from "@/pages/Index";
import Browse from "@/pages/Browse";
import Profile from "@/pages/Profile";
import StreamPage from "@/pages/StreamPage";
import NotFound from "@/pages/NotFound";
import Header from "@/components/Header";

// Preload fonts
const preloadFonts = () => {
  // Geist font
  const geist = document.createElement('link');
  geist.rel = 'stylesheet';
  geist.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(geist);
  
  // Poppins for additional styling
  const poppins = document.createElement('link');
  poppins.rel = 'stylesheet';
  poppins.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(poppins);
  
  // Playfair Display for headings
  const playfair = document.createElement('link');
  playfair.rel = 'stylesheet';
  playfair.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap';
  document.head.appendChild(playfair);
};
preloadFonts();

// Add the font to our custom CSS
const addCustomStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    h1, h2, h3, .font-heading {
      font-family: 'Playfair Display', serif;
    }
    
    .emphasis-text {
      font-family: 'Playfair Display', serif;
      font-weight: 600;
    }
    
    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }
    
    /* Better focus outlines */
    :focus {
      outline: 2px solid rgba(155, 135, 245, 0.5);
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(style);
};
addCustomStyles();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col font-poppins">
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
      <footer className="border-t py-6 bg-background/80 backdrop-blur-sm">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} StreamVerse. All rights reserved.</p>
        </div>
      </footer>
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
