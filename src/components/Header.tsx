import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Search, User, Menu, X, Moon, Sun, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ isDarkMode, toggleDarkMode }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const showNotification = () => {
    toast({
      title: "New notification",
      description: "XStreamGamer is now live!",
      duration: 3000,
    });
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-neon-grid bg-[length:20px_20px] opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-glitch-overlay opacity-10 z-0"></div>
      
      {/* Neo-brutalism header with thick border and gradient */}
      <div className="relative border-b-4 border-black bg-background/90 backdrop-blur-md z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Animated logo */}
            <NavLink to="/" className="flex items-center gap-2 mr-6 group relative">
              <div className="rounded-lg bg-cyber-gradient p-2 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 border-4 border-black shadow-lg shadow-neon-pink/30">
                <div className="h-6 w-6 text-white font-black flex items-center justify-center animate-pulse">TV</div>
              </div>
              
              {/* Text logo with animation */}
              <span className="font-black text-xl hidden sm:inline bg-clip-text text-transparent bg-cyber-gradient animate-text-rainbow group-hover:scale-105 transition-transform">
                StreamVerse
              </span>
              
              {/* Y2K decorative element */}
              <div className="absolute -right-2 -bottom-2 w-3 h-3 bg-neon-yellow rounded-full hidden sm:block"></div>
            </NavLink>
            
            {!isMobile && (
              <nav className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "nav-link text-base font-bold relative px-1 py-1 transition-all",
                        // Underline animation
                        "after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neon-pink after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
                        // Active state with 3D effect
                        isActive 
                          ? "text-foreground after:scale-x-100 after:origin-bottom-left after:bg-gradient-to-r after:from-neon-pink after:to-neon-blue" 
                          : "text-foreground/60"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 text-base font-bold text-foreground/60 group">
                      More 
                      <ChevronDown className="h-[1rem] w-[1rem] transition-transform group-hover:rotate-180 duration-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-md border-4 border-black rounded-xl animate-pop">
                    <DropdownMenuItem className="cursor-pointer text-base font-medium hover:bg-neon-pink/20 rounded-lg my-1">Categories</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-base font-medium hover:bg-neon-blue/20 rounded-lg my-1">Live Events</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-black/10" />
                    <DropdownMenuItem className="cursor-pointer text-base font-medium hover:bg-neon-green/20 rounded-lg my-1">Help & Support</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Enhanced search bar */}
            <div className="relative hidden sm:flex items-center group">
              <div className="absolute inset-0 rounded-xl border-2 border-black bg-gradient-to-r from-neon-pink/30 to-neon-blue/30 filter blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Search className="absolute left-3 h-[1rem] w-[1rem] text-foreground/60 group-hover:text-neon-pink transition-colors" />
              <input
                type="search"
                placeholder="Search..."
                className="h-10 w-[220px] rounded-xl border-2 border-black bg-card/70 backdrop-blur-sm px-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:w-[300px] transition-all duration-300 placeholder:text-foreground/40"
              />
            </div>
            
            {/* Enhanced theme toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleDarkMode}
              className="relative overflow-hidden rounded-full h-10 w-10 border-2 border-black hover:border-neon-yellow group transition-colors"
            >
              {isDarkMode ? 
                <Sun className="h-[1.25rem] w-[1.25rem] text-neon-yellow transition-all group-hover:rotate-45 group-hover:scale-125 duration-300" /> : 
                <Moon className="h-[1.25rem] w-[1.25rem] transition-all group-hover:rotate-12 group-hover:scale-125 duration-300" />
              }
              <span className="sr-only">Toggle theme</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-yellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Button>

            {/* Enhanced notification button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={showNotification}
              className="relative overflow-hidden rounded-full h-10 w-10 border-2 border-black hover:border-neon-pink group transition-colors"
            >
              <Bell className="h-[1.25rem] w-[1.25rem] transition-all group-hover:scale-125 duration-300" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-neon-pink border-2 border-black animate-pulse">2</Badge>
              <span className="sr-only">Notifications</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Button>

            {/* Enhanced user dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:bg-foreground/5 p-0">
                  <Avatar className="h-full w-full animate-float-3d">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-twitch-500/20">CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-md border-4 border-black rounded-xl animate-pop">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-black">GameMaster</span>
                    <span className="text-xs text-muted-foreground">@gamemaster</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-black/10" />
                <DropdownMenuItem className="cursor-pointer text-base font-medium hover:bg-neon-pink/20 rounded-lg my-1">
                  <User className="mr-2 h-[1rem] w-[1rem]" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-base font-medium hover:bg-neon-blue/20 rounded-lg my-1">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/10" />
                <DropdownMenuItem className="cursor-pointer text-base font-medium hover:bg-red-500/20 rounded-lg my-1">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu toggle */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative overflow-hidden rounded-full h-10 w-10 border-2 border-black transition-colors"
              >
                {mobileMenuOpen ? 
                  <X className="h-[1.25rem] w-[1.25rem] transition-all scale-125 duration-300" /> : 
                  <Menu className="h-[1.25rem] w-[1.25rem] transition-all duration-300" />
                }
                <span className="sr-only">Menu</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu with enhanced styling */}
        {isMobile && mobileMenuOpen && (
          <nav className="container border-t-4 border-black py-4 animate-reveal-left bg-card/95 backdrop-blur-md">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "block py-3 text-base font-bold transition-all rounded-lg my-1 px-3",
                    isActive 
                      ? "text-white bg-gradient-to-r from-neon-pink to-neon-blue border-l-4 border-black pl-4" 
                      : "text-foreground/70 hover:bg-foreground/5"
                  )
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="relative flex items-center mt-4">
              <Search className="absolute left-3 h-[1rem] w-[1rem] text-foreground/60" />
              <input
                type="search"
                placeholder="Search..."
                className="h-10 w-full rounded-xl border-2 border-black bg-card/70 backdrop-blur-sm px-10 text-sm"
              />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
