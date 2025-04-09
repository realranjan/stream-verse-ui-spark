
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-2 mr-4 group">
            <div className="rounded-md bg-gradient-to-br from-twitch-500 to-neon-pink p-1 flex items-center justify-center group-hover:shadow-md group-hover:shadow-twitch-500/20 transition-shadow">
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
                      "nav-link text-sm font-medium",
                      isActive ? "nav-link-active" : "text-foreground/60"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium text-foreground/60">
                    More <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer">Categories</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Live Events</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">Help & Support</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-[200px] rounded-md border border-input bg-background px-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:w-[280px] transition-all duration-300"
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleDarkMode}
            className="hover:bg-foreground/5"
          >
            {isDarkMode ? 
              <Sun className="h-5 w-5 text-yellow-400 transition-transform hover:rotate-45 duration-300" /> : 
              <Moon className="h-5 w-5 transition-transform hover:rotate-12 duration-300" />
            }
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={showNotification}
            className="hover:bg-foreground/5 relative"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-twitch-500">2</Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-foreground/5">
                <Avatar className="h-8 w-8 border border-twitch-500/50">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-twitch-500/20">CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>GameMaster</span>
                  <span className="text-xs text-muted-foreground">@gamemaster</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer"><User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
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
