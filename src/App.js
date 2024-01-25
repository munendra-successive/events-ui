import "./App.css";
import { Suspense } from "react";
import Router from "./utils/Router";
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router />
    </Suspense>
  );
}

export default App;
