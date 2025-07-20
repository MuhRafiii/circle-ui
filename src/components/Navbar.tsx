import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className="fixed w-full px-4 mb-4 bg-white dark:bg-zinc-900">
      <div className="flex justify-between border-b p-4">
        {isAuthenticated && (
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link to="/">Home</Link>
            </Button>
          </div>
        )}

        <div className="flex gap-4">
          {isAuthenticated ? (
            <Button onClick={logout} variant="destructive">
              Logout
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex items-end">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" className="flex items-end">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
