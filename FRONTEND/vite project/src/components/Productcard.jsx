import React from 'react';

function ProductCard({ product, onAddToCart }) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Product Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {product.image && !imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-5xl">📦</span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-blue-600 font-bold text-lg">${product.price.toFixed(2)}</p>
            <p className="text-xs text-gray-400">
              {product.stock > 0 ? `${product.stock} in stock` : '❌ Out of stock'}
            </p>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;