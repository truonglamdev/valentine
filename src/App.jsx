import React from "react";
import AppRoutes from "./routes.jsx";
import { AudioProvider } from "./AudioContext.jsx";

const App = () => {
  return (
    <AudioProvider>
      <AppRoutes />
    </AudioProvider>
  );
};

export default App;
