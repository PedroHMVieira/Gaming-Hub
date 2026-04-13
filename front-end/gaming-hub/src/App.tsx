import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import Footer from "./components/components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Jogos from "./pages/Jogos";
import Desenvolvedores from "./pages/Desenvolvedores";
import Generos from "./pages/Generos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import MinhaConta from "./pages/MinhaConta";
import PrivateRoute from "./components/components/ui/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <PrivateRoute>
              <div className="flex flex-col min-h-screen bg-slate-900 text-white">
                <Header />

                <main className="flex-grow">
                  <Outlet />
                </main>

                <Footer />
              </div>
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/jogos" element={<Jogos />} />
          <Route path="/desenvolvedores" element={<Desenvolvedores />} />
          <Route path="/generos" element={<Generos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/minha-conta" element={<MinhaConta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;