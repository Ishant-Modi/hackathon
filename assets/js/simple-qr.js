/**
 * Simple QR Code Generator for MigrantConnect
 * Creates QR-like patterns for demonstration purposes
 */

function QRCode(element, options) {
  if (typeof element === "string") {
    element = document.getElementById(element);
  }

  if (!element) {
    throw new Error("QRCode element not found");
  }

  var settings = {
    text: "",
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
  };

  if (typeof options === "string") {
    settings.text = options;
  } else if (typeof options === "object") {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        settings[key] = options[key];
      }
    }
  }

  this.makeCode = function (text) {
    if (text) {
      settings.text = text;
    }

    var canvas = document.createElement("canvas");
    canvas.width = settings.width;
    canvas.height = settings.height;
    canvas.style.border = "1px solid #ddd";
    canvas.style.backgroundColor = settings.colorLight;

    var ctx = canvas.getContext("2d");

    // Create a simple pattern based on the text
    var size = 21; // 21x21 grid for QR-like pattern
    var cellSize = settings.width / size;

    // Generate a pattern based on text
    var pattern = generateQRPattern(settings.text, size);

    // Draw the pattern
    ctx.fillStyle = settings.colorLight;
    ctx.fillRect(0, 0, settings.width, settings.height);

    ctx.fillStyle = settings.colorDark;
    for (var row = 0; row < size; row++) {
      for (var col = 0; col < size; col++) {
        if (pattern[row][col]) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }

    // Clear element and add canvas
    element.innerHTML = "";
    element.appendChild(canvas);

    return this;
  };

  // Generate initial QR code if text provided
  if (settings.text) {
    this.makeCode(settings.text);
  }

  return this;
}

function generateQRPattern(text, size) {
  var pattern = [];

  // Initialize pattern array
  for (var i = 0; i < size; i++) {
    pattern[i] = new Array(size).fill(false);
  }

  // Create position detection patterns (corners)
  addPositionPattern(pattern, 0, 0);
  addPositionPattern(pattern, 0, size - 7);
  addPositionPattern(pattern, size - 7, 0);

  // Add timing patterns
  for (var i = 8; i < size - 8; i++) {
    pattern[6][i] = i % 2 === 0;
    pattern[i][6] = i % 2 === 0;
  }

  // Fill data area with pattern based on text
  var hash = hashCode(text);
  var random = createPseudoRandom(hash);

  for (var row = 0; row < size; row++) {
    for (var col = 0; col < size; col++) {
      // Skip position detection areas and timing patterns
      if (!isReservedArea(row, col, size)) {
        pattern[row][col] = random() > 0.5;
      }
    }
  }

  return pattern;
}

function addPositionPattern(pattern, startRow, startCol) {
  // 7x7 position detection pattern
  for (var row = 0; row < 7; row++) {
    for (var col = 0; col < 7; col++) {
      if (
        row === 0 ||
        row === 6 ||
        col === 0 ||
        col === 6 ||
        (row >= 2 && row <= 4 && col >= 2 && col <= 4)
      ) {
        pattern[startRow + row][startCol + col] = true;
      } else {
        pattern[startRow + row][startCol + col] = false;
      }
    }
  }
}

function isReservedArea(row, col, size) {
  // Position detection patterns
  if (
    (row < 9 && col < 9) ||
    (row < 9 && col >= size - 8) ||
    (row >= size - 8 && col < 9)
  ) {
    return true;
  }

  // Timing patterns
  if (row === 6 || col === 6) {
    return true;
  }

  return false;
}

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function createPseudoRandom(seed) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Export for global use
window.QRCode = QRCode;
