
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Search, User, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ isDarkMode, toggleDarkMode }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-2 mr-4">
            <div className="rounded-md bg-twitch-500 p-1 flex items-center justify-center">
              <div className="h-6 w-6 text-white font-bold flex items-center justify-center">TV</div>
            </div>
            <span className="font-bold text-xl hidden sm:inline text-gradient">StreamVerse</span>
          </NavLink>
          
          {!isMobile && (
            <nav className="flex items-center space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium transition-colors hover:text-foreground/80",
                      isActive ? "text-twitch-500" : "text-foreground/60"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 rounded-md border border-input bg-background px-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <NavLink to="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </NavLink>
          </Button>
          
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <nav className="container border-t py-4 animate-fade-in">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "block py-3 text-base font-medium transition-colors hover:text-foreground/80",
                  isActive ? "text-twitch-500" : "text-foreground/60"
                )
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
          <div className="relative flex items-center mt-4">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-full rounded-md border border-input bg-background px-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
