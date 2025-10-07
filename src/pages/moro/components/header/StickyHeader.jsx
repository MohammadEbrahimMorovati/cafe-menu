import { useEffect, useState } from "react";
import { useTheme } from "../../../../contexts/useTheme";
import TextType from "../ui/TextType";
import Wave from "react-wavify";

const ABOUT_URL = "http://caffee.workingserverlite.eu:8888/api/v1/cafes/moro/about/";

function extractName(d) {
  const direct =
    d?.name ||
    d?.title ||
    d?.cafe_name ||
    d?.heading ||
    d?.site_name ||
    d?.cafe?.name ||
    d?.owner?.cafe_name;
  if (typeof direct === "string" && direct.trim()) return direct.trim();

  const html = d?.body || d?.content || d?.about || d?.description;
  if (typeof html === "string" && html.trim()) {
    try {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const h1 = doc.querySelector("h1")?.textContent?.trim();
      if (h1) return h1;
    } catch {}
    const m = html.match(/^\s*#\s+(.+)$/m); // تیتر مارک‌داون
    if (m?.[1]) return m[1].trim();
  }
  return null;
}

export default function StickyHeader() {
  const { theme } = useTheme();
  const [cafeName, setCafeName] = useState("کافه");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(ABOUT_URL, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCafeName(extractName(data) || "کافه");
      } catch (e) {
        console.error("About fetch failed:", e);
      }
    })();
  }, []);

  return (
    <div className="relative pt-4 mb-8 overflow-hidden">
      <Wave
        fill={theme.secondary_color}
        paused={false}
        options={{ height: 40, amplitude: 40, speed: 0.25, points: 3 }}
        className="absolute top-0 left-0 w-full h-32 scale-y-[-1]"
      />
      <div className="relative max-w-2xl mx-auto px-4 z-10">
        <div className="flex flex-col items-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-2 shadow-md"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="text-3xl" style={{ color: theme.primary_color }}>
              ☕
            </div>
          </div>
          {/* key باعث میشه متن بعد از دریافت name جدید دوباره تایپ بشه */}
          <TextType
            key={cafeName}
            text={[
              `منوی ${cafeName}`,
              "برای سفارش کلیک کنید",
              `تجربه‌ای متفاوت با ${cafeName}`,
            ]}
            typingSpeed={80}
            pauseDuration={2000}
            showCursor
            cursorCharacter="|"
            className="font-title font-extrabold mt-1 text-2xl text-white tracking-wide"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}
          />
        </div>
      </div>
    </div>
  );
}
