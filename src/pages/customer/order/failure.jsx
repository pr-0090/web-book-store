import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Failure() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate('/cart'), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-xl text-2xl font-bold">
        Payment Failed! Please try again or use another payment method.
      </div>
    </div>
  );
} 