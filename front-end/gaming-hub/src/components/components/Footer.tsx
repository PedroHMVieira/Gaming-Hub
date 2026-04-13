import { useState } from "react";
import { Link } from "react-router-dom";
import logoBook from "../../assets/logo-book.png";
import { Menu, X, Gamepad2, Mail, MapPin, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <footer className="w-full bg-slate-950/80 backdrop-blur-lg shadow-lg border-t border-white/10 rounded-t-[40px] mt-10">
      <div className="max-w-screen-xl mx-auto py-8 px-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          {/* Logo e Nome */}
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-xl tracking-tighter text-white">
              GAME<span className="text-purple-500">PORTAL</span>
            </span>
          </div>

          {/* Contato Rápido */}
          <div className="text-slate-400 text-xs space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-purple-500" />
              <span>Av. Irmãos Pereira, 670 - Centro, Campo Mourão - PR</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-purple-500" />
              <span>+55 (44) 3012-3456</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-purple-500" />
              <span>suporte@gameportal.com</span>
            </div>
          </div>
        </div>

        {/* Links de Navegação */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-slate-300 mb-8 border-t border-white/5 pt-8">
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre" className="hover:text-purple-400 transition-colors">Sobre o Portal</Link></li>
              <li><Link to="/contato" className="hover:text-purple-400 transition-colors">Trabalhe Conosco</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contato" className="hover:text-purple-400 transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/contato" className="hover:text-purple-400 transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-purple-400 transition-colors">Início</Link></li>
              <li><Link to="/jogos" className="hover:text-purple-400 transition-colors">Biblioteca de Jogos</Link></li>
              <li><Link to="/desenvolvedores" className="hover:text-purple-400 transition-colors">Desenvolvedores</Link></li>
              <li><Link to="/generos" className="hover:text-purple-400 transition-colors">Gêneros/Tags</Link></li>
              <li><Link to="/minha-conta" className="hover:text-purple-400 transition-colors">Minha Conta</Link></li>
            </ul>
          </div>
        </div>

        {/* Botão Mobile */}
        <button
          className="md:hidden text-white flex items-center gap-2 text-sm font-bold bg-white/5 px-4 py-2 rounded-full"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" /> Menu Rápido
        </button>

        {/* Menu Mobile Lateral */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex justify-end z-[100]">
            <div className="w-64 bg-slate-900 h-full p-8 shadow-2xl border-l border-white/10">
              <button
                className="mb-8 text-white hover:text-purple-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-8 w-8" />
              </button>
              <ul className="space-y-6 text-lg font-bold text-white">
                <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Início</Link></li>
                <li><Link to="/jogos" onClick={() => setMobileMenuOpen(false)}>Jogos</Link></li>
                <li><Link to="/desenvolvedores" onClick={() => setMobileMenuOpen(false)}>Devs</Link></li>
                <li><Link to="/generos" onClick={() => setMobileMenuOpen(false)}>Gêneros</Link></li>
                <li><Link to="/sobre" onClick={() => setMobileMenuOpen(false)}>Sobre</Link></li>
                <li><Link to="/minha-conta" onClick={() => setMobileMenuOpen(false)}>Minha Conta</Link></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Copyright Bar */}
      <div className="bg-purple-600 text-white text-center py-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
          © 2026 GAMEPORTAL. Press Start to Review. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;