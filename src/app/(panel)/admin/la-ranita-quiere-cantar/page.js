"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// Ilustraciones panorámicas vectoriales inspiradas en la estética de Kalandraka
// (formas orgánicas, estética de papel recortado/gouache, paletas de la naturaleza)
function SpreadIllustration({ id }) {
  switch (id) {
    case 1:
      // La ranita en la charca al amanecer
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF3D6" />
              <stop offset="45%" stopColor="#FDE68A" />
              <stop offset="70%" stopColor="#A7F3D0" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="water1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#064E3B" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#sky1)" />
          {/* Sol matinal suave */}
          <circle cx="600" cy="220" r="160" fill="#FEF08A" opacity="0.45" />
          <circle cx="600" cy="220" r="110" fill="#FEF9C3" opacity="0.6" />
          {/* Colinas de fondo */}
          <path d="M-50,380 Q250,300 550,360 T1250,340 L1250,600 L-50,600 Z" fill="#6EE7B7" opacity="0.5" />
          <path d="M-50,420 Q350,360 750,430 T1250,410 L1250,600 L-50,600 Z" fill="#10B981" opacity="0.7" />
          {/* Agua de la charca */}
          <rect y="440" width="1200" height="160" fill="url(#water1)" />
          <ellipse cx="600" cy="450" rx="550" ry="25" fill="#34D399" opacity="0.3" />
          {/* Juncos a los lados */}
          <path d="M60,600 C80,480 50,360 70,240 C65,360 40,480 30,600 Z" fill="#047857" />
          <path d="M90,600 C115,460 95,330 110,210 C100,340 80,470 65,600 Z" fill="#065F46" />
          <path d="M1120,600 C1100,470 1130,350 1110,230 C1120,350 1140,480 1150,600 Z" fill="#047857" />
          {/* Nenúfares */}
          <ellipse cx="260" cy="510" rx="140" ry="38" fill="#047857" />
          <ellipse cx="260" cy="510" rx="120" ry="30" fill="#059669" />
          <ellipse cx="940" cy="520" rx="150" ry="40" fill="#047857" />
          <ellipse cx="940" cy="520" rx="130" ry="32" fill="#059669" />
          {/* Nenúfar central donde está la ranita */}
          <ellipse cx="600" cy="525" rx="200" ry="55" fill="#065F46" />
          <ellipse cx="600" cy="525" rx="180" ry="46" fill="#10B981" />
          {/* Ranita Balú */}
          <g transform="translate(600, 470)">
            {/* Cuerpo */}
            <ellipse cx="0" cy="0" rx="42" ry="35" fill="#047857" />
            <ellipse cx="0" cy="2" rx="36" ry="28" fill="#34D399" />
            <ellipse cx="0" cy="10" rx="24" ry="18" fill="#FEF08A" opacity="0.8" />
            {/* Patas */}
            <ellipse cx="-40" cy="18" rx="16" ry="10" fill="#047857" />
            <ellipse cx="40" cy="18" rx="16" ry="10" fill="#047857" />
            {/* Ojos saltones estilo álbum ilustrado */}
            <circle cx="-18" cy="-30" r="14" fill="#047857" />
            <circle cx="-18" cy="-30" r="11" fill="white" />
            <circle cx="-16" cy="-30" r="6" fill="#0F172A" />
            <circle cx="-14" cy="-32" r="2" fill="white" />
            <circle cx="18" cy="-30" r="14" fill="#047857" />
            <circle cx="18" cy="-30" r="11" fill="white" />
            <circle cx="16" cy="-30" r="6" fill="#0F172A" />
            <circle cx="18" cy="-32" r="2" fill="white" />
            {/* Boquita sonriente abierta cantando */}
            <ellipse cx="0" cy="-6" rx="12" ry="8" fill="#991B1B" />
            <path d="M-14,-10 Q0,-4 14,-10" stroke="#047857" strokeWidth="3" fill="none" />
            {/* Notas musicales sutiles flotando */}
            <text x="35" y="-50" fontSize="24" fill="#047857" opacity="0.85" fontFamily="sans-serif">♪</text>
            <text x="60" y="-75" fontSize="30" fill="#059669" opacity="0.75" fontFamily="sans-serif">♫</text>
          </g>
        </svg>
      );

    case 2:
      // Chucuva: El tren del bosque de bambú
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <rect width="1200" height="600" fill="#E0F2FE" />
          {/* Bambúes de fondo */}
          {[120, 240, 380, 500, 700, 840, 960, 1080].map((x, i) => (
            <rect key={i} x={x} y="0" width="18" height="600" fill="#BAE6FD" opacity="0.6" />
          ))}
          {/* Colina verde */}
          <path d="M-50,440 Q600,320 1250,430 L1250,600 L-50,600 Z" fill="#6EE7B7" />
          {/* Raíles del tren */}
          <path d="M-50,470 Q600,380 1250,470" stroke="#78350F" strokeWidth="8" fill="none" />
          <path d="M-50,486 Q600,396 1250,486" stroke="#78350F" strokeWidth="8" fill="none" />
          {/* Traviesas */}
          {[50, 150, 250, 350, 450, 550, 650, 750, 850, 950, 1050, 1150].map((x, i) => (
            <line key={i} x1={x} y1="460" x2={x + 10} y2="495" stroke="#92400E" strokeWidth="7" />
          ))}
          {/* Locomotora de madera */}
          <g transform="translate(620, 360)">
            <rect x="-140" y="-40" width="110" height="70" rx="8" fill="#F97316" />
            <rect x="-30" y="-70" width="90" height="100" rx="8" fill="#0284C7" />
            <circle cx="15" cy="-25" r="22" fill="#E0F2FE" />
            {/* Chimenea */}
            <path d="M-120,-40 L-100,-75 L-80,-75 L-60,-40 Z" fill="#1E293B" />
            {/* Nubes de vapor rítmicas (de dos en dos) */}
            <circle cx="-90" cy="-95" r="16" fill="white" opacity="0.9" />
            <circle cx="-120" cy="-125" r="24" fill="white" opacity="0.8" />
            <circle cx="-160" cy="-145" r="32" fill="white" opacity="0.6" />
            {/* Ruedas */}
            <circle cx="-95" cy="35" r="24" fill="#1E293B" />
            <circle cx="-95" cy="35" r="10" fill="#F8FAFC" />
            <circle cx="15" cy="35" r="24" fill="#1E293B" />
            <circle cx="15" cy="35" r="10" fill="#F8FAFC" />
            {/* Ranita saludando en la cabina */}
            <circle cx="15" cy="-25" r="14" fill="#10B981" />
            <circle cx="12" cy="-28" r="4" fill="white" />
            <circle cx="12" cy="-28" r="2" fill="#0F172A" />
          </g>
        </svg>
      );

    case 3:
      // Cubana: Selva tropical cálida (Modo Dórico)
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <rect width="1200" height="600" fill="#FEF3C7" />
          {/* Sol cálido */}
          <circle cx="300" cy="180" r="130" fill="#FDE68A" opacity="0.6" />
          {/* Palmeras estilizadas estilo collage */}
          <path d="M220,600 Q240,400 200,240" stroke="#78350F" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M200,240 Q130,220 70,270" stroke="#047857" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M200,240 Q210,160 170,110" stroke="#059669" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M200,240 Q280,180 320,230" stroke="#10B981" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M200,240 Q270,270 300,320" stroke="#047857" strokeWidth="12" fill="none" strokeLinecap="round" />

          {/* Palmera derecha */}
          <path d="M980,600 Q950,380 1000,220" stroke="#78350F" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M1000,220 Q920,180 870,240" stroke="#047857" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M1000,220 Q1010,140 980,80" stroke="#059669" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M1000,220 Q1090,170 1140,210" stroke="#10B981" strokeWidth="12" fill="none" strokeLinecap="round" />

          {/* Suelo de arena y hierba cálida */}
          <path d="M-50,480 Q600,420 1250,490 L1250,600 L-50,600 Z" fill="#F59E0B" opacity="0.3" />
          <path d="M-50,520 Q600,470 1250,530 L1250,600 L-50,600 Z" fill="#D97706" opacity="0.4" />
          {/* Pajarillo tropical cantando */}
          <g transform="translate(320, 210)">
            <ellipse cx="0" cy="0" rx="18" ry="12" fill="#EF4444" />
            <polygon points="15,-2 25,-4 15,-6" fill="#F59E0B" />
            <circle cx="10" cy="-4" r="2.5" fill="white" />
            <circle cx="10" cy="-4" r="1.5" fill="#0F172A" />
          </g>
        </svg>
      );

    case 4:
      // El oso bailarín: Oso gigante grácil
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <rect width="1200" height="600" fill="#F3E8FF" />
          {/* Colina violeta suave */}
          <path d="M-50,420 Q600,320 1250,440 L1250,600 L-50,600 Z" fill="#DDD6FE" />
          <path d="M-50,480 Q600,400 1250,490 L1250,600 L-50,600 Z" fill="#C4B5FD" />
          {/* El gran oso pardo en puntillas */}
          <g transform="translate(620, 360)">
            {/* Cuerpo enorme y redondeado */}
            <ellipse cx="0" cy="-40" rx="95" ry="120" fill="#78350F" />
            <ellipse cx="0" cy="-25" rx="70" ry="85" fill="#92400E" />
            {/* Cabeza del oso */}
            <circle cx="0" cy="-160" r="55" fill="#78350F" />
            {/* Hocico claro */}
            <ellipse cx="0" cy="-145" rx="28" ry="20" fill="#FDE68A" />
            <ellipse cx="0" cy="-152" rx="10" ry="7" fill="#1E293B" />
            <path d="M-8,-140 Q0,-132 8,-140" stroke="#1E293B" strokeWidth="3" fill="none" />
            {/* Ojos sonrientes */}
            <circle cx="-18" cy="-172" r="4" fill="#1E293B" />
            <circle cx="18" cy="-172" r="4" fill="#1E293B" />
            {/* Orejas redondeadas */}
            <circle cx="-42" cy="-205" r="18" fill="#78350F" />
            <circle cx="-42" cy="-205" r="10" fill="#FDE68A" />
            <circle cx="42" cy="-205" r="18" fill="#78350F" />
            <circle cx="42" cy="-205" r="10" fill="#FDE68A" />
            {/* Florecita en la oreja */}
            <circle cx="36" cy="-220" r="8" fill="#F43F5E" />
            <circle cx="36" cy="-220" r="3" fill="#FEF08A" />
            {/* Patas traseras (en puntillas bailando) */}
            <ellipse cx="-45" cy="85" rx="24" ry="14" fill="#78350F" transform="rotate(-15 -45 85)" />
            <ellipse cx="45" cy="85" rx="24" ry="14" fill="#78350F" transform="rotate(25 45 85)" />
            {/* Patas delanteras abiertas en pose de danza */}
            <ellipse cx="-90" cy="-75" rx="40" ry="16" fill="#78350F" transform="rotate(-35 -90 -75)" />
            <ellipse cx="90" cy="-75" rx="40" ry="16" fill="#78350F" transform="rotate(35 90 -75)" />
            {/* Ranita observando fascinada en una seta */}
            <g transform="translate(-160, 90)">
              <ellipse cx="0" cy="0" rx="35" ry="16" fill="#DC2626" />
              <rect x="-8" y="0" width="16" height="35" fill="#FEF2F2" />
              <circle cx="-12" cy="-5" r="4" fill="white" />
              <circle cx="14" cy="-3" r="3.5" fill="white" />
              {/* Ranita sobre la seta */}
              <ellipse cx="0" cy="-18" rx="14" ry="10" fill="#10B981" />
              <circle cx="-5" cy="-24" r="3.5" fill="white" />
              <circle cx="-5" cy="-24" r="2" fill="#0F172A" />
              <circle cx="5" cy="-24" r="3.5" fill="white" />
              <circle cx="5" cy="-24" r="2" fill="#0F172A" />
            </g>
          </g>
        </svg>
      );

    case 5:
      // Danza lidia: Lago cristalino y libélulas
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <rect width="1200" height="600" fill="#ECFEFF" />
          {/* Círculos concéntricos de agua y misterio modal */}
          <circle cx="600" cy="360" r="320" fill="#CFFAFE" opacity="0.4" />
          <circle cx="600" cy="360" r="220" fill="#A5F3FC" opacity="0.4" />
          <circle cx="600" cy="360" r="120" fill="#67E8F9" opacity="0.5" />
          {/* Libélulas flotando en ternas */}
          {[
            { x: 380, y: 220, r: -20, c: "#06B6D4" },
            { x: 600, y: 160, r: 10, c: "#0891B2" },
            { x: 820, y: 240, r: 25, c: "#06B6D4" }
          ].map((item, i) => (
            <g key={i} transform={`translate(${item.x}, ${item.y}) rotate(${item.r})`}>
              <ellipse cx="0" cy="0" rx="3" ry="24" fill={item.c} />
              <ellipse cx="-16" cy="-8" rx="18" ry="6" fill="#E0F2FE" opacity="0.8" />
              <ellipse cx="16" cy="-8" rx="18" ry="6" fill="#E0F2FE" opacity="0.8" />
              <ellipse cx="-14" cy="2" rx="14" ry="5" fill="#E0F2FE" opacity="0.7" />
              <ellipse cx="14" cy="2" rx="14" ry="5" fill="#E0F2FE" opacity="0.7" />
            </g>
          ))}
          {/* Superficie calma */}
          <ellipse cx="600" cy="520" rx="550" ry="40" fill="#0E7490" opacity="0.3" />
        </svg>
      );

    case 6:
      // Mirando el reloj: Roble centenario y reloj de cuco
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <rect width="1200" height="600" fill="#FEF2F2" />
          {/* Tronco majestuoso de roble */}
          <path d="M500,600 C520,380 480,220 540,0 L660,0 C720,220 680,380 700,600 Z" fill="#78350F" opacity="0.85" />
          {/* Follaje del roble */}
          <circle cx="600" cy="-60" r="320" fill="#15803D" opacity="0.4" />
          <circle cx="600" cy="-60" r="240" fill="#16A34A" opacity="0.5" />
          {/* Reloj de cuco artesanal tallado */}
          <g transform="translate(600, 260)">
            <rect x="-65" y="-75" width="130" height="150" rx="14" fill="#B45309" />
            <polygon points="-80,-75 0,-130 80,-75" fill="#92400E" />
            {/* Esfera del reloj */}
            <circle cx="0" cy="0" r="48" fill="#FFFBEB" />
            <circle cx="0" cy="0" r="3" fill="#1E293B" />
            {/* Manecillas */}
            <line x1="0" y1="0" x2="0" y2="-32" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <line x1="0" y1="0" x2="22" y2="0" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            {/* Péndulo de piña oscilando */}
            <line x1="0" y1="75" x2="16" y2="150" stroke="#78350F" strokeWidth="3" />
            <ellipse cx="16" cy="155" rx="12" ry="18" fill="#92400E" />
          </g>
        </svg>
      );

    case 7:
      // En la terraza: Merienda festiva con farolillos
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <rect width="1200" height="600" fill="#FFFBEB" />
          {/* Guirnalda de farolillos */}
          <path d="M50,110 Q600,230 1150,120" stroke="#78350F" strokeWidth="3" fill="none" />
          {[160, 310, 460, 600, 740, 890, 1040].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${135 + Math.sin(i * 0.9) * 25})`}>
              <ellipse cx="0" cy="0" rx="16" ry="22" fill={i % 2 === 0 ? "#F59E0B" : "#EC4899"} />
              <circle cx="0" cy="0" r="8" fill="#FEF08A" opacity="0.8" />
            </g>
          ))}
          {/* Terraza de madera */}
          <rect y="460" width="1200" height="140" fill="#B45309" opacity="0.5" />
          <rect y="480" width="1200" height="20" fill="#92400E" opacity="0.6" />
        </svg>
      );

    case 8:
      // Cumbia Balú: Atardecer festivo morado y baile
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="cumbiaSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4C1D95" />
              <stop offset="50%" stopColor="#BE185D" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#cumbiaSky)" />
          {/* Luna incipiente */}
          <circle cx="950" cy="140" r="45" fill="#FEF08A" />
          <circle cx="965" cy="135" r="40" fill="#4C1D95" />
          {/* Suelo ondulante */}
          <path d="M-50,460 Q300,420 600,470 T1250,450 L1250,600 L-50,600 Z" fill="#831843" opacity="0.8" />
          <path d="M-50,510 Q400,470 800,520 T1250,500 L1250,600 L-50,600 Z" fill="#500724" />
        </svg>
      );

    case 9:
      // Soy muy grande, soy ligero: Huella gigante vs Ranita
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <rect width="1200" height="600" fill="#EEF2FF" />
          {/* Huella gigante del oso en la tierra suave */}
          <g transform="translate(420, 320)">
            <ellipse cx="0" cy="20" rx="110" ry="85" fill="#C7D2FE" opacity="0.7" />
            <circle cx="-65" cy="-85" r="26" fill="#C7D2FE" opacity="0.7" />
            <circle cx="-22" cy="-105" r="28" fill="#C7D2FE" opacity="0.7" />
            <circle cx="25" cy="-105" r="28" fill="#C7D2FE" opacity="0.7" />
            <circle cx="70" cy="-85" r="26" fill="#C7D2FE" opacity="0.7" />
          </g>
          {/* Brizna de hierba finita con la ranita encima */}
          <g transform="translate(820, 340)">
            <path d="M0,260 Q40,120 10,-40" stroke="#10B981" strokeWidth="7" fill="none" strokeLinecap="round" />
            <ellipse cx="10" cy="-45" rx="16" ry="11" fill="#047857" />
            <circle cx="6" cy="-52" r="4" fill="white" />
            <circle cx="6" cy="-52" r="2" fill="#0F172A" />
            <circle cx="15" cy="-52" r="4" fill="white" />
            <circle cx="15" cy="-52" r="2" fill="#0F172A" />
          </g>
        </svg>
      );

    case 10:
      // La Peraleja: Fuego de campamento bajo las estrellas (Modo Frigio)
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <rect width="1200" height="600" fill="#0F172A" />
          {/* Estrellas */}
          {[
            [120, 90], [250, 140], [420, 70], [600, 110], [780, 60], [920, 130], [1080, 80],
            [180, 220], [340, 260], [860, 210], [1020, 250]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 3 : 2} fill="#FEF08A" opacity="0.8" />
          ))}
          {/* Fuego acogedor en el centro */}
          <g transform="translate(600, 440)">
            {/* Troncos cruzados */}
            <line x1="-50" y1="20" x2="50" y2="-10" stroke="#78350F" strokeWidth="14" strokeLinecap="round" />
            <line x1="-50" y1="-10" x2="50" y2="20" stroke="#92400E" strokeWidth="14" strokeLinecap="round" />
            {/* Llamas cálidas */}
            <ellipse cx="0" cy="-25" rx="45" ry="60" fill="#DC2626" opacity="0.8" />
            <ellipse cx="0" cy="-20" rx="32" ry="46" fill="#F97316" />
            <ellipse cx="0" cy="-12" rx="18" ry="30" fill="#FEF08A" />
            {/* Chispas flotando hacia el cielo */}
            <circle cx="-12" cy="-90" r="3" fill="#FDE68A" />
            <circle cx="18" cy="-120" r="2.5" fill="#FDE68A" />
            <circle cx="-6" cy="-150" r="2" fill="#FDE68A" />
          </g>
        </svg>
      );

    case 11:
      // Caballito: Trotando bajo la luna llena
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <rect width="1200" height="600" fill="#1E293B" />
          {/* Luna llena brillante */}
          <circle cx="600" cy="180" r="90" fill="#FEF08A" opacity="0.9" />
          <circle cx="600" cy="180" r="120" fill="#FEF9C3" opacity="0.2" />
          {/* Sendero empedrado */}
          <path d="M-50,490 Q600,430 1250,500 L1250,600 L-50,600 Z" fill="#334155" />
          {/* Caballito blanco trotando */}
          <g transform="translate(620, 390)">
            {/* Cuerpo */}
            <ellipse cx="0" cy="-20" rx="75" ry="45" fill="#F8FAFC" />
            {/* Cuello y cabeza */}
            <path d="M40,-35 L80,-95 L115,-85 L75,-15 Z" fill="#F8FAFC" />
            <ellipse cx="105" cy="-85" rx="18" ry="12" fill="#F8FAFC" />
            {/* Crin y cola al viento */}
            <path d="M40,-35 Q60,-75 75,-105" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M-75,-25 Q-115,-10 -120,25" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" fill="none" />
            {/* Patas en trote */}
            <line x1="-40" y1="20" x2="-55" y2="75" stroke="#F8FAFC" strokeWidth="10" strokeLinecap="round" />
            <line x1="-15" y1="20" x2="-5" y2="65" stroke="#F8FAFC" strokeWidth="10" strokeLinecap="round" />
            <line x1="25" y1="20" x2="45" y2="75" stroke="#F8FAFC" strokeWidth="10" strokeLinecap="round" />
            <line x1="50" y1="20" x2="65" y2="55" stroke="#F8FAFC" strokeWidth="10" strokeLinecap="round" />
            {/* Ranita montada en las crines */}
            <ellipse cx="65" cy="-95" rx="14" ry="10" fill="#10B981" />
            <circle cx="68" cy="-101" r="3" fill="white" />
            <circle cx="68" cy="-101" r="1.5" fill="#0F172A" />
          </g>
        </svg>
      );

    case 12:
    default:
      // Chiqui Pan: Vuelta a la charca durmiendo plácidamente
      return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
          <rect width="1200" height="600" fill="#022C22" />
          {/* Cielo estrellado sereno */}
          {[
            [150, 80], [300, 130], [500, 70], [700, 110], [900, 60], [1050, 120]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill="#A7F3D0" opacity="0.7" />
          ))}
          {/* Luna plateada reflejada */}
          <circle cx="600" cy="140" r="60" fill="#ECFDF5" opacity="0.85" />
          <ellipse cx="600" cy="460" rx="350" ry="25" fill="#064E3B" />
          {/* Gran flor de loto / nenúfar durmiente */}
          <ellipse cx="600" cy="470" rx="160" ry="42" fill="#065F46" />
          <ellipse cx="600" cy="470" rx="140" ry="34" fill="#047857" />
          {/* Pétalos suaves de la flor */}
          <path d="M530,470 Q600,410 670,470 Z" fill="#FBCFE8" opacity="0.75" />
          <path d="M550,475 Q600,430 650,475 Z" fill="#F472B6" opacity="0.6" />
          {/* Ranita durmiendo con ojitos cerrados en arco */}
          <g transform="translate(600, 452)">
            <ellipse cx="0" cy="0" rx="30" ry="20" fill="#10B981" />
            <path d="M-14,-5 Q-9,-10 -4,-5" stroke="#064E3B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M4,-5 Q9,-10 14,-5" stroke="#064E3B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M-5,5 Q0,9 5,5" stroke="#064E3B" strokeWidth="2" fill="none" />
          </g>
        </svg>
      );
  }
}

const SPREADS = [
  {
    id: 1,
    numero: 1,
    tipo: "Canción",
    titulo: "La ranita quiere cantar",
    modo: "Mayor",
    metrica: "Triple",
    conLetra: true,
    colorTema: "#10B981",
    audio: "/audios/canciones/laranitaquierecantar.mp3",
    letra: [
      "La ranita quiere cantar",
      "y sentirse bien,",
      "¿le ayudarás",
      "hoy a cantar?",
      "Sólo hay que decir “Croac”",
      "",
      "Croac, Croac, Croac… Croac, Croac, Croac…"
    ],
    textoNarrativo: "En una charca luminosa, entre hojas de agua y reflejos de sol, despierta la Ranita Balú con un cosquilleo en la garganta. ¡Tiene tantas ganas de cantar! Pero cantar sola es como un cuento sin orejas que lo escuchen: para que la música empiece a rodar, Ranita necesita emprender un viaje y encontrar amigos que respondan a su croar.",
    pedagogiaGordon: "Modo Mayor en métrica triple (sensación de balanceo fluido). Los silencios tras el 'Croac' invitan al peque a emitir su respuesta tonal en balbuceo musical.",
    juegoSugerido: "Balancea suavemente al peque. En el silencio de la canción, invítale con la mirada a decir 'Croac' o hacer una pausa atenta."
  },
  {
    id: 2,
    numero: 2,
    tipo: "Recitado",
    titulo: "Chucuva",
    modo: null,
    metrica: "Doble",
    conLetra: false,
    colorTema: "#0284C7",
    audio: "/audios/recitados/chucuva.mp3",
    letra: [],
    textoNarrativo: "—¡Chucu-chucu-va! —resuena entre los troncos. El tren del bosque se detiene justo al borde del agua. Ranita da un gran salto y sube a bordo. Las ruedas de madera marcan el paso de dos en dos, firmes y alegres. El viaje hacia lo desconocido acaba de ponerse en marcha.",
    pedagogiaGordon: "Recitado en métrica doble sin texto verbal. Al no haber palabras, el cerebro infantil enfoca el 100% de su atención en la precisión del ritmo y la pulsación regular.",
    juegoSugerido: "Juega en el regazo haciendo el movimiento del trenecito al compás de 'chucu-va', frenando en seco cuando el audio termina."
  },
  {
    id: 3,
    numero: 3,
    tipo: "Canción",
    titulo: "Cubana",
    modo: "Dórico",
    metrica: "Doble",
    conLetra: false,
    colorTema: "#D97706",
    audio: "/audios/canciones/cubana.mp3",
    letra: [],
    textoNarrativo: "El trenecito frena en una selva tibia y perfumada. El aire suena suave y lleno de sabor. Ranita siente cómo sus patitas se mueven solas: este compás tiene sabor a fruta madura y danzas bajo el sol.",
    pedagogiaGordon: "Modo Dórico (sonoridad menor con sexta mayor). Genera una cualidad luminosa y esperanzadora, alejando al oído del tópico de que los modos menores son siempre tristes.",
    juegoSugerido: "Mueve las manos como ramas mecidas por la brisa o acaricia los brazos del peque dibujando ondas continuas."
  },
  {
    id: 4,
    numero: 4,
    tipo: "Canción",
    titulo: "El oso bailarín",
    modo: "Armónico menor",
    metrica: "Doble",
    conLetra: true,
    colorTema: "#7C3AED",
    audio: "/audios/canciones/elosobailarin.mp3",
    letra: [
      "Soy un oso bailarín",
      "con una enorme voz",
      "cuando piso tiembla el mar",
      "como toda la ciudad.",
      "Y aunque soy enorme y muy feroz",
      "Cuando estoy bailando soy feliz,",
      "Y aunque soy enorme y muy feroz,",
      "cuando estoy cantando soy mejor."
    ],
    textoNarrativo: "¡BOOM, BOOM! La hierba se sacude. ¿Un terremoto? ¡No! Entre los arbustos aparece el animal más grandote de toda la comarca: un oso inmenso con voz de tormenta que, para sorpresa de Ranita, empieza a girar como una peonza con la sonrisa más dulce del mundo.",
    pedagogiaGordon: "Modo Armónico menor con carácter dramático y teatral. El contraste entre el tamaño colosal del oso y la delicadeza de su danza despierta la empatía y la modulación del movimiento corporal.",
    juegoSugerido: "Pisa fuerte como un oso gigante en los primeros versos, y ponte de puntillas con ligereza cuando canta que es feliz bailando."
  },
  {
    id: 5,
    numero: 5,
    tipo: "Canción",
    titulo: "Danza lidia",
    modo: "Lidio",
    metrica: "Triple",
    conLetra: false,
    colorTema: "#0891B2",
    audio: "/audios/canciones/danzalidia.mp3",
    letra: [],
    textoNarrativo: "Juntos, Ranita y el Oso llegan a la orilla de una laguna escondida. Una brisa mágica eleva las hojas del suelo. Todo parece flotar. Las notas suben y suben hacia el cielo como si no existiera la gravedad.",
    pedagogiaGordon: "Modo Lidio (cuarta aumentada / tritono característico). Aporta una cualidad de asombro e ingravidez sensorial única que ensancha el repertorio auditivo infantil.",
    juegoSugerido: "Lanza al aire un pañuelo de gasa o seda y observa cómo desciende flotando lentamente al ritmo de tres tiempos."
  },
  {
    id: 6,
    numero: 6,
    tipo: "Recitado",
    titulo: "Mirando el reloj",
    modo: null,
    metrica: "Triple",
    conLetra: true,
    colorTema: "#DC2626",
    audio: "/audios/recitados/mirandoelreloj.mp3",
    letra: [
      "Espero y espero",
      "mirando el reloj,",
      "Tic tac, tic tac,",
      "tic tic toc.",
      "Espero y espero",
      "con mi percusión,",
      "chi chiquichiqui chí,",
      "chi chiquichiqui chó."
    ],
    textoNarrativo: "Tic-tac, tic-tac... En lo alto del roble cuelga el reloj del tiempo. El Oso y Ranita aguardan con impaciencia. ¿Qué pasará cuando las manecillas se junten? Mientras esperan, sus manos y pechos se convierten en un tambor que acompaña los latidos de la tarde.",
    pedagogiaGordon: "Métrica triple hablada. La alternancia entre el tic-tac y la percusión fonética 'chiquichiqui' desarrolla una articulación rítmica flexible y precisa.",
    juegoSugerido: "Toca suavemente las rodillas del peque en 'Tic tac' y hazle cosquillas frotando tus palmas en 'chi chiquichiqui chí'."
  },
  {
    id: 7,
    numero: 7,
    tipo: "Canción",
    titulo: "En la terraza",
    modo: "Mixolidio",
    metrica: "Multimétrica",
    conLetra: false,
    colorTema: "#B45309",
    audio: "/audios/karaokes/K_enlaterraza.mp3",
    letra: [],
    textoNarrativo: "¡Ding-dong! La espera ha merecido la pena: es la fiesta de la merienda en la terraza del árbol. El ritmo es juguetón y travieso; cambia de paso cuando menos te lo esperas, como un gato que salta de rama en rama.",
    pedagogiaGordon: "Modo Mixolidio en multimétrica. Rompe la previsibilidad de los compases cerrados, estimulando la plasticidad del sistema auditivo en los primeros 6 años de vida.",
    juegoSugerido: "Camina por la habitación de la mano o en brazos y cambia de dirección de forma espontánea con cada giro rítmico."
  },
  {
    id: 8,
    numero: 8,
    tipo: "Canción",
    titulo: "Cumbia Balú",
    modo: "Eólico",
    metrica: "Doble",
    conLetra: false,
    colorTema: "#E11D48",
    audio: "/audios/canciones/cumbiabalu.mp3",
    letra: [],
    textoNarrativo: "La merienda da paso a la gran fiesta. Nadie puede quedarse sentado. La Cumbia Balú invita a menear las caderas, dar pasitos cortos y sonreír. Hasta el viento parece bailar entre las copas de los árboles.",
    pedagogiaGordon: "Modo Eólico con acentuación rítmica de cumbia. Estimula el control del peso corporal y la disociación motora entre tren superior e inferior.",
    juegoSugerido: "Baila juntos con pasos cortitos de cumbia, meciendo la pelvis y girando suavemente abrazados."
  },
  {
    id: 9,
    numero: 9,
    tipo: "Recitado",
    titulo: "Soy muy grande, soy ligero",
    modo: null,
    metrica: "Irregular par",
    conLetra: true,
    colorTema: "#4F46E5",
    audio: "/audios/recitados/soymuygrande,soyligero.mp3",
    letra: [
      "Soy muy grande,",
      "soy un oso,",
      "cuando piso",
      "tiembla todo.",
      "Soy pequeño,",
      "soy ligero,",
      "cuando piso",
      "hay silencio."
    ],
    textoNarrativo: "La fiesta se calma poco a poco. Oso y Ranita se sientan uno al lado del otro y juegan a mirarse: uno tan grande como una montaña; la otra tan ligera como una pompa de jabón. Dos mundos distintos que cantan la misma verdad.",
    pedagogiaGordon: "Métrica irregular par en compás asimétrico (5/8 o 7/8). Afina la discriminación de pulsos largos y cortos, base de la prosodia del lenguaje.",
    juegoSugerido: "Ábrete como un gigante con fuerza ('Soy muy grande...') y encógete de golpe como una pelotita silenciosa ('Soy pequeño...')."
  },
  {
    id: 10,
    numero: 10,
    tipo: "Canción",
    titulo: "La Peraleja",
    modo: "Frigio",
    metrica: "Triple",
    conLetra: false,
    colorTema: "#92400E",
    audio: "/audios/karaokes/K_laperaleja.mp3",
    letra: [],
    textoNarrativo: "El fuego crepita con suavidad. La noche abraza al bosque con un manto oscuro y cálido. Suena una melodía antigua y misteriosa, como las canciones que cantaban los abuelos de los abuelos junto a las brasas.",
    pedagogiaGordon: "Modo Frigio (segunda menor descendente). Conecta con la memoria auditiva ancestral y folclórica mediterránea, despertando calma y resonancia interior.",
    juegoSugerido: "Mira junto al peque una luz cálida y respira hondo acompasando el pecho con las frases musicales largas."
  },
  {
    id: 11,
    numero: 11,
    tipo: "Canción",
    titulo: "Caballito",
    modo: "Locrio",
    metrica: "Doble",
    conLetra: true,
    colorTema: "#65A30D",
    audio: "/audios/canciones/caballito.mp3",
    letra: [
      "Arre caballito,",
      "vamos rapidito",
      "que tengo que bailar,",
      "en mi cuerpecito",
      "siento todo el ritmo",
      "¡Ay! Qué risa que me da…"
    ],
    textoNarrativo: "—¡Es hora de volver a casa antes de que duerman las estrellas! —dice Ranita. Por el sendero aparece al trote un noble caballito blanco. Ranita salta a sus crines y el caballo arranca con un trote alegre y juguetón.",
    pedagogiaGordon: "Modo Locrio (el modo más inusual y disonante). Al presentarlo en un contexto alegre de trote infantil, el cerebro asimila la disonancia como una emoción musical natural sin rechazo.",
    juegoSugerido: "Sienta al peque en tus rodillas y haz el trote suave del caballito, rematando con cosquillas en '¡Ay! Qué risa que me da'."
  },
  {
    id: 12,
    numero: 12,
    tipo: "Recitado",
    titulo: "Chiqui Pan",
    modo: null,
    metrica: "Irregular impar",
    conLetra: false,
    colorTema: "#0369A1",
    audio: "/audios/recitados/chiquipan.mp3",
    letra: [],
    textoNarrativo: "Chi-qui-pan... Chi-qui-pan... El viaje ha terminado. Ranita se acurruca en su nenúfar de siempre. El agua está quieta y fresca. Su corazoncito late ahora lleno de melodías, modos y ritmos de todo el mundo. Cierra los ojos feliz: mañana habrá más canciones que cantar.",
    pedagogiaGordon: "Recitado en métrica irregular impar. Completa la matriz de los 8 modos y 4 métricas, induciendo a la relajación profunda y la interiorización musical del silencio.",
    juegoSugerido: "Caricias rítmicas con la yema de los dedos en la espalda o las plantas de los pies del peque hasta que se relaje plácidamente."
  }
];

export default function RanitaLibroAdminPage() {
  const [activeTab, setActiveTab] = useState("borrador"); // "borrador" | "matriz" | "estrategia"
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const spread = SPREADS[currentSpreadIndex];

  // Control de audio al cambiar de página
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentSpreadIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => {
        console.error("Audio play error:", err);
      });
    }
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px" }}>
      {/* Navegación de vuelta */}
      <div style={{ marginBottom: "16px" }}>
        <Link
          href="/admin"
          style={{
            color: "var(--color-cyan, #00B2E3)",
            fontWeight: "700",
            textDecoration: "none",
            fontSize: "0.95rem",
          }}
        >
          ← Volver al Panel de Control
        </Link>
      </div>

      {/* Cabecera Principal */}
      <div style={{ marginBottom: "22px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#dcfce7", color: "#166534", fontWeight: "800", fontSize: "0.85rem", padding: "4px 14px", borderRadius: "999px", marginBottom: "8px" }}>
          <span>🐸 Álbum Ilustrado Sonoro · Musicabalú</span>
          <span style={{ fontSize: "0.75rem", backgroundColor: "#bbf7d0", padding: "2px 8px", borderRadius: "999px" }}>Formato Kalandraka</span>
        </div>
        <h1 style={{ fontSize: "2.3rem", fontWeight: "900", color: "#0f172a", margin: "0 0 6px 0" }}>
          La ranita quiere cantar
        </h1>
        <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: "1.5", margin: 0 }}>
          Maqueta visual del libro sonoro: ilustración continua a doble página apaisada, 8 modos, 4 métricas y botón sonoro integrado.
        </p>
      </div>

      {/* Selector de Pestañas */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "2px solid #e2e8f0", marginBottom: "22px" }}>
        <button
          onClick={() => setActiveTab("borrador")}
          style={{
            padding: "10px 18px",
            border: "none",
            background: "none",
            borderBottom: activeTab === "borrador" ? "3px solid #10B981" : "3px solid transparent",
            color: activeTab === "borrador" ? "#065f46" : "#64748b",
            fontWeight: "800",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          📖 Maqueta del Libro (Doble Página)
        </button>
        <button
          onClick={() => setActiveTab("matriz")}
          style={{
            padding: "10px 18px",
            border: "none",
            background: "none",
            borderBottom: activeTab === "matriz" ? "3px solid #00B2E3" : "3px solid transparent",
            color: activeTab === "matriz" ? "#0369a1" : "#64748b",
            fontWeight: "800",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          🎼 Matriz Pedagógica MLT (12 Pistas)
        </button>
        <button
          onClick={() => setActiveTab("estrategia")}
          style={{
            padding: "10px 18px",
            border: "none",
            background: "none",
            borderBottom: activeTab === "estrategia" ? "3px solid #805AD5" : "3px solid transparent",
            color: activeTab === "estrategia" ? "#5b21b6" : "#64748b",
            fontWeight: "800",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          💡 Estrategia Editorial y Negocio
        </button>
      </div>

      {/* AUDIO ELEMENT OCULTO */}
      <audio
        ref={audioRef}
        src={spread.audio}
        onEnded={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />

      {/* ===================== TAB 1: MAQUETA VISUAL DEL LIBRO ===================== */}
      {activeTab === "borrador" && (
        <div>
          {/* Barra de control superior */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "14px",
            backgroundColor: "#f8fafc",
            padding: "12px 18px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            marginBottom: "20px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => setCurrentSpreadIndex(Math.max(0, currentSpreadIndex - 1))}
                disabled={currentSpreadIndex === 0}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1.5px solid #cbd5e1",
                  backgroundColor: currentSpreadIndex === 0 ? "#f1f5f9" : "white",
                  color: currentSpreadIndex === 0 ? "#94a3b8" : "#0f172a",
                  fontWeight: "700",
                  cursor: currentSpreadIndex === 0 ? "not-allowed" : "pointer"
                }}
              >
                ← Anterior
              </button>

              <span style={{ fontWeight: "800", color: "#1e293b", fontSize: "0.95rem" }}>
                Págs. {spread.numero * 2 - 1}-{spread.numero * 2} ({spread.numero} de {SPREADS.length})
              </span>

              <button
                onClick={() => setCurrentSpreadIndex(Math.min(SPREADS.length - 1, currentSpreadIndex + 1))}
                disabled={currentSpreadIndex === SPREADS.length - 1}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1.5px solid #cbd5e1",
                  backgroundColor: currentSpreadIndex === SPREADS.length - 1 ? "#f1f5f9" : "white",
                  color: currentSpreadIndex === SPREADS.length - 1 ? "#94a3b8" : "#0f172a",
                  fontWeight: "700",
                  cursor: currentSpreadIndex === SPREADS.length - 1 ? "not-allowed" : "pointer"
                }}
              >
                Siguiente →
              </button>
            </div>

            {/* Selector de miniatura directa */}
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {SPREADS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSpreadIndex(idx)}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "7px",
                    border: idx === currentSpreadIndex ? "2px solid #0f172a" : "1px solid #cbd5e1",
                    backgroundColor: idx === currentSpreadIndex ? "#0f172a" : (s.tipo === "Canción" ? "#ecfdf5" : "#f0f9ff"),
                    color: idx === currentSpreadIndex ? "white" : "#334155",
                    fontSize: "0.8rem",
                    fontWeight: "800",
                    cursor: "pointer"
                  }}
                  title={`${s.numero}. ${s.titulo}`}
                >
                  {s.numero}
                </button>
              ))}
            </div>
          </div>

          {/* EL LIBRO ABIERTO (FORMATO APAISADO, ILUSTRACIÓN CONTINUA 100% SPREAD) */}
          <div style={{
            position: "relative",
            width: "100%",
            minHeight: "560px",
            borderRadius: "26px",
            overflow: "hidden",
            boxShadow: "0 24px 50px -15px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(0,0,0,0.08)",
            backgroundColor: "#f8fafc",
            marginBottom: "32px",
            display: "flex"
          }}>
            {/* ILUSTRACIÓN PANORÁMICA DE FONDO (OCUPA LA DOBLE PÁGINA ENTERA) */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1
            }}>
              <SpreadIllustration id={spread.id} />
            </div>

            {/* SOMBRA DEL PLIEGUE CENTRAL DEL LIBRO (LOMO) */}
            <div style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: "48px",
              transform: "translateX(-50%)",
              background: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0) 100%)",
              pointerEvents: "none",
              zIndex: 10
            }} />

            {/* CAPA DE CONTENIDO: DOS PÁGINAS ENCIMA DE LA ILUSTRACIÓN */}
            <div style={{
              position: "relative",
              zIndex: 5,
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              padding: "36px 40px",
              gap: "50px"
            }}>
              {/* PÁGINA IZQUIERDA: TEXTO DE LA HISTORIA */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingRight: "10px"
              }}>
                {/* Cuadro traslúcido y elegante para la lectura */}
                <div style={{
                  backgroundColor: "rgba(255, 255, 255, 0.88)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  borderRadius: "20px",
                  padding: "30px 28px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(255, 255, 255, 0.6) inset",
                  border: "1px solid rgba(255, 255, 255, 0.65)"
                }}>
                  <p style={{
                    color: "#1e293b",
                    fontSize: "1.2rem",
                    lineHeight: "1.85",
                    margin: 0,
                    fontWeight: "500",
                    fontFamily: "Georgia, 'Times New Roman', serif"
                  }}>
                    {spread.textoNarrativo}
                  </p>
                </div>

                {/* Número de página izquierda discreto */}
                <div style={{
                  fontSize: "0.95rem",
                  fontWeight: "800",
                  color: "rgba(15, 23, 42, 0.75)",
                  textShadow: "0 1px 3px rgba(255,255,255,0.9)",
                  paddingLeft: "6px"
                }}>
                  {spread.numero * 2 - 1}
                </div>
              </div>

              {/* PÁGINA DERECHA: MÚSICA, LETRA Y BOTÓN SONORO INTEGRADO */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingLeft: "10px"
              }}>
                {/* Cuadro traslúcido elegante para la música */}
                <div style={{
                  backgroundColor: "rgba(255, 255, 255, 0.88)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  borderRadius: "20px",
                  padding: "26px 28px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(255, 255, 255, 0.6) inset",
                  border: "1px solid rgba(255, 255, 255, 0.65)"
                }}>
                  {/* Título de la obra */}
                  <h2 style={{
                    fontSize: "1.9rem",
                    fontWeight: "900",
                    color: "#0f172a",
                    margin: "0 0 6px 0",
                    fontFamily: "'Quicksand', sans-serif"
                  }}>
                    {spread.titulo}
                  </h2>

                  {/* Modo y métrica en línea limpia */}
                  <div style={{
                    fontSize: "0.95rem",
                    fontWeight: "700",
                    color: spread.colorTema,
                    marginBottom: spread.conLetra ? "18px" : "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <span>{spread.modo ? `Modo ${spread.modo}` : "Recitado"}</span>
                    <span>·</span>
                    <span>Métrica {spread.metrica}</span>
                  </div>

                  {/* Letra de la canción (solo cuando tiene letra) */}
                  {spread.conLetra && spread.letra.length > 0 && (
                    <div style={{
                      backgroundColor: "rgba(254, 243, 199, 0.45)",
                      borderRadius: "14px",
                      padding: "16px 18px",
                      marginBottom: "18px",
                      border: "1px solid rgba(253, 230, 138, 0.7)",
                      fontSize: "1.05rem",
                      fontWeight: "600",
                      color: "#1e293b",
                      lineHeight: "1.75",
                      fontFamily: "'Quicksand', sans-serif"
                    }}>
                      {spread.letra.map((line, i) => (
                        <div key={i} style={{ minHeight: line === "" ? "10px" : "auto" }}>
                          {line}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* BOTÓN FÍSICO SONORO INTEGRADO (SIN TEXTOS EXPLICATIVOS SOBRANTES) */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "6px"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {/* Pulsador redondo clásico de libro sonoro */}
                      <button
                        onClick={togglePlay}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          backgroundColor: isPlaying ? "#EF4444" : spread.colorTema,
                          border: "4px solid rgba(255, 255, 255, 0.95)",
                          boxShadow: isPlaying 
                            ? "0 0 0 6px rgba(239, 68, 68, 0.25), 0 8px 16px rgba(0,0,0,0.2)"
                            : "0 6px 16px rgba(0,0,0,0.18), inset 0 2px 4px rgba(255,255,255,0.5)",
                          color: "white",
                          fontSize: "1.45rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                          transform: isPlaying ? "scale(1.05)" : "scale(1)"
                        }}
                        title={isPlaying ? "Detener" : "Reproducir sonido"}
                      >
                        {isPlaying ? "⏹" : "🔊"}
                      </button>

                      <span style={{
                        fontSize: "0.85rem",
                        fontWeight: "700",
                        color: isPlaying ? "#DC2626" : "#64748B"
                      }}>
                        {isPlaying ? "Sonando ahora..." : "Toca para escuchar"}
                      </span>
                    </div>

                    <span style={{
                      fontSize: "0.75rem",
                      fontWeight: "800",
                      backgroundColor: "rgba(255,255,255,0.7)",
                      color: "#475569",
                      padding: "4px 10px",
                      borderRadius: "999px"
                    }}>
                      {spread.conLetra ? "Cantada" : "Melodía pura"}
                    </span>
                  </div>

                  {/* Breve guía de juego sutil para el adulto */}
                  <div style={{
                    marginTop: "16px",
                    borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                    paddingTop: "12px",
                    fontSize: "0.85rem",
                    color: "#475569",
                    lineHeight: "1.5"
                  }}>
                    <strong style={{ color: "#0f172a" }}>💡 Para jugar:</strong> {spread.juegoSugerido}
                  </div>
                </div>

                {/* Número de página derecha discreto */}
                <div style={{
                  fontSize: "0.95rem",
                  fontWeight: "800",
                  color: "rgba(15, 23, 42, 0.75)",
                  textShadow: "0 1px 3px rgba(255,255,255,0.9)",
                  textAlign: "right",
                  paddingRight: "6px"
                }}>
                  {spread.numero * 2}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: MATRIZ PEDAGÓGICA MLT ===================== */}
      {activeTab === "matriz" && (
        <div style={{ backgroundColor: "white", padding: "28px", borderRadius: "20px", border: "1.5px solid #e2e8f0" }}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "900", color: "#0f172a", margin: "0 0 8px 0" }}>
              🎼 Arquitectura Musical: 8 Modos y 4 Métricas de Gordon
            </h2>
            <p style={{ color: "#64748b", margin: 0 }}>
              El libro es un <strong>itinerario completo de enriquecimiento auditivo infantil</strong>, ofreciendo toda la variedad sintáctica recomendada por Edwin E. Gordon antes de los 6 años.
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Págs.</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Tipo</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Título</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Modo Gordon</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Métrica Gordon</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Texto / Voz</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Audio</th>
                </tr>
              </thead>
              <tbody>
                {SPREADS.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => { setCurrentSpreadIndex(s.id - 1); setActiveTab("borrador"); }}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      cursor: "pointer",
                      backgroundColor: s.id % 2 === 0 ? "#fafafa" : "white"
                    }}
                  >
                    <td style={{ padding: "12px 14px", fontWeight: "800", color: "#0f172a" }}>
                      {s.numero * 2 - 1}-{s.numero * 2}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{
                        backgroundColor: s.tipo === "Canción" ? "#dcfce7" : "#e0f2fe",
                        color: s.tipo === "Canción" ? "#166534" : "#0369a1",
                        fontSize: "0.75rem",
                        fontWeight: "800",
                        padding: "2px 8px",
                        borderRadius: "6px"
                      }}>
                        {s.tipo}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: "700", color: "#1e293b" }}>
                      {s.titulo}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      {s.modo ? (
                        <span style={{ fontWeight: "700", color: "#7e22ce" }}>{s.modo}</span>
                      ) : (
                        <span style={{ color: "#94a3b8" }}>— (Recitado)</span>
                      )}
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: "700", color: "#0369a1" }}>
                      {s.metrica}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      {s.conLetra ? (
                        <span style={{ color: "#b45309", fontWeight: "700" }}>Con letra</span>
                      ) : (
                        <span style={{ color: "#64748b" }}>Melodía pura (MLT)</span>
                      )}
                    </td>
                    <td style={{ padding: "12px 14px", color: "#10B981", fontWeight: "700" }}>
                      ✅ Disponible
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================== TAB 3: ESTRATEGIA EDITORIAL ===================== */}
      {activeTab === "estrategia" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ backgroundColor: "white", padding: "26px", borderRadius: "18px", border: "1.5px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "1.25rem", color: "#0f172a" }}>
              📚 El enfoque editorial con Kalandraka, Edelvives o Takatuka
            </h3>
            <p style={{ color: "#334155", lineHeight: "1.7", fontSize: "0.95rem" }}>
              Las editoriales infantiles cuentan con directores de arte que emparejan los textos con los ilustradores de su catálogo. Al presentarles el proyecto, lo ideal es llevarles el <strong>texto narrativo completo</strong>, los <strong>12 audios ya producidos</strong> y un <strong>storyboard descriptivo</strong> (exactamente como esta maqueta). No es necesario contratar tú a un ilustrador previo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
