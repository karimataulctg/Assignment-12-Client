import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const AdminStatistics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch statistics data
    axios.get('http://localhost:5000/admin/statistics')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
      });
  }, []);

  if (!data) return <p>Loading...</p>;

  const chartData = {
    labels: ['Accepted Products', 'Pending Products', 'Total Products', 'Total Reviews', 'Total Users'],
    datasets: [
      {
        data: [data.acceptedProducts, data.pendingProducts, data.totalProducts, data.totalReviews, data.totalUsers],
        backgroundColor: ['#4caf50', '#ffeb3b', '#2196f3', '#f44336', '#9c27b0'],
        hoverBackgroundColor: ['#66bb6a', '#ffeb3b', '#42a5f5', '#ef5350', '#ab47bc'],
      },
    ],
  };

  return (
    <div className="admin-statistics-page min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Statistics</h1>
      <div className="flex justify-center">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default AdminStatistics;
