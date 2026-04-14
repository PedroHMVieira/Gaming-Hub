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

  const menuItems = [
    { label: "Início", path: "/", icon: <HomeIcon className="w-5 h-5" /> },
    { label: "Jogos", path: "/jogos", icon: <Gamepad2 className="w-5 h-5" /> },
    { label: "Devs", path: "/desenvolvedores", icon: <Users className="w-5 h-5" /> },
    { label: "Gêneros", path: "/generos", icon: <Tag className="w-5 h-5" /> },
    { label: "Sobre", path: "/sobre", icon: <Info className="w-5 h-5" /> },
    { label: "Contato", path: "/contato", icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <header className="bg-slate-950/80 backdrop-blur-xl shadow-2xl border-b border-white/10 sticky top-0 z-50 py-4 px-6">
      <nav className="flex items-center justify-between w-full px-4 md:px-10">

        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-purple-600 p-2.5 rounded-lg group-hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/20">
            <Gamepad2 className="text-white w-7 h-7" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-white">
            GAME<span className="text-purple-500">PORTAL</span>
          </span>
        </Link>

        <button className="md:hidden text-white p-2" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className="hidden md:flex space-x-8 items-center">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="flex items-center gap-2 text-base font-semibold text-slate-300 hover:text-purple-400 transition-all hover:scale-105"
              >
                <span className="text-purple-500/70">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}

          <div className="h-8 w-[1px] bg-white/10 mx-4" />

          <Link to="/minha-conta" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {userName && (
              <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full text-sm font-bold text-purple-400 shadow-inner">
                <User className="w-4 h-4" />
                <span>{userName.toUpperCase()}</span>
              </div>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-bold active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            SAIR
          </button>
        </ul>

        {isMenuOpen && (
          <ul className="absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 flex flex-col p-6 md:hidden z-50 animate-in slide-in-from-top duration-300">
            {menuItems.map((item) => (
              <li key={item.label} className="py-4 border-b border-white/5 last:border-none">
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 text-lg text-slate-300 font-medium"
                >
                  <span className="text-purple-500">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <button onClick={handleLogout} className="flex items-center gap-4 text-red-400 font-bold text-lg">
                <LogOut className="w-5 h-5" /> Sair da Conta
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;