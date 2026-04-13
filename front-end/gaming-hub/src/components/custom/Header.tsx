import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Gamepad2,
  Users,
  Tag,
  Info,
  Mail,
  User,
  LogOut,
  Menu,
  X,
  Home as HomeIcon
} from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, userName, fetchUserName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserName();
  }, [fetchUserName]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate("/login", { replace: true }), 0);
  };

  // 1. Atualizamos os nomes e os paths aqui!
  const menuItems = [
    { label: "Início", path: "/", icon: <HomeIcon className="w-4 h-4" /> },
    { label: "Jogos", path: "/jogos", icon: <Gamepad2 className="w-4 h-4" /> },
    { label: "Devs", path: "/desenvolvedores", icon: <Users className="w-4 h-4" /> },
    { label: "Gêneros", path: "/generos", icon: <Tag className="w-4 h-4" /> },
    { label: "Sobre", path: "/sobre", icon: <Info className="w-4 h-4" /> },
    { label: "Contato", path: "/contato", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-slate-950/80 backdrop-blur-xl shadow-2xl border-b border-white/10 sticky top-0 z-50 py-3 px-6">
      <nav className="flex items-center justify-between max-w-7xl mx-auto w-full">

        {/* Logo - Agora com ícone de controle */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-purple-600 p-2 rounded-lg group-hover:bg-purple-500 transition-colors">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white">
            GAME<span className="text-purple-500">PORTAL</span>
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white p-2" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}

          {/* User Info & Profile */}
          <div className="h-6 w-[1px] bg-white/10 mx-2" />

          <Link to="/minha-conta" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {userName && (
              <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full text-xs font-bold text-purple-400 shadow-inner">
                <User className="w-3 h-3" />
                <span>{userName.toUpperCase()}</span>
              </div>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-bold"
          >
            <LogOut className="w-3 h-3" />
            SAIR
          </button>
        </ul>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <ul className="absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 flex flex-col p-4 md:hidden z-50 animate-in slide-in-from-top duration-300">
            {menuItems.map((item) => (
              <li key={item.label} className="py-3 border-b border-white/5 last:border-none">
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 text-slate-300"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 font-bold">
                <LogOut className="w-4 h-4" /> Sair da Conta
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;