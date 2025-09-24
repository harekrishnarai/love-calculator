import React from "react";

export function Card({ className = "", children }) {
  return (
    <div
      className={`relative rounded-3xl bg-white/70 backdrop-blur-xl
      border border-beige/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden ${className}`}
    >
      {/* gradient border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent
        [mask-composite:exclude]"
        style={{
          background: "linear-gradient(135deg, rgba(163,177,138,.35), rgba(242,232,207,.25), rgba(214,140,69,.35))",
          WebkitMask:
            "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          WebkitMaskComposite: "xor",
          padding: 1,
        }}
      />
      {children}
    </div>
  );
}

export function CardContent({ className = "", children }) {
  return <div className={`p-8 text-charcoal ${className}`}>{children}</div>;
}
