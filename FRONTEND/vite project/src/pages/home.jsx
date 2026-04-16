import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/productcard';
import CategoryCard from '../components/CategoryCard';

const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '🛍️' },
  { id: 'clothes', name: 'Clothes', icon: '👕' },
  { id: 'shoes', name: 'Shoes', icon: '👟' },
  { id: 'phones', name: 'Phones', icon: '📱' },
  { id: 'television', name: 'Television', icon: '📺' },
  { id: 'headphone', name: 'Headphones', icon: '🎧' },
  { id: 'laptop', name: 'Laptop', icon: '💻' },
  { id: 'others', name: 'Others', icon: '📦' },
];

const SAMPLE_PRODUCTS = [
  // Clothes
  {
    _id: '1',
    name: 'Classic Blue T-Shirt',
    category: 'clothes',
    description: 'Comfortable cotton t-shirt',
    price: 25.99,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
  },
  {
    _id: '2',
    name: 'Black Hoodie',
    category: 'clothes',
    description: 'Warm and cozy hoodie',
    price: 59.99,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1556821552-a7a96ab5b3c4?w=400&h=400&fit=crop'
  },
  {
    _id: '3',
    name: 'Red Denim Jacket',
    category: 'clothes',
    description: 'Stylish denim jacket',
    price: 79.99,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop'
  },
  // Shoes
  {
    _id: '4',
    name: 'White Running Shoes',
    category: 'shoes',
    description: 'Lightweight and comfortable running shoes',
    price: 89.99,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'
  },
  {
    _id: '5',
    name: 'Black Leather Boots',
    category: 'shoes',
    description: 'Premium leather boots',
    price: 119.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1608256546803-ba4f8c70ae0b?w=400&h=400&fit=crop'
  },
  {
    _id: '6',
    name: 'Casual Sneakers',
    category: 'shoes',
    description: 'Trendy casual sneakers',
    price: 69.99,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1525966222134-fceba36688fa?w=400&h=400&fit=crop'
  },
  // Phones
  {
    _id: '7',
    name: 'iPhone 15 Pro',
    category: 'phones',
    description: 'Latest Apple smartphone',
    price: 999.99,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop'
  },
  {
    _id: '8',
    name: 'Samsung Galaxy S24',
    category: 'phones',
    description: 'High-performance Android phone',
    price: 899.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop'
  },
  {
    _id: '9',
    name: 'Google Pixel 8',
    category: 'phones',
    description: 'Google\'s flagship smartphone',
    price: 799.99,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1598962218827-02b2b8899da9?w=400&h=400&fit=crop'
  },
  // Television
  {
    _id: '10',
    name: '55" 4K Smart TV',
    category: 'television',
    description: '4K Ultra HD Smart Television',
    price: 599.99,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1593642532400-2682a8856f00?w=400&h=400&fit=crop'
  },
  {
    _id: '11',
    name: '65" QLED TV',
    category: 'television',
    description: 'Premium QLED display',
    price: 899.99,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
  },
  {
    _id: '12',
    name: '43" Full HD TV',
    category: 'television',
    description: 'Affordable Full HD Television',
    price: 349.99,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1522869635100-ce306e08c5ec?w=400&h=400&fit=crop'
  },
  // Headphones
  {
    _id: '13',
    name: 'Sony WH1000XM5',
    category: 'headphone',
    description: 'Premium noise-canceling headphones',
    price: 399.99,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
  },
  {
    _id: '14',
    name: 'Apple AirPods Pro',
    category: 'headphone',
    description: 'Wireless earbuds with active noise cancellation',
    price: 249.99,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'
  },
  {
    _id: '15',
    name: 'Bose QuietComfort',
    category: 'headphone',
    description: 'Professional audio quality headphones',
    price: 379.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop'
  },
  // Laptop
  {
    _id: '16',
    name: 'MacBook Pro 14"',
    category: 'laptop',
    description: 'Powerful Apple laptop with M3 Pro chip',
    price: 1999.99,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'
  },
  {
    _id: '17',
    name: 'Dell XPS 13',
    category: 'laptop',
    description: 'Lightweight and portable Windows laptop',
    price: 1299.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1588405480999-a85429b86c6a?w=400&h=400&fit=crop'
  },
  {
    _id: '18',
    name: 'Lenovo ThinkPad',
    category: 'laptop',
    description: 'Business-class laptop',
    price: 899.99,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=400&fit=crop'
  },
  // Others
  {
    _id: '19',
    name: 'Portable Power Bank',
    category: 'others',
    description: '20000mAh portable charger',
    price: 29.99,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop'
  },
  {
    _id: '20',
    name: 'USB Charging Cable',
    category: 'others',
    description: 'Fast charging USB cable',
    price: 15.99,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop'
  },
  {
    _id: '21',
    name: 'Wireless Mouse',
    category: 'others',
    description: 'Ergonomic wireless mouse',
    price: 39.99,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop'
  },
];

function Home() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length > 0 || Object.keys(cart).length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }, [cart]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch {
        console.log('Using sample products');
      }
    };
    fetchProducts();
  }, []);

 
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.product._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };


  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Filter products by category
  const getFilteredProducts = () => {
    if (selectedCategory === 'all') return products;
    return products.filter((product) => product.category === selectedCategory);
  };

  const filteredProducts = getFilteredProducts();
  const categoriesWithCounts = CATEGORIES.map((category) => ({
    ...category,
    productCount:
      category.id === 'all'
        ? products.length
        : products.filter((product) => product.category === category.id).length,
  }));

  return (
    <div className="flex flex-col lg:flex-row gap-8">

      {/* Products Section */}
      <div className="flex-1">
        {/* Categories Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📂 Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoriesWithCounts.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isActive={selectedCategory === category.id}
                onSelectCategory={setSelectedCategory}
              />
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🛍️ Products</h2>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products available in this category. Add some from the Admin panel!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-full lg:w-80">
        <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🛒 Cart</h2>

          {/* Cart Items */}
          {cart.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">Your cart is empty</p>
          ) : (
            <ul className="space-y-3 mb-4">
              {cart.map((item) => (
                <li key={item.product._id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium text-gray-700">{item.product.name}</p>
                    <p className="text-gray-400">x{item.quantity} — ${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Total */}
          <div className="border-t pt-4 mb-4">
            <p className="text-gray-700 font-semibold text-sm">
              Total: <span className="text-blue-600 text-lg">${totalPrice.toFixed(2)}</span>
            </p>
          </div>

          {/* Place Order Button */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;
