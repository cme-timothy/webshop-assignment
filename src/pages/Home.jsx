import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Den bästa affären för allt - Tung Store</title>
      </Helmet>
      <h2>Välkommen till Tung Store</h2>
      <Link to="/produkter">Produkter</Link>
    </div>
  );
}

export default Home;
