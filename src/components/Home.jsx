import { Helmet } from "react-helmet-async";
import "./Home.css";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Den bästa affären för allt - Tung Store</title>
      </Helmet>
      <h2>Välkommen till Tung Store</h2>
    </div>
  );
}

export default Home;
