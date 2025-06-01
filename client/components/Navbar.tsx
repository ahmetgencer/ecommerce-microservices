'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="w-full p-4 bg-gray-100 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-xl font-bold">MyShop</Link>

      <div className="space-x-4">
        {token ? (
          <>
            <Link href="/products">Products</Link>
            <button onClick={logout} className="text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
