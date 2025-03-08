
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Index from "./pages/Index";
import LessonForm from "./pages/LessonForm";
import PreviewEdit from "./pages/PreviewEdit";
import PDFView from "./pages/PDFView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Initialize AdSense
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({
          google_ad_client: "ca-pub-6062398972709628",
          enable_page_level_ads: true
        });
        console.log("AdSense initialization pushed");
      }
    } catch (error) {
      console.error("AdSense initialization error:", error);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" richColors closeButton />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/form" element={<LessonForm />} />
              <Route path="/preview" element={<PreviewEdit />} />
              <Route path="/pdf" element={<PDFView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
