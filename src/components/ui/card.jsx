import React from "react";

export function Card({ className = "", children }) {
  return (
    <div className={`rounded-xl shadow-lg bg-white ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
