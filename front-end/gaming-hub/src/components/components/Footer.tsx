import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Gamepad2, Mail, MapPin, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <footer className="w-full bg-slate-950/80 backdrop-blur-lg shadow-lg border-t border-white/10 rounded-t-[40px] mt-10">
      <div className="w-full py-12 px-6 md:px-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2.5 rounded-lg shadow-lg shadow-purple-500/20">
              <Gamepad2 className="text-white w-7 h-7" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-white">
              GAME<span className="text-purple-500">PORTAL</span>
            </span>
          </div>

          <div className="text-slate-400 text-sm space-y-3">
            <div className="flex items-center gap-3 hover:text-slate-200 transition-colors">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span>Av. Irmãos Pereira, 670 - Centro, Campo Mourão - PR</span>
            </div>
            <div className="flex items-center gap-3 hover:text-slate-200 transition-colors">
              <Phone className="w-4 h-4 text-purple-500" />
              <span>+55 (44) 3012-3456</span>
            </div>
            <div className="flex items-center gap-3 hover:text-slate-200 transition-colors">
              <Mail className="w-4 h-4 text-purple-500" />
              <span>suporte@gameportal.com</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-slate-300 mb-10 border-t border-white/5 pt-10">
          <div>
            <h4 className="font-bold text-white text-base mb-5 uppercase tracking-widest">Institucional</h4>
            <ul className="space-y-3 text-base">
              <li><Link to="/sobre" className="hover:text-purple-400 transition-colors">Sobre o Portal</Link></li>
              <li><Link to="/contato" className="hover:text-purple-400 transition-colors">Trabalhe Conosco</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-5 uppercase tracking-widest">Suporte</h4>
            <ul className="space-y-3 text-base">
              <li><Link to="/contato" className="hover:text-purple-400 transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/contato" className="hover:text-purple-400 transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-5 uppercase tracking-widest">Navegação</h4>
            <ul className="space-y-3 text-base">
              <li><Link to="/" className="hover:text-purple-400 transition-colors">Início</Link></li>
              <li><Link to="/jogos" className="hover:text-purple-400 transition-colors">Biblioteca de Jogos</Link></li>
              <li><Link to="/desenvolvedores" className="hover:text-purple-400 transition-colors">Desenvolvedores</Link></li>
              <li><Link to="/generos" className="hover:text-purple-400 transition-colors">Gêneros/Tags</Link></li>
              <li><Link to="/minha-conta" className="hover:text-purple-400 transition-colors">Minha Conta</Link></li>
            </ul>
          </div>
        </div>

        <button
          className="md:hidden text-white flex items-center gap-2 text-base font-bold bg-white/5 px-6 py-3 rounded-full"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" /> Menu Rápido
        </button>

        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex justify-end z-[100]">
            <div className="w-72 bg-slate-900 h-full p-10 shadow-2xl border-l border-white/10">
              <button
                className="mb-10 text-white hover:text-purple-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-10 w-10" />
              </button>
              <ul className="space-y-8 text-xl font-bold text-white">
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

      <div className="bg-purple-600 text-white text-center py-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.25em]">
          © 2026 GAMEPORTAL. Press Start to Review. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;