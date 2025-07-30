import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate('/home'), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-green-100 border border-green-400 text-green-700 px-8 py-6 rounded-xl text-2xl font-bold">
        Payment Successful! Thank you for your order.
      </div>
    </div>
  );
} 