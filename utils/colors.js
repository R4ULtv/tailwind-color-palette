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
 * Converts a hex color to either RGB or HSL format.
 * @param {string} hex - The hex color string to convert.
 * @param {string} [format='rgb'] - The output format ('rgb' or 'hsl').
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
  }

  throw new Error('Unsupported format. Use "rgb" or "hsl".');
}

/**
 * Checks if a given string is a valid color format (hex, RGB, or HSL).
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
