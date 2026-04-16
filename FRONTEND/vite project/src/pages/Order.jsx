import { useEffect, useState } from 'react';
import API from '../api/axios';

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-600',
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

 
  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await API.delete(`/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  // Toggle order details
  const toggleExpand = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📦 Orders</h2>
        <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
          {orders.length} Total Orders
        </span>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-12 text-center">
          <p className="text-4xl mb-3">🛒</p>
          <p className="text-gray-400 text-lg">No orders yet.</p>
          <p className="text-gray-400 text-sm mt-1">Orders will appear here once customers place them.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow overflow-hidden">

              {/* Order Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-4">

                {/* Left: Customer Info */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                    {order.customerName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{order.customerName}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Middle: Total & Status */}
                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-blue-600 font-bold text-lg">
                    ${Number(order.totalPrice).toFixed(2)}
                  </p>

                  {/* Status Dropdown */}
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 ${STATUS_COLORS[order.status]}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleExpand(order._id)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    {expandedOrder === order._id ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Expanded Order Details */}
              {expandedOrder === order._id && (
                <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Order Items</p>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Product Image */}
                          <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                            {item.product?.image ? (
                              <img
                                src={item.product.image}
                                alt={item.product?.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-lg">📦</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {item.product?.name || 'Product Deleted'}
                            </p>
                            <p className="text-xs text-gray-400">
                              ${Number(item.product?.price || 0).toFixed(2)} each
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-700">
                            x{item.quantity}
                          </p>
                          <p className="text-xs text-blue-600 font-medium">
                            ${(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between">
                    <p className="text-sm font-semibold text-gray-600">Total</p>
                    <p className="text-sm font-bold text-blue-600">
                      ${Number(order.totalPrice).toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;