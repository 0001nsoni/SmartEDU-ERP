import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Layout({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col"
    >
      {children}
    </div>
  );
}
