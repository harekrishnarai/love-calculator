import React from "react";

export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`relative inline-flex items-center justify-center px-5 py-3 rounded-2xl font-semibold text-charcoal
        bg-gradient-to-r from-sage via-beige to-terra backdrop-blur-md border border-beige/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        hover:opacity-95 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-sage/40 overflow-hidden group ${className}`}
      {...props}
    >
      {/* glossy top highlight */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/40 to-white/0 opacity-60" />
      {/* moving sheen */}
      <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 translate-x-[-120%]
        bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60
        transition-transform duration-700 ease-out group-hover:translate-x-[250%]" />
      {children}
    </button>
  );
}
