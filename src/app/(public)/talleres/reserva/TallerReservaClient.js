"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function TallerReservaClient({ workshops }) {
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("taller") || (workshops[0] ? workshops[0].id : "");

  const [workshopId, setWorkshopId] = useState(preselectedId);
  const [adultName, setAdultName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [childBirthDate, setChildBirthDate] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setErrorMessage("Debes aceptar el funcionamiento del aula, las normas y la política de privacidad");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/talleres/reserva-directa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshopId,
          adultName,
          email,
          phone,
          childName,
          childBirthDate,
          acceptedTerms,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Hubo un error al procesar tu inscripción. Inténtalo de nuevo.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Error de conexión. Por favor, comprueba tu conexión e inténtalo de nuevo.");
    }
  };

  const selectedWorkshop = workshops.find((w) => w.id === workshopId);

  if (status === "success") {
    return (
      <div style={{
        maxWidth: "640px",
        margin: "40px auto 80px auto",
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "40px 32px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        textAlign: "center"
      }}>
        <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "16px" }}>🎉</span>
        <h1 style={{ color: "var(--color-dark)", fontSize: "1.9rem", margin: "0 0 12px 0", fontFamily: "var(--font-heading)" }}>
          ¡Plaza confirmada con éxito!
        </h1>
        <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: "1.6", marginBottom: "24px" }}>
          Hemos registrado la inscripción de <strong>{childName}</strong> para el <strong>{selectedWorkshop?.title || "Taller de Música en Familia"}</strong>.
        </p>

        <div style={{
          backgroundColor: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "14px",
          padding: "20px",
          marginBottom: "28px",
          textAlign: "left"
        }}>
          <div style={{ fontWeight: "700", color: "#166534", marginBottom: "6px", fontSize: "1rem" }}>
            📬 Confirmación enviada a {email}
          </div>
          <p style={{ margin: "0 0 10px 0", color: "#374151", fontSize: "0.93rem", lineHeight: "1.5" }}>
            Te hemos enviado un correo con todos los detalles de la sesión y tus claves de acceso gratuitas a la web de Musicabalú.
          </p>
          <p style={{ margin: 0, color: "#15803d", fontSize: "0.88rem", fontWeight: "600" }}>
            💡 Si no lo ves en tu bandeja en 1 minuto, echa un vistazo en la carpeta de Promociones o Spam.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <Link
            href="/login"
            style={{
              display: "inline-block",
              backgroundColor: "var(--color-cyan)",
              color: "white",
              fontWeight: "800",
              padding: "14px 32px",
              borderRadius: "999px",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(0, 178, 227, 0.35)",
              fontSize: "1rem"
            }}
          >
            ▶️ Acceder a la web para escuchar las canciones
          </Link>
          <Link
            href="/"
            style={{ color: "#64748b", textDecoration: "underline", fontSize: "0.9rem", marginTop: "8px" }}
          >
            Volver a la página principal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "820px", margin: "30px auto 80px auto", padding: "0 16px" }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        border: "1px solid #e2e8f0"
      }}>
        {/* Cabecera visual */}
        <div style={{
          backgroundColor: "var(--color-yellow)",
          padding: "44px 32px 38px",
          textAlign: "center"
        }}>
          <span style={{
            display: "inline-block",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "#92400e",
            fontWeight: "800",
            fontSize: "0.85rem",
            padding: "5px 16px",
            borderRadius: "999px",
            marginBottom: "14px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}>
            🧸 Inscripción Oficial al Taller
          </span>
          <h1 style={{
            color: "var(--color-dark)",
            margin: "0 0 10px 0",
            fontSize: "clamp(1.9rem, 4vw, 2.4rem)",
            fontFamily: "var(--font-heading)",
            lineHeight: "1.2",
            fontWeight: "900"
          }}>
            Taller de Música en Familia
          </h1>
          <p style={{
            color: "#92400e",
            fontSize: "1.1rem",
            margin: 0,
            fontWeight: "600",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.5"
          }}>
            Una experiencia musical de unos 45 minutos para conectar, disfrutar y aprender jugando.
          </p>

          <p style={{
            margin: "20px auto 0 auto",
            maxWidth: "640px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            color: "#991b1b",
            fontWeight: "bold",
            fontSize: "0.98rem",
            padding: "12px 18px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid #fecaca"
          }}>
            Este taller está diseñado exclusivamente para peques de 0 a 36 meses acompañados por un adulto.
          </p>
        </div>

        {/* Sección completa de Funcionamiento y Normas */}
        <div style={{ padding: "40px 32px 20px 32px" }}>
          
          <h2 style={{ color: "var(--color-dark)", fontSize: "1.5rem", marginBottom: "16px", fontFamily: "var(--font-heading)" }}>
            Queridas familias:
          </h2>
          <p style={{ margin: "0 0 28px 0", color: "#475569", lineHeight: "1.65", fontSize: "1rem" }}>
            Gracias, gracias, gracias por venir a disfrutar con nosotros a este espacio de conexión musical. 
            Os he preparado alguna información importante para que la sesión se desarrolle de la mejor manera posible y con el mayor beneficio y disfrute para los niños.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
            
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ backgroundColor: "#f1f5f9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>✨</div>
              <p style={{ margin: 0, color: "#475569", lineHeight: "1.55", paddingTop: "8px" }}>
                La energía con la que vengáis a las clases marca la diferencia. ¡Disfrutad de ese momento y espacio familiar especial y dejaos llevar!
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ backgroundColor: "#f1f5f9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>👕</div>
              <p style={{ margin: 0, color: "#475569", lineHeight: "1.55", paddingTop: "8px" }}>
                Os recomiendo venir con ropa cómoda. Las sesiones se realizan sin calzado.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ backgroundColor: "#f1f5f9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>🤫</div>
              <p style={{ margin: 0, color: "#475569", lineHeight: "1.55", paddingTop: "8px" }}>
                En nuestras sesiones creamos un espacio no verbal. Aunque el disfrute es una máxima en nuestras clases, trabajamos contenidos musicales fundamentados en la escucha. Es muy importante que, salvo que sea totalmente necesario, tratéis de no hablar ni con vuestro peque ni con otros padres y mantener la atención. El habla distrae de la música. Entre todos buscaremos un clima mágico y especial en el que sólo nos comunicaremos musicalmente.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ backgroundColor: "#f1f5f9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>🤝</div>
              <p style={{ margin: 0, color: "#475569", lineHeight: "1.55", paddingTop: "8px" }}>
                Los padres sois responsables del bienestar de los niños en la clase y de que mantengan un comportamiento respetuoso hacia los objetos y los compañeros.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ backgroundColor: "#f1f5f9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>🕊️</div>
              <p style={{ margin: 0, color: "#475569", lineHeight: "1.55", paddingTop: "8px" }}>
                Es importante dejar al niño a su aire. No intentar presionarle para que haga algo en concreto ni corregirle. No moverle piernas o brazos para hacer ritmos ni hacer las cosas por él.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ backgroundColor: "#f1f5f9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>🏃</div>
              <p style={{ margin: 0, color: "#475569", lineHeight: "1.55", paddingTop: "8px" }}>
                No llamarle si se aleja de vosotros ni ir detrás de él. Mientras su comportamiento no sea molesto para los demás, es bueno dejarle que se mueva libremente. Él regresará al lugar de referencia cuando quiera.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ backgroundColor: "#f1f5f9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>🤍</div>
              <p style={{ margin: 0, color: "#475569", lineHeight: "1.55", paddingTop: "8px" }}>
                Si un niño comienza a gritar, llorar, correr descontroladamente, lanzar materiales a otros o impide de alguna manera el buen funcionamiento de la clase: no está haciendo nada malo :) Está siendo puro (como son los peques) y tal vez explorando los límites de una actividad tan &ldquo;lúdica&rdquo; en la que no siempre es fácil encontrar el límite. En absoluto es motivo para enfadarse con ellos ni significa que no estén disfrutando de la actividad o no puedan hacerlo. Pero sí es importante que en ese momento lo alejéis del tatami o salgáis del aula y después volváis a entrar lo antes posible.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ backgroundColor: "#f1f5f9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>🤱</div>
              <p style={{ margin: 0, color: "#475569", lineHeight: "1.55", paddingTop: "8px" }}>
                Las madres pueden sentirse libres de amamantar a sus hijos cuando quieran.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ backgroundColor: "#f1f5f9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>👨‍👩‍👧</div>
              <p style={{ margin: 0, color: "#475569", lineHeight: "1.55", paddingTop: "8px" }}>
                Los niños pueden venir acompañados sólo de un adulto (padre, madre o alguien con quien tenga un vínculo afectivo importante); en cualquier caso, quien asista a clase debe conocer nuestras normas básicas de funcionamiento y participar activamente en la sesión.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ backgroundColor: "#f1f5f9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>🎵</div>
              <p style={{ margin: 0, color: "#475569", lineHeight: "1.55", paddingTop: "8px" }}>
                Participad en todas las actividades hasta el punto en que os sintáis cómodos.
              </p>
            </div>
            
            {/* No permitido */}
            <div style={{ backgroundColor: "#fff5f5", borderLeft: "4px solid #f56565", padding: "18px 20px", borderRadius: "0 12px 12px 0", marginTop: "12px" }}>
              <strong style={{ color: "#c53030", display: "block", marginBottom: "12px", fontSize: "0.98rem" }}>
                ⚠️ EN EL AULA NO ESTÁ PERMITIDO:
              </strong>
              <ul style={{ margin: 0, paddingLeft: "20px", color: "#c53030", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.94rem" }}>
                <li>🧸 Que los niños traigan juguetes u objetos personales.</li>
                <li>📸 Hacer grabaciones o fotos.</li>
                <li>📱 Utilizar el teléfono (debe estar guardado y en silencio).</li>
                <li>🥪 Comer dentro del aula (los peques sí pueden beber agua dentro del aula, pero no sobre el tatami sino en el lugar que habilitemos para ello).</li>
              </ul>
            </div>
            
            {/* Regalo Web */}
            <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "18px 20px", borderRadius: "14px", marginTop: "10px" }}>
              <p style={{ margin: 0, color: "#166534", fontWeight: "500", fontSize: "0.95rem", lineHeight: "1.5" }}>
                🎁 <strong style={{ textDecoration: "underline" }}>La inscripción a este taller te da acceso a nuestra plataforma web</strong> en la que podrás escuchar algunas de nuestras canciones de estudio, recitados y píldoras formativas desde casa.
              </p>
            </div>

            {/* Política de Cancelación */}
            <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", padding: "18px 20px", borderRadius: "14px", marginTop: "10px", textAlign: "left" }}>
              <p style={{ margin: 0, color: "#b45309", fontSize: "0.95rem", lineHeight: "1.5" }}>
                <strong style={{ display: "block", marginBottom: "4px" }}>⚠️ Política de Cancelación:</strong>
                En caso de no asistir finalmente, el dinero no se devuelve bajo ninguna circunstancia salvo que haya un justificante médico y se haya avisado con al menos 24 horas de antelación al inicio de la sesión para poder ofrecer la plaza a otra familia.
              </p>
            </div>

            {/* Aceptación y privacidad */}
            <p style={{ margin: "10px 0 0 0", color: "#64748b", fontSize: "0.93rem", lineHeight: "1.6" }}>
              <strong>La inscripción en esta sesión supone la aceptación del funcionamiento, las normas descritas y nuestra <Link href="/legal/privacidad" target="_blank" style={{ color: "var(--color-cyan)", textDecoration: "underline" }}>Política de Privacidad</Link>.</strong> Te enviaremos por correo electrónico tu acceso a la plataforma web y las novedades o próximos talleres de Musicabalú (podrás darte de baja de estas comunicaciones en cualquier momento con un solo clic).
            </p>

          </div>
        </div>

        {/* Separador */}
        <hr style={{ border: "none", borderTop: "2px solid #f1f5f9", margin: "0" }} />

        {/* Aviso de pago en sede */}
        <div style={{
          backgroundColor: "#eff6ff",
          borderBottom: "1px solid #bfdbfe",
          padding: "18px 28px",
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
          fontSize: "0.94rem",
          color: "#1e40af",
          lineHeight: "1.55"
        }}>
          <span style={{ fontSize: "1.4rem" }}>ℹ️</span>
          <div>
            <strong>Pago gestionado con el centro colaborador:</strong> Esta inscripción es directa y no requiere pago con tarjeta en esta web, ya que el importe se abona a través de la escuela infantil asociada.
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ padding: "36px 32px" }}>
          
          <h2 style={{ color: "var(--color-dark)", fontSize: "1.45rem", margin: "0 0 20px 0", fontFamily: "var(--font-heading)" }}>
            Rellena tus datos para formalizar la plaza
          </h2>

          {/* Selector de taller */}
          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "block", fontWeight: "700", marginBottom: "8px", color: "#1e293b", fontSize: "0.95rem" }}>
              🗓️ Selecciona la sesión a la que vas a asistir *
            </label>
            <select
              value={workshopId}
              onChange={(e) => setWorkshopId(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "13px 14px",
                borderRadius: "10px",
                border: "1.5px solid #cbd5e1",
                fontSize: "0.95rem",
                color: "#1e293b",
                backgroundColor: "#f8fafc",
                outline: "none"
              }}
            >
              {workshops.map((w) => (
                <option key={w.id} value={w.id} disabled={w.isFull}>
                  {w.isFull ? "🔒 [COMPLETO] " : ""}
                  {w.title} — {w.dateText}
                </option>
              ))}
            </select>
          </div>

          {/* Datos del adulto */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontWeight: "700", marginBottom: "6px", color: "#1e293b", fontSize: "0.9rem" }}>
                Nombre del adulto acompañante *
              </label>
              <input
                type="text"
                value={adultName}
                onChange={(e) => setAdultName(e.target.value)}
                required
                placeholder="Ej. Carmen López"
                style={{
                  width: "100%",
                  padding: "11px 13px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "0.95rem",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: "700", marginBottom: "6px", color: "#1e293b", fontSize: "0.9rem" }}>
                Teléfono móvil *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Ej. 654 321 987"
                style={{
                  width: "100%",
                  padding: "11px 13px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "0.95rem",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "block", fontWeight: "700", marginBottom: "6px", color: "#1e293b", fontSize: "0.9rem" }}>
              Correo electrónico (para enviarte la confirmación y acceso web) *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tucorreo@ejemplo.com"
              style={{
                width: "100%",
                padding: "11px 13px",
                borderRadius: "10px",
                border: "1.5px solid #cbd5e1",
                fontSize: "0.95rem",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Datos del peque */}
          <div style={{
            backgroundColor: "#f8fafc",
            padding: "20px 22px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            marginBottom: "26px"
          }}>
            <h3 style={{ margin: "0 0 14px 0", fontSize: "0.98rem", color: "#0f172a", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>👶</span> Datos del peque (0 a 36 meses)
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", color: "#334155", fontSize: "0.88rem" }}>
                  Nombre del peque *
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  required
                  placeholder="Ej. Mateo"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "0.92rem",
                    backgroundColor: "white",
                    boxSizing: "border-box"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", color: "#334155", fontSize: "0.88rem" }}>
                  Fecha de nacimiento *
                </label>
                <input
                  type="text"
                  value={childBirthDate}
                  onChange={(e) => setChildBirthDate(e.target.value)}
                  required
                  placeholder="DD/MM/AAAA"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "0.92rem",
                    backgroundColor: "white",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Checkbox de aceptación */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              cursor: "pointer",
              fontSize: "0.92rem",
              color: "#334155",
              lineHeight: "1.55"
            }}>
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                required
                style={{ marginTop: "3px", width: "18px", height: "18px", flexShrink: 0, cursor: "pointer" }}
              />
              <span>
                He leído y acepto el funcionamiento de la sesión, las normas descritas en esta página y la{" "}
                <Link href="/legal/privacidad" target="_blank" style={{ color: "var(--color-cyan)", textDecoration: "underline" }}>
                  Política de Privacidad
                </Link>{" "}
                de Musicabalú.
              </span>
            </label>
          </div>

          {/* Mensaje de error */}
          {errorMessage && (
            <div style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "12px 16px",
              borderRadius: "10px",
              fontSize: "0.9rem",
              marginBottom: "20px"
            }}>
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              width: "100%",
              backgroundColor: "var(--color-pink)",
              color: "white",
              border: "none",
              padding: "16px 24px",
              borderRadius: "999px",
              fontSize: "1.1rem",
              fontWeight: "800",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              boxShadow: "0 6px 18px rgba(244, 67, 108, 0.35)",
              transition: "transform 0.15s, opacity 0.15s",
              opacity: status === "loading" ? 0.75 : 1
            }}
          >
            {status === "loading" ? "Confirmando tu plaza..." : "Confirmar mi plaza en el taller →"}
          </button>
        </form>
      </div>
    </div>
  );
}
