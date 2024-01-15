import "./App.css";
import Router from "./components/Router";
import { UserAuthContext } from "./components";
function App() {
  return (
    <UserAuthContext>
      <Router />
    </UserAuthContext>
  );
}

export default App;
