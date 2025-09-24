import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-2xl bg-white/70 text-charcoal placeholder-charcoal/40
        border border-beige/60 backdrop-blur-md shadow-inner
        focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage/60
        dark:bg-white/10 dark:text-white dark:placeholder-white/50 dark:border-white/10 dark:focus:ring-pink-400/50 dark:focus:border-pink-400/50 ${className}`}
      {...props}
    />
  );
}
