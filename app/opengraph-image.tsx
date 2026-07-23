import { ImageResponse } from "next/og";

export const alt = "Robin Dang - Co-Founder & CTO @ Loonar";
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
          background: "linear-gradient(135deg, #b85a32 0%, #822e3a 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

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
              color: "#f5f0e6",
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            Robin Dang
          </div>

          {/* Divider */}
          <div
            style={{
              width: 120,
              height: 3,
              background: "#f5f0e6",
              opacity: 0.6,
              marginBottom: 24,
              borderRadius: 2,
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "#f5f0e6",
              opacity: 0.9,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Co-Founder & CTO
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 20,
              color: "#f5f0e6",
              opacity: 0.7,
              marginTop: 16,
            }}
          >
            Loonar • Uber • Booking.com
          </div>
        </div>

        {/* Domain in corner */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 50,
            fontSize: 18,
            color: "#f5f0e6",
            opacity: 0.6,
            fontWeight: 500,
          }}
        >
          robindang.me
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
