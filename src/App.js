import "./App.css";
import { Suspense } from "react";
import { Skeleton } from "antd";
import Router from "./utils/Router";
function App() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Router />
    </Suspense>
  );
}

export default App;
