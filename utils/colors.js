/**
 * Parses a hex color string and converts it to an integer.
 * @param {string} hex - The hex color string (with or without '#').
 * @returns {number} The parsed hex color as an integer.
 */
const parseHex = (hex) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char.repeat(2))
      .join("");
  }
  return parseInt(hex, 16);
};

/**
 * Converts RGB color values to HSL.
 * @param {number} r - Red value (0-255).
 * @param {number} g - Green value (0-255).
 * @param {number} b - Blue value (0-255).
 * @returns {Array} An array containing [hue, saturation, lightness] values.
 */
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;

  if (max === min) return [0, 0, l];

  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;

  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
  }

  h /= 6;
  return [h, s, l];
};

/**
 * Converts RGB values to OKLCH color space.
 * @param {number} r - Red value (0-255).
 * @param {number} g - Green value (0-255).
 * @param {number} b - Blue value (0-255).
 * @returns {Array} An array containing [lightness, chroma, hue] values.
 */
const rgbToOklch = (r, g, b) => {
  // Convert RGB [0-255] to [0-1]
  r = r / 255;
  g = g / 255;
  b = b / 255;

  // Convert to linear RGB
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Convert to OKLAB
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  // Convert to OKLCH
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  const C = Math.sqrt(a * a + b_ * b_);
  let h = Math.atan2(b_, a) * 180 / Math.PI;
  if (h < 0) h += 360;

  return [L, C, h];
};

/**
 * Converts a hex color to either RGB, HSL, or OKLCH format.
 * @param {string} hex - The hex color string to convert.
 * @param {string} [format='rgb'] - The output format ('rgb', 'hsl', or 'oklch').
 * @returns {string} The color in the specified format.
 * @throws {Error} If an unsupported format is specified.
 */
export function convertHexColor(hex, format = "rgb") {
  const bigint = parseHex(hex);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  if (format === "rgb") {
    return `rgb(${r}, ${g}, ${b})`;
  } else if (format === "hsl") {
    const [h, s, l] = rgbToHsl(r, g, b);
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
      l * 100
    )}%)`;
  } else if (format === "oklch") {
    const [l, c, h] = rgbToOklch(r, g, b);
    return `oklch(${(l * 100).toFixed(2)}% ${c.toFixed(4)} ${h.toFixed(2)})`;
  }

  throw new Error('Unsupported format. Use "rgb", "hsl", or "oklch".');
}

/**
 * Checks if a given string is a valid color format (hex, RGB, HSL, or OKLCH).
 * @param {string} color - The color string to validate.
 * @returns {boolean} True if the color is valid, false otherwise.
 */
export function isValidColorFormat(color, format = "hex") {
  // Hex color regex (3 or 6 digits, with or without #)
  const hexRegex = /^#?([0-9A-Fa-f]{3}){1,2}$/;

  // RGB color regex
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

  // HSL color regex
  const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

  // OKLCH color regex
  const oklchRegex = /^oklch\(\s*(\d*\.?\d+)%\s+(\d*\.?\d+)\s+(\d*\.?\d+)\s*\)$/;

  if (format === "hex" && hexRegex.test(color)) {
    return true;
  }

  if (format === "rgb" && rgbRegex.test(color)) {
    const [, r, g, b] = color.match(rgbRegex);
    return r <= 255 && g <= 255 && b <= 255;
  }

  if (format === "hsl" && hslRegex.test(color)) {
    const [, h, s, l] = color.match(hslRegex);
    return h <= 360 && s <= 100 && l <= 100;
  }

  if (format === "oklch" && oklchRegex.test(color)) {
    const [, l, c, h] = color.match(oklchRegex);
    return l <= 100 && h <= 360;
  }

  return false;
}

/**
 * Generates a random color in hexadecimal format.
 * @param {boolean} [includeHash=true] - Whether to include the '#' symbol in the output.
 * @returns {string} A random color in hexadecimal format.
 */
export function generateRandomHexColor(includeHash = true) {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  // Pad the color with zeros if necessary to ensure it's always 6 digits
  const paddedColor = randomColor.padStart(6, "0");
  return includeHash ? `#${paddedColor}` : paddedColor;
}
