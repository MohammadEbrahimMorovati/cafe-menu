// src/theme/normalizeTheme.js

// Regex برای گرفتن بخش‌های موردنیاز
const STYLE_RE = /\bborder-(solid|dashed|dotted)\b/;
const WIDTH_RE = /border-\[(\d+)px\]/;
const RADIUS_RE = /rounded-\[(\d+)px\]/;

function parseStyle(css, fallback) {
  const m = css.match(STYLE_RE);
  const sty = m?.[1] || fallback || "solid";
  return `border-${sty}`;
}

function parsePx(re, css, def) {
  const m = css.match(re);
  const n = m ? Number(m[1]) : def;
  return `${n}px`;
}

export function normalizeTheme(server) {
  const css = server.border_style?.css_classes || server.border_style_css || "";

  const styleClass = parseStyle(css, server.border_style?.category);
  const bw = parsePx(WIDTH_RE, css, 2);
  const br = parsePx(RADIUS_RE, css, 16);

  const base = "max-w-2xl mx-auto p-3";

  // کلاس نهایی
  const className = `${base} ${styleClass} border-w-var rounded-var border-secondary`;

  return {
    name: server.name,
    colors: {
      primary: server.primary_color,
      secondary: server.secondary_color,
      bodyBg: server.body_bg_color,
    },
    border: {
      className,
      style: {
        "--bcolor": server.secondary_color,
        "--bw": bw,
        "--br": br,
      },
      meta: server.border_style,
    },
  };
}
