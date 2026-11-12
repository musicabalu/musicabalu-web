"use client";

import React, { useState, useEffect } from "react";

const DEFAULT_TEXTS = {
  circular: `Asunto: Novedad pedagógica en el aula: Entorno musical Musicabalú y ventaja exclusiva para nuestras familias 🎶

Estimadas familias:

En la Escuela Infantil EMPI siempre buscamos enriquecer el día a día de vuestros peques con experiencias de la máxima calidad pedagógica y afectiva. Por eso, nos alegra enormemente compartir con vosotras una colaboración muy especial: somos el primer centro infantil en incorporar un «Entorno Musicabalú en el aula».

¿En qué consiste este proyecto?
A través de la dirección pedagógica de Javier Muñoz (creador de Musicabalú y especialista en la Teoría del Aprendizaje Musical de Edwin Gordon), nuestro equipo de educadoras contará en el aula con un repertorio musical vivo, acústico y variado (diferentes modos, ritmos y juegos corporales), 100% libre de pantallas. Con ello acompañaremos las asambleas, los momentos de juego motor y las transiciones hacia la calma y el descanso.

Llevar la música de su aula al salón de casa
Sabemos que los niños aprenden por imitación y familiaridad. Para tender un puente entre la escuela y vuestro hogar, queremos que podáis cantar y jugar en casa con las mismas melodías que vuestro peque ya reconoce cada mañana en su clase.

Por ser familia matriculada en EMPI, disponéis de una promoción exclusiva:
• Suscripción anual completa a la plataforma Musicabalú: 29 € / año (precio estándar: 39 €/año; menos de 2,45 € al mes).
• Acceso ilimitado: Todas las canciones, recitados, juegos y píldoras prácticas con ideas para el día a día.
• Periodo de la promoción: Disponible desde el 16 de noviembre hasta el 31 de diciembre.

¿Cómo acceder?
Podéis acceder escaneando el código QR del cartel disponible en la entrada de la escuela o directamente en https://musicabalu.com/empi aplicando el cupón exclusivo: EMPI2026.

Deseamos que disfrutéis muchísimo de estas melodías compartidas en familia tanto como lo hacemos nosotras en clase.

Con mucho cariño,
El equipo educativo y de dirección de Escuela Infantil EMPI`,

  redes: `Un paso pionero por la educación musical en la primera infancia: ¡Bienvenida Escuela Infantil EMPI! 🎶👶✨

Nos hace una ilusión inmensa anunciar que EMPI se convierte en el primer centro educativo en integrar un «Entorno Musicabalú en el aula».

¿Qué significa esto?
🏫 A partir de este 16 de noviembre, todas las educadoras de EMPI contarán con acceso libre a nuestra plataforma para llenar sus aulas de música viva: melodías modales, recitados rítmicos, juegos de regazo y momentos de calma basados en la Teoría del Aprendizaje Musical de Edwin Gordon, 100% libres de pantallas.

📋 Además, durante las próximas semanas trabajaremos mano a mano con su equipo docente para co-crear la Guía de Aula de Musicabalú, adaptando cada recurso al día a día real de los más peques.

💛 Y lo más especial para sus familias:
Para que los peques puedan seguir disfrutando en casa de las mismas canciones que ya reconocen cada mañana con su seño, todas las familias matriculadas en EMPI tendrán una promoción exclusiva para acceder a la plataforma con tarifa bonificada hasta el 31 de diciembre.

Gracias a todo el equipo de @escuelainfantilempi por su confianza, su sensibilidad y su compromiso con una infancia respetuosa y musical.

¡Comenzamos a cantar juntos! 🎵

#Musicabalú #EscuelaInfantilEMPI #Murcia #EducacionInfantil #MetodoGordon #MLT #EstimulacionMusical #CrianzaRespetuosa #SinPantallas`,

  whatsapp: `¡Hola! Tras nuestra reunión de ayer, ya tenemos todo perfectamente preparado para arrancar este 16 de noviembre:

1. Os he preparado el documento formal del acuerdo en PDF con los 4 puntos que hablamos (licencia de aula, promoción de familias a 29 €, co-creación de la guía y la formación presencial de 8h).
2. Tenéis lista la circular para enviársela a vuestras familias con el cupón EMPI2026 y el cartel impreso con código QR para vuestro tablón.
3. El lunes activamos el acceso de centro para vuestras educadoras. Si os parece bien, pasamos un momento a hacernos la foto para anunciar en redes esta alianza tan bonita. ¡Muchísimas gracias por la confianza!`
};

