
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-twitch-500 font-bold text-7xl mb-4">404</div>
        <h1 className="text-2xl font-bold mb-2">Stream Not Found</h1>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find the page you're looking for. The streamer might be offline or the URL might be incorrect.
        </p>
        <Link to="/">
          <Button className="bg-twitch-500 hover:bg-twitch-600">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
