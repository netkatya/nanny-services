"use client";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50">
      <div className="spinner flex items-center justify-center gap-1.5">
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
      </div>
    </div>
  );
}
