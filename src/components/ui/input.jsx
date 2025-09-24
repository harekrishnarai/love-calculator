import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-2xl bg-white/70 text-charcoal placeholder-charcoal/40
        border border-beige/60 backdrop-blur-md shadow-inner
        focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage/60 ${className}`}
      {...props}
    />
  );
}
