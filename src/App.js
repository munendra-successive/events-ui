import "./App.css";
import { Skeleton } from "./components";
import { Suspense } from "react";

import Router from "./utils/Router";
function App() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Router />
    </Suspense>
  );
}

export default App;
