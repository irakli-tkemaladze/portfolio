import { Routes, Route } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import { Home } from "./home";
import { About } from "./about";
import { Projects } from "./projects";
import { Contact } from "./contact";
function Wrapper() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path={"/"} exact element={<Home />} />
        <Route path={"home"}  element={<Home />} />
        <Route path={"about"} exact element={<About />} />
        <Route path={"projects"} exact element={<Projects />} />
        <Route path={"contact"} exact element={<Contact />} />
        <Route path="*" element={<Div />} />
      </Routes>

      <Footer />
    </div>
  );
}
function Div() {
  return <h1 style={{ color: "black" }}>not found</h1>;
}

export { Wrapper };
