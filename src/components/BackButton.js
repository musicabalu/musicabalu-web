"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "← Volver", href }) {
  const router = useRouter();
  return (
    <button
      onClick={() => href ? router.push(href) : router.back()}
      className="btn btn-ghost"
      style={{ marginBottom: "24px" }}
    >
      {label}
    </button>
  );
}
