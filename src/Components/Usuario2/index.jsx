"use client";

import { useState } from "react";

export default function Home() {
  const [showBox, setShowBox] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      {/* Link */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault(); // evita reload da página
          setShowBox(!showBox);
        }}
        style={{ color: "blue", cursor: "pointer" }}
      >
        Clique aqui
      </a>

      {/* Quadrado */}
      <div
        style={{
          marginTop: "10px",
          width: "150px",
          height: "150px",
          backgroundColor: "tomato",
          borderRadius: "8px",
          opacity: showBox ? 1 : 0, // controla fade
          transition: "opacity 0.5s ease-in-out", // suavidade
          pointerEvents: showBox ? "auto" : "none", // evita clicar quando invisível
        }}
      />
    </div>
  );
}
