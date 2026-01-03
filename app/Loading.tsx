"use client";

export default function Loading() {
  return (
    <div className="spinner flex items-center justify-center gap-1.5 w-25 h-25">
      <span className="dot dot-1"></span>
      <span className="dot dot-2"></span>
      <span className="dot dot-3"></span>
    </div>
  );
}
