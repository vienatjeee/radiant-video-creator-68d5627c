
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransitionLayout from "./components/TransitionLayout";
import Index from "./pages/Index";
import VideoCreator from "./pages/VideoCreator";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <TransitionLayout>
                  <Index />
                </TransitionLayout>
              }
            />
            <Route
              path="/video"
              element={
                <TransitionLayout>
                  <ProtectedRoute>
                    <VideoCreator />
                  </ProtectedRoute>
                </TransitionLayout>
              }
            />
            <Route
              path="/gallery"
              element={
                <TransitionLayout>
                  <Gallery />
                </TransitionLayout>
              }
            />
            <Route
              path="/sign-in"
              element={
                <TransitionLayout>
                  <ProtectedRoute requireAuth={false}>
                    <SignIn />
                  </ProtectedRoute>
                </TransitionLayout>
              }
            />
            <Route
              path="/sign-up"
              element={
                <TransitionLayout>
                  <ProtectedRoute requireAuth={false}>
                    <SignUp />
                  </ProtectedRoute>
                </TransitionLayout>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route
              path="*"
              element={
                <TransitionLayout>
                  <NotFound />
                </TransitionLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
