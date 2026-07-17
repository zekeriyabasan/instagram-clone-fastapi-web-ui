import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import AppRouter from "./routes/router";

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <AppRouter />;
}

export default App;