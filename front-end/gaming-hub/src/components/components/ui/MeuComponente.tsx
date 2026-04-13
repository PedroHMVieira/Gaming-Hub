'use client';

import { useState } from 'react';
import { Card, CardContent } from './card';
import Input from './input';
import { Button } from './button';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'A senha deve ter pelo menos 8 caracteres';
    }
    if (!/[A-Z]/.test(password)) {
      return 'A senha deve conter pelo menos uma letra maiúscula';
    }
    if (!/[0-9]/.test(password)) {
      return 'A senha deve conter pelo menos um número';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'A senha deve conter pelo menos um caractere especial (!@#$%^&*)';
    }
    return '';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setError(validatePassword(newPassword));
  };

  return (
    <Card className="w-96 p-4 shadow-lg">
      <CardContent className="flex flex-col gap-4">
        <div className="relative">
          <Input
            type={isVisible ? 'text' : 'password'}
            placeholder="Digite sua senha"
            value={password}
            onChange={handlePasswordChange}
            className={error ? 'border-red-500' : ''}
          />
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button disabled={!!error}>Confirmar</Button>
      </CardContent>
    </Card>
  );
}
