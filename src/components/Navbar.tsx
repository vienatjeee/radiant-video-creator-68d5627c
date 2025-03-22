
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-tight hover:opacity-80 transition-opacity duration-200"
        >
          Melody
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/video" label="Create" currentPath={location.pathname} />
          <NavLink to="/gallery" label="Gallery" currentPath={location.pathname} />
          <NavLink to="/pricing" label="Pricing" currentPath={location.pathname} />
        </nav>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <p className="hidden md:block text-sm font-medium">
                Welcome, {user.name}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex gap-1" 
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden md:flex">
                <Link to="/sign-in">Sign in</Link>
              </Button>
              <Button asChild className="hidden md:flex group">
                <Link to="/sign-up">
                  Get Started
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, currentPath }) => {
  const isActive = currentPath === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "relative font-medium transition-colors hover:text-primary focus-ring rounded-md px-1 py-1.5",
        isActive ? "text-primary" : "text-foreground/80"
      )}
    >
      {label}
      {isActive && (
        <span 
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
          style={{ transform: "scaleX(0.7)", transformOrigin: "center" }}
        />
      )}
    </Link>
  );
};

export default Navbar;
