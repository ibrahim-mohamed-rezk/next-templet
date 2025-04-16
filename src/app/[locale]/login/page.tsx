'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert(t('LoginFailed'));
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-2">
      <input
        type="email"
        placeholder={t('Email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder={t('Password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{t('Login')}</button>
    </form>
  );
}
