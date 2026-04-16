import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Update cart count from localStorage
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();

    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);

    // Custom event for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex flex-row flex-wrap items-center justify-between gap-8 shadow-lg">
      {/* Logo */}
      <Link to="/" className="text-4xl font-bold hover:text-blue-200 transition border-b pb-2 border-blue-300 border-opacity-50">
        🛒 ShopApp
      </Link>

      {/* Navigation Links - Horizontal */}
      <div className="flex flex-row gap-4 items-center">
        {/* Shop Link */}
        <Link 
          to="/" 
          className="text-lg font-semibold hover:text-blue-200 transition hover:translate-x-2 transform duration-200 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          🏪 Shop
        </Link>

        {/* Cart Link */}
        <Link 
          to="/checkout" 
          className="text-lg font-semibold hover:text-blue-200 transition hover:translate-x-2 transform duration-200 px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>🛒 Cart</span>
          {cartCount > 0 && (
            <span className="bg-red-500 text-white text-sm font-bold rounded-full px-3 py-1 min-w-[30px] text-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Admin Link */}
        <Link 
          to="/admin" 
          className="text-lg font-semibold hover:text-blue-200 transition hover:translate-x-2 transform duration-200 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ⚙️ Admin
        </Link>

        {/* Orders Link */}
        <Link 
          to="/orders" 
          className="text-lg font-semibold hover:text-blue-200 transition hover:translate-x-2 transform duration-200 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          📦 Orders
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;