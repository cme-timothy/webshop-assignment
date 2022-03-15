import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Router>
          <Header />
          <Main />
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
