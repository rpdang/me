import { ImageResponse } from "next/og";

export const alt = "Robin Dang - Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f0e6",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#26221f",
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            Robin Dang
          </div>

          {/* Thread - Terracotta Horizontal Line */}
          <div
            style={{
              width: 120,
              height: 3,
              background: "#b85a32",
              marginBottom: 24,
              borderRadius: 2,
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: "#26221f",
              letterSpacing: "0.02em",
            }}
          >
            Software Engineer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
