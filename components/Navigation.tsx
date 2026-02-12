'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Produits' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    router.push('/');
  };

  const cartItemCount = mounted ? getTotalItems() : 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-purple-500/20">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <Image
                src="/logo.png"
                alt="CPWorks"
                fill
                className="object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-300"
              />
            </div>
            <span className="text-2xl sm:text-4xl font-bold">
              <span className="text-white">CP</span>
              <span className="text-purple-500">Works</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium transition-all duration-300 hover:text-purple-400 ${
                  pathname === link.href
                    ? 'text-purple-500'
                    : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Admin Link */}
            {mounted && user?.isAdmin && (
              <Link
                href="/admin"
                className={`text-lg font-medium transition-all duration-300 hover:text-purple-400 ${
                  pathname === '/admin'
                    ? 'text-purple-500'
                    : 'text-gray-300'
                }`}
              >
                Admin
              </Link>
            )}

            {/* Cart Icon */}
            <Link href="/cart" className="relative group">
              <div className="text-2xl text-gray-300 group-hover:text-purple-400 transition-colors">
                🛒
              </div>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Login/Logout */}
            {mounted && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                      Bonjour, <span className="text-purple-400 font-semibold">{user.name}</span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-sm font-medium transition-all duration-300"
                    >
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Connexion
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="flex lg:hidden items-center gap-4">
            {/* Cart Icon Mobile */}
            <Link href="/cart" className="relative group">
              <div className="text-2xl text-gray-300 group-hover:text-purple-400 transition-colors">
                🛒
              </div>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Burger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white text-3xl focus:outline-none"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4 border-t border-purple-500/20 pt-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg font-medium transition-all duration-300 hover:text-purple-400 ${
                  pathname === link.href
                    ? 'text-purple-500'
                    : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Admin Link Mobile */}
            {mounted && user?.isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg font-medium transition-all duration-300 hover:text-purple-400 ${
                  pathname === '/admin'
                    ? 'text-purple-500'
                    : 'text-gray-300'
                }`}
              >
                Admin
              </Link>
            )}

            {/* Login/Logout Mobile */}
            {mounted && (
              <>
                {user ? (
                  <div className="space-y-3 pt-3 border-t border-purple-500/20">
                    <p className="text-sm text-gray-400">
                      Bonjour, <span className="text-purple-400 font-semibold">{user.name}</span>
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-sm font-medium transition-all duration-300"
                    >
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-center font-semibold transition-all duration-300"
                  >
                    Connexion
                  </Link>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
