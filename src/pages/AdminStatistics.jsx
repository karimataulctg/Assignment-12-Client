import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const AdminStatistics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://product-hunt-server-two.vercel.app/admin/statistics')
      .then(response => setData(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  if (!data) return <div className="text-center p-8">Loading statistics...</div>;

  // Chart configurations
  const pieData = {
    labels: ['Accepted', 'Pending', 'Total Products', 'Reviews', 'Users'],
    datasets: [{
      data: [data.acceptedProducts, data.pendingProducts, data.totalProducts, data.totalReviews, data.totalUsers],
      backgroundColor: ['#4CAF50', '#FFC107', '#2196F3', '#9C27B0', '#E91E63'],
    }]
  };

  const barData = {
    labels: ['Products', 'Users', 'Upvotes', 'Reviews'],
    datasets: [{
      label: 'Platform Statistics',
      data: [data.totalProducts, data.totalUsers, data.upvotes, data.totalReviews],
      backgroundColor: '#2196F3',
      borderColor: '#0D47A1',
      borderWidth: 1
    }]
  };

  // Responsive options for charts
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: window.innerWidth < 768 ? 'bottom' : 'right',
        labels: { font: { size: window.innerWidth < 768 ? 12 : 14 } }
      }
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
        Admin Dashboard
      </h1>

      {/* Charts Container */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Pie Chart */}
        <div className="w-full md:w-1/2 h-64 md:h-96 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-xl text-gray-600 font-semibold mb-4">Product Distribution</h2>
          <div className="relative h-[calc(100%-50px)]">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="w-full md:w-1/2 h-64 md:h-96 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-xl text-gray-600 font-semibold mb-4">Platform Overview</h2>
          <div className="relative h-[calc(100%-50px)]">
            <Bar 
              data={barData} 
              options={{
                ...chartOptions,
                scales: {
                  y: { 
                    beginAtZero: true,
                    ticks: { font: { size: window.innerWidth < 768 ? 10 : 12 } }
                  },
                  x: {
                    ticks: { font: { size: window.innerWidth < 768 ? 10 : 12 } }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Products" 
          value={data.totalProducts}
          color="bg-blue-100"
          textColor="text-blue-600"
        />
        <StatCard
          title="Accepted"
          value={data.acceptedProducts}
          color="bg-green-100"
          textColor="text-green-600"
        />
        <StatCard
          title="Pending"
          value={data.pendingProducts}
          color="bg-yellow-100"
          textColor="text-yellow-600"
        />
        <StatCard
          title="Total Upvotes"
          value={data.upvotes}
          color="bg-purple-100"
          textColor="text-purple-600"
        />
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, color, textColor }) => (
  <div className={`${color} p-4 rounded-lg shadow-sm`}>
    <h3 className={`text-sm ${textColor} font-medium mb-2`}>{title}</h3>
    <p className={`text-2xl ${textColor} font-bold`}>{value}</p>
  </div>
);

export default AdminStatistics;