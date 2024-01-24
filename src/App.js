import "./App.css";
import { Suspense } from "react";
import Router from "./utils/Router";
import { UserAuthContext } from "./modules";
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserAuthContext>
        <Router />
      </UserAuthContext>
    </Suspense>
  );
}

export default App;