export default function EmpiCommsEditor() {
  const [texts, setTexts] = useState(DEFAULT_TEXTS);
  const [editingKey, setEditingKey] = useState(null);
  const [draftText, setDraftText] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);
  const [savedNoticeKey, setSavedNoticeKey] = useState(null);

  // Cargar de localStorage en el montaje
  useEffect(() => {
    try {
      const loaded = { ...DEFAULT_TEXTS };
      ["circular", "redes", "whatsapp"].forEach((k) => {
        const saved = localStorage.getItem(`musicabalu_empi_text_${k}`);
        if (saved) loaded[k] = saved;
      });
      setTexts(loaded);
    } catch (e) {
      console.warn("No se pudo leer localStorage:", e);
    }
  }, []);

  const handleStartEdit = (key) => {
    setEditingKey(key);
    setDraftText(texts[key]);
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
    setDraftText("");
  };

  const handleSaveEdit = (key) => {
    const updated = { ...texts, [key]: draftText };
    setTexts(updated);
    setEditingKey(null);
    try {
      localStorage.setItem(`musicabalu_empi_text_${key}`, draftText);
    } catch (e) {
      console.warn("No se pudo guardar en localStorage:", e);
    }
    setSavedNoticeKey(key);
    setTimeout(() => {
      setSavedNoticeKey(null);
    }, 3000);
  };

  const handleReset = (key) => {
    if (confirm("¿Seguro que deseas restablecer este texto a su versión original?")) {
      const original = DEFAULT_TEXTS[key];
      setTexts((prev) => ({ ...prev, [key]: original }));
      setEditingKey(null);
      try {
        localStorage.removeItem(`musicabalu_empi_text_${key}`);
      } catch (e) {}
    }
  };

  const handleCopy = (key) => {
    navigator.clipboard.writeText(texts[key]);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const isCustomized = (key) => texts[key] !== DEFAULT_TEXTS[key];

  return (
    <div>
      {/* 1. Circular para Familias */}
      <div
        style={{
          backgroundColor: "#f0fdf4",
          border: "1.5px solid #bbf7d0",
          borderRadius: "16px",
          padding: "22px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#166534", margin: "0 0 2px" }}>
              ✉️ Circular Oficial para que EMPI envíe a sus Familias
            </h3>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#15803d" }}>
              Vía Email, TokApp o canal de WhatsApp del centro
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {savedNoticeKey === "circular" && (
              <span style={{ fontSize: "0.8rem", color: "#166534", fontWeight: "700", backgroundColor: "#dcfce7", padding: "4px 10px", borderRadius: "8px" }}>
                ✓ Guardado correctamente
              </span>
            )}
            {isCustomized("circular") && editingKey !== "circular" && (
              <button
                onClick={() => handleReset("circular")}
                title="Restablecer al texto original"
                style={{
                  background: "transparent",
                  border: "1px solid #86efac",
                  color: "#166534",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                ↺ Original
              </button>
            )}
            <button
              onClick={() => handleCopy("circular")}
              style={{
                background: "#ffffff",
                border: "1.5px solid #86efac",
                color: "#166534",
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              {copiedKey === "circular" ? "✓ ¡Copiado!" : "📋 Copiar texto"}
            </button>
            {editingKey === "circular" ? (
              <>
                <button
                  onClick={() => handleSaveEdit("circular")}
                  style={{
                    background: "#16a34a",
                    border: "none",
                    color: "#ffffff",
                    padding: "7px 16px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontWeight: "800",
                  }}
                >
                  💾 Guardar cambios
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    color: "#475569",
                    padding: "7px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  ✕ Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => handleStartEdit("circular")}
                style={{
                  background: "#166534",
                  border: "none",
                  color: "#ffffff",
                  padding: "7px 16px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                ✏️ Editar texto
              </button>
            )}
          </div>
        </div>

        {editingKey === "circular" ? (
          <div>
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              rows={16}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "0.9rem",
                color: "#1e293b",
                lineHeight: "1.65",
                fontFamily: "monospace",
                border: "2px solid #22c55e",
                outline: "none",
                boxSizing: "border-box",
                backgroundColor: "#ffffff",
              }}
            />
            <div style={{ marginTop: "8px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                onClick={handleCancelEdit}
                style={{
                  background: "#f1f5f9",
                  border: "1px solid #cbd5e1",
                  color: "#475569",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSaveEdit("circular")}
                style={{
                  background: "#16a34a",
                  border: "none",
                  color: "#ffffff",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  fontWeight: "800",
                  boxShadow: "0 2px 6px rgba(22, 163, 74, 0.25)",
                }}
              >
                💾 Guardar cambios
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "18px",
              borderRadius: "12px",
              fontSize: "0.9rem",
              color: "#1e293b",
              lineHeight: "1.65",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              border: "1px solid #dcfce7",
            }}
          >
            {texts.circular}
          </div>
        )}
      </div>

      {/* 2. Publicación en Redes Sociales */}
      <div
        style={{
          backgroundColor: "#fdf2f8",
          border: "1.5px solid #fbcfe8",
          borderRadius: "16px",
          padding: "22px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#9d174d", margin: "0 0 2px" }}>
              📸 Texto para Publicación en Redes Sociales (con foto conjunta)
            </h3>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#db2777" }}>
              Instagram (Feed + Story) con mención a @escuelainfantilempi
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {savedNoticeKey === "redes" && (
              <span style={{ fontSize: "0.8rem", color: "#9d174d", fontWeight: "700", backgroundColor: "#fce7f3", padding: "4px 10px", borderRadius: "8px" }}>
                ✓ Guardado correctamente
              </span>
            )}
            {isCustomized("redes") && editingKey !== "redes" && (
              <button
                onClick={() => handleReset("redes")}
                title="Restablecer al texto original"
                style={{
                  background: "transparent",
                  border: "1px solid #f472b6",
                  color: "#9d174d",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                ↺ Original
              </button>
            )}
            <button
              onClick={() => handleCopy("redes")}
              style={{
                background: "#ffffff",
                border: "1.5px solid #f472b6",
                color: "#9d174d",
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              {copiedKey === "redes" ? "✓ ¡Copiado!" : "📋 Copiar texto"}
            </button>
            {editingKey === "redes" ? (
              <>
                <button
                  onClick={() => handleSaveEdit("redes")}
                  style={{
                    background: "#db2777",
                    border: "none",
                    color: "#ffffff",
                    padding: "7px 16px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontWeight: "800",
                  }}
                >
                  💾 Guardar cambios
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    color: "#475569",
                    padding: "7px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  ✕ Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => handleStartEdit("redes")}
                style={{
                  background: "#9d174d",
                  border: "none",
                  color: "#ffffff",
                  padding: "7px 16px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                ✏️ Editar texto
              </button>
            )}
          </div>
        </div>

        {editingKey === "redes" ? (
          <div>
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              rows={16}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "0.9rem",
                color: "#1e293b",
                lineHeight: "1.65",
                fontFamily: "monospace",
                border: "2px solid #ec4899",
                outline: "none",
                boxSizing: "border-box",
                backgroundColor: "#ffffff",
              }}
            />
            <div style={{ marginTop: "8px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                onClick={handleCancelEdit}
                style={{
                  background: "#f1f5f9",
                  border: "1px solid #cbd5e1",
                  color: "#475569",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSaveEdit("redes")}
                style={{
                  background: "#db2777",
                  border: "none",
                  color: "#ffffff",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  fontWeight: "800",
                  boxShadow: "0 2px 6px rgba(219, 39, 119, 0.25)",
                }}
              >
                💾 Guardar cambios
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "18px",
              borderRadius: "12px",
              fontSize: "0.9rem",
              color: "#1e293b",
              lineHeight: "1.65",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              border: "1px solid #fce7f3",
            }}
          >
            {texts.redes}
          </div>
        )}
      </div>

      {/* 3. Mensaje breve para Dirección por WhatsApp */}
      <div
        style={{
          backgroundColor: "#f0f9ff",
          border: "1.5px solid #bae6fd",
          borderRadius: "16px",
          padding: "22px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0369a1", margin: "0 0 2px" }}>
              💬 Mensaje breve para Dirección (coordinación por WhatsApp)
            </h3>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#0284c7" }}>
              WhatsApp directo con la directiva de EMPI
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {savedNoticeKey === "whatsapp" && (
              <span style={{ fontSize: "0.8rem", color: "#0369a1", fontWeight: "700", backgroundColor: "#e0f2fe", padding: "4px 10px", borderRadius: "8px" }}>
                ✓ Guardado correctamente
              </span>
            )}
            {isCustomized("whatsapp") && editingKey !== "whatsapp" && (
              <button
                onClick={() => handleReset("whatsapp")}
                title="Restablecer al texto original"
                style={{
                  background: "transparent",
                  border: "1px solid #38bdf8",
                  color: "#0369a1",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                ↺ Original
              </button>
            )}
            <button
              onClick={() => handleCopy("whatsapp")}
              style={{
                background: "#ffffff",
                border: "1.5px solid #38bdf8",
                color: "#0369a1",
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              {copiedKey === "whatsapp" ? "✓ ¡Copiado!" : "📋 Copiar texto"}
            </button>
            {editingKey === "whatsapp" ? (
              <>
                <button
                  onClick={() => handleSaveEdit("whatsapp")}
                  style={{
                    background: "#0284c7",
                    border: "none",
                    color: "#ffffff",
                    padding: "7px 16px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontWeight: "800",
                  }}
                >
                  💾 Guardar cambios
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    color: "#475569",
                    padding: "7px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  ✕ Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => handleStartEdit("whatsapp")}
                style={{
                  background: "#0369a1",
                  border: "none",
                  color: "#ffffff",
                  padding: "7px 16px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                ✏️ Editar texto
              </button>
            )}
          </div>
        </div>

        {editingKey === "whatsapp" ? (
          <div>
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              rows={10}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "0.9rem",
                color: "#1e293b",
                lineHeight: "1.65",
                fontFamily: "monospace",
                border: "2px solid #0284c7",
                outline: "none",
                boxSizing: "border-box",
                backgroundColor: "#ffffff",
              }}
            />
            <div style={{ marginTop: "8px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                onClick={handleCancelEdit}
                style={{
                  background: "#f1f5f9",
                  border: "1px solid #cbd5e1",
                  color: "#475569",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSaveEdit("whatsapp")}
                style={{
                  background: "#0284c7",
                  border: "none",
                  color: "#ffffff",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  fontWeight: "800",
                  boxShadow: "0 2px 6px rgba(2, 132, 199, 0.25)",
                }}
              >
                💾 Guardar cambios
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "18px",
              borderRadius: "12px",
              fontSize: "0.9rem",
              color: "#1e293b",
              lineHeight: "1.65",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              border: "1px solid #e0f2fe",
            }}
          >
            {texts.whatsapp}
          </div>
        )}
      </div>
    </div>
  );
}
