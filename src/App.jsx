import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div>
      <HelmetProvider>
        <Router>
          <RecoilRoot>
            <Header />
            <Main />
          </RecoilRoot>
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
