import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AdBanner from "@/components/AdBanner";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <AdBanner className="absolute top-4 left-0 right-0 mx-auto max-w-2xl" />
      
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
      
      <AdBanner className="absolute bottom-4 left-0 right-0 mx-auto max-w-2xl" />
    </div>
  );
};

export default NotFound;
