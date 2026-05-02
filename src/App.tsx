import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import NauticalDestocking from "./pages/NauticalDestocking";
import Strategies from "./pages/Strategies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/compte" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/produits/:id" element={<ProductDetail />} />
          <Route path="/destockage-nautique" element={<NauticalDestocking />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
