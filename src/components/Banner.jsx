import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Parallax } from 'react-parallax';
import { AuthContext } from "../AuthProvider";
import banner from "../assets/Banner1.webp";

const Banner = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ products: 0, users: 0, upvotes: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch statistics from backend
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/admin/statistics');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setStats(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching stats:", error);
                setError('Failed to load platform statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const handleMainAction = () => {
        if (user) {
            navigate(user.isCreator ? "/submit-product" : "/allProducts");
        } else {
            navigate("/login", { state: { from: "/submit-product" } });
        }
    };

    return (
        <Parallax 
            bgImage={banner} 
            strength={500} 
            className="relative w-full" 
            style={{ height: 'calc(100vh - 90px)' }}
        >
            <div className="relative text-center px-2 flex flex-col items-center justify-center h-full">
                <div className="space-y-4 max-w-4xl px-4">
                    {user && (
                        <h2 className="text-xl font-bold text-blue-700 animate-fade-in">
                            Welcome back, {user.name}! 🎉
                        </h2>
                    )}
                    
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        {user?.isCreator ? "Showcase Your Innovation" : "Discover Tomorrow's Tech Today"}
                    </h1>

                    {/* Stats Section */}
                    {loading ? (
                        <div className="flex justify-center gap-6 mb-6">
                            {[0, 1, 2].map((i) => (
                                <div 
                                    key={i}
                                    className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm w-24 h-20 animate-pulse"
                                />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-red-300 mb-6">{error}</div>
                    ) : (
                        <div className="flex justify-center gap-6 mb-6">
                            <StatItem value={stats.totalProducts} label="Products" />
                            <StatItem value={stats.totalUsers} label="Creators" />
                            <StatItem value={stats.upvotes} label="Upvotes" />
                        </div>
                    )}

                    <p className="text-white text-sm md:text-lg mb-8 mx-auto max-w-2xl leading-relaxed">
                        {user?.isCreator 
                            ? "Launch your product to thousands of eager tech enthusiasts and get real feedback. Our platform helps you validate ideas and connect with early adopters."
                            : "Join our community of innovators and early adopters. Explore, upvote, and review the latest tech creations shaping the future of technology."}
                    </p>

                    <button
                        onClick={handleMainAction}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full 
                               transition-all duration-300 transform hover:scale-105 shadow-xl
                               flex items-center justify-center gap-2 mx-auto
                               hover:shadow-blue-500/30 active:scale-95"
                    >
                        {user 
                            ? (user.isCreator ? (
                                <>
                                    <span>🚀</span>
                                    <span>Submit New Product</span>
                                </>
                            ) : (
                                <>
                                    <span>🔍</span>
                                    <span>Explore Innovations</span>
                                </>
                            )) 
                            : "🌟 Join Our Community"}
                    </button>
                </div>
            </div>
        </Parallax>
    );
};

// StatItem Component
const StatItem = ({ value, label }) => (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-colors">
        <div className="text-2xl md:text-3xl font-bold text-blue-400">
            {value?.toLocaleString() || '0'}+
        </div>
        <div className="text-sm md:text-base text-white mt-1">{label}</div>
    </div>
);

export default Banner;