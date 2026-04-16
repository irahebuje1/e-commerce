import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

        {/* Success Icon */}
        <div className="text-8xl mb-6">🎉</div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mb-6 text-lg">
          Thank you for your order! We've received your purchase and will process it shortly.
        </p>

        {/* Order Details */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">What's Next?</h3>
          <ul className="text-left text-green-700 space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              You'll receive an order confirmation email
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              We'll prepare your items for shipping
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              You'll get tracking information once shipped
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            View My Orders
          </button>
        </div>

        {/* Auto Redirect Notice */}
        <p className="text-sm text-gray-500 mt-6">
          You'll be redirected to the home page in a few seconds...
        </p>

      </div>
    </div>
  );
}

export default OrderSuccess;