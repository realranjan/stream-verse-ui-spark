
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-twitch-900/50 to-background p-4">
      <div className="text-center max-w-md glass-morphism p-8 rounded-xl shadow-2xl border border-white/10 animate-pop">
        <div className="relative mb-6">
          <div className="text-twitch-500 font-bold text-8xl mb-4 animate-float">
            404
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-20">
            <div className="w-32 h-32 rounded-full bg-twitch-500 blur-3xl animate-pulse-slow"></div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-3 font-heading animate-fade-in">Stream Not Found</h1>
        
        <p className="text-muted-foreground mb-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
          Sorry, we couldn't find the page you're looking for. The streamer might be offline or the URL might be incorrect.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up" style={{animationDelay: "0.4s"}}>
          <Link to="/">
            <Button className="bg-twitch-500 hover:bg-twitch-600 w-full sm:w-auto shadow-lg shadow-twitch-500/20">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
          
          <Link to="/browse">
            <Button variant="outline" className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Browse Streams
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 animate-fade-in" style={{animationDelay: "0.6s"}}>
          <Button variant="ghost" onClick={() => window.history.back()} className="text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-3 w-3" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
