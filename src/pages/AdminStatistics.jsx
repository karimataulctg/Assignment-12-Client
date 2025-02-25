import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const AdminStatistics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch statistics data
    axios.get('https://product-hunt-server-two.vercel.app/admin/statistics')
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
    <div className="admin-statistics-page">
      <h1 className="text-3xl font-bold  text-center">Admin Statistics</h1>
      <div className="flex justify-center items-center h-full">
        <div className="md:h-screen w-11/12 md:w-6/12"
        // style={{ height: 'calc(100vh - 20px)' }}
        >
          <Pie data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
