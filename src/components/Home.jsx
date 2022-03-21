import "./Home.css";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import productData from "../data/productData";

function Home() {
  const [products] = useState(productData);

  return (
    <div>
      <Helmet>
        <title>Den bästa affären för nya datorer - Tung Store</title>
      </Helmet>
      <h2>Välkommen till Tung Store</h2>
      <img className="home-img" src={products[0].pic} alt="En bild på en dator" />
      <p className="store-info">
        Lorem ipsum dolor sit amet consectetur adipiscing elit vel venenatis
        condimentum auctor pulvinar sed justo, gravida malesuada aliquet ac id
        sodales semper cursus tortor dui curae senectus mollis. Justo libero
        bibendum commodo orci nulla neque donec lorem ligula mollis facilisi,
        venenatis euismod nascetur placerat vulputate vestibulum eget
        condimentum hendrerit interdum. Tortor magnis posuere aliquet vel
        laoreet ad, inceptos commodo libero sapien sit ullamcorper, cum aptent
        fusce cras et. Praesent erat integer viverra cum leo congue rhoncus
        luctus porta dolor cubilia, laoreet nibh tortor convallis ac facilisis
        sollicitudin id consectetur lacinia dui, suscipit tempor maecenas mollis
        suspendisse tincidunt metus tempus sed cras.
        {<div className="product-info-end">
        {
          <Link className="link-to-product-page" to="/produkter">
            Ta en titt på våra fina produkter
          </Link>
        }
        {<p className="smileyface">☻</p>} </div> }
      </p>
    </div>
  );
}

export default Home;
