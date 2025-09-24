import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${className}`}
      {...props}
    />
  );
}
