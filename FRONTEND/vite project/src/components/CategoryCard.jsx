import React from 'react';

function CategoryCard({ category, onSelectCategory, isActive }) {
  return (
    <div
      onClick={() => onSelectCategory(category.id)}
      className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition transform hover:scale-105 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-white text-gray-800 shadow-md hover:shadow-lg'
      }`}
    >
      <div className="text-4xl mb-2">{category.icon}</div>
      <p className="font-semibold text-center text-sm">{category.name}</p>
      <p
        className={`mt-1 text-xs ${
          isActive ? 'text-blue-100' : 'text-gray-500'
        }`}
      >
        {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
      </p>
    </div>
  );
}

export default CategoryCard;
