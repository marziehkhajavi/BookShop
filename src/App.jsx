import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import defaultOptions from "configs/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { Toaster } from "react-hot-toast";


function App() {
  const queryClient = new QueryClient({defaultOptions});

  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster 
            position="top-center"
            containerStyle={{
              pointerEvents: "none",
              zIndex: 9999,
            }}
            toastOptions={{
              style: {
                pointerEvents: "auto",
              }
            }}
          />
          <Router />
        </BrowserRouter>
        <ReactQueryDevtools /> 
      </QueryClientProvider>
  )
}

export default App;