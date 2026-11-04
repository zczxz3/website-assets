export const buttons = [
  {
    "id": "fill",
    "number": 1,
    "category": "Basic",
    "name": "Curtain fill",
    "label": "Explore",
    "reference": "B02",
    "principle": "Translated pseudo-element fills the button.",
    "states": {
      "default": "outline",
      "hover": "fill travels upward",
      "press": "compress",
      "release": "fill persists while hovered"
    }
  },
  {
    "id": "border",
    "number": 2,
    "category": "Basic",
    "name": "Border trace",
    "label": "Discover",
    "reference": "B04",
    "principle": "Two inset borders scale from opposing corners.",
    "states": {
      "default": "thin outline",
      "hover": "corners extend",
      "press": "compress",
      "release": "trace retracts on leave"
    }
  },
  {
    "id": "magnetic",
    "number": 3,
    "category": "Magnetic",
    "name": "Magnetic pull",
    "label": "Come closer",
    "reference": "B10",
    "principle": "Bounded pointer displacement with a damped spring.",
    "states": {
      "default": "centered",
      "hover": "follows pointer",
      "press": "compress",
      "release": "spring returns on leave"
    }
  },
  {
    "id": "parallax",
    "number": 4,
    "category": "Magnetic",
    "name": "Layered pull",
    "label": "Enter orbit",
    "reference": "B10",
    "principle": "Label shifts farther than its outer shell.",
    "states": {
      "default": "centered layers",
      "hover": "two displacement amplitudes",
      "press": "compress",
      "release": "both layers spring home"
    }
  },
  {
    "id": "wave",
    "number": 5,
    "category": "Liquid",
    "name": "Rising tide",
    "label": "Make waves",
    "reference": "B11",
    "principle": "Rounded oversized pseudo-element rises and rotates.",
    "states": {
      "default": "solid pill",
      "hover": "wave surface rises",
      "press": "compress",
      "release": "surface recedes"
    }
  },
  {
    "id": "blob",
    "number": 6,
    "category": "Liquid",
    "name": "Soft morph",
    "label": "Stay fluid",
    "reference": "B11",
    "principle": "Border radius interpolates between asymmetric shapes.",
    "states": {
      "default": "rounded rectangle",
      "hover": "organic silhouette",
      "press": "compress",
      "release": "returns to base radius"
    }
  },
  {
    "id": "shine",
    "number": 7,
    "category": "Light",
    "name": "Light sweep",
    "label": "Catch the light",
    "reference": "B08",
    "principle": "Translated skewed highlight crosses a clipped surface.",
    "states": {
      "default": "dark surface",
      "hover": "one highlight sweep",
      "press": "compress",
      "release": "highlight resets"
    }
  },
  {
    "id": "halo",
    "number": 8,
    "category": "Light",
    "name": "Orbit border",
    "label": "Launch",
    "reference": "B07",
    "principle": "Rotating conic gradient sits behind an inset surface.",
    "states": {
      "default": "static border",
      "hover": "border rotates while engaged",
      "press": "compress",
      "release": "rotation stops"
    }
  },
  {
    "id": "roll",
    "number": 9,
    "category": "Text",
    "name": "Rolling label",
    "label": "View project",
    "reference": "B13",
    "principle": "Two visual label rows translate through an overflow window.",
    "states": {
      "default": "first row",
      "hover": "second row rises",
      "press": "compress",
      "release": "first row returns"
    }
  },
  {
    "id": "stagger",
    "number": 10,
    "category": "Text",
    "name": "Letter lift",
    "label": "Say hello",
    "reference": "B04",
    "principle": "Decorative character spans use indexed transition delays.",
    "states": {
      "default": "baseline",
      "hover": "sequential vertical offsets",
      "press": "compress",
      "release": "characters settle"
    }
  },
  {
    "id": "depth",
    "number": 11,
    "category": "Physics",
    "name": "Tactile key",
    "label": "Press me",
    "reference": "B15",
    "principle": "Shadow offset represents depth and shrinks on press.",
    "states": {
      "default": "raised key",
      "hover": "slight lift",
      "press": "moves into base",
      "release": "returns to raised position"
    }
  },
  {
    "id": "tilt",
    "number": 12,
    "category": "Physics",
    "name": "Perspective tilt",
    "label": "Take a look",
    "reference": "B05",
    "principle": "Pointer coordinates map to bounded rotateX/rotateY.",
    "states": {
      "default": "flat",
      "hover": "tilts toward pointer",
      "press": "compress",
      "release": "rotation resets"
    }
  },
  {
    "id": "ripple",
    "number": 13,
    "category": "Particle",
    "name": "Radial ripple",
    "label": "Send a ripple",
    "reference": "B09",
    "principle": "A click-origin disc scales and fades with WAAPI.",
    "states": {
      "default": "clean surface",
      "hover": "subtle surface lift",
      "press": "native press",
      "release": "finite radial wave"
    }
  },
  {
    "id": "sparks",
    "number": 14,
    "category": "Particle",
    "name": "Spark burst",
    "label": "Celebrate",
    "reference": "B14",
    "principle": "Twelve short-lived decorative rays radiate from activation.",
    "states": {
      "default": "clean surface",
      "hover": "subtle surface lift",
      "press": "native press",
      "release": "finite ray burst"
    }
  },
  {
    "id": "async",
    "number": 15,
    "category": "State",
    "name": "Async save",
    "label": "Save changes",
    "reference": "B14",
    "principle": "Single-flight Promise plus AbortSignal and explicit error/retry states.",
    "states": {
      "default": "idle",
      "hover": "focus/surface cue",
      "press": "press then loading",
      "release": "success or failure; retry enabled"
    }
  },
  {
    "id": "undo",
    "number": 16,
    "category": "State",
    "name": "Save & undo",
    "label": "Save item",
    "reference": "B13",
    "principle": "Reversible local state with an explicit undo action.",
    "states": {
      "default": "unsaved",
      "hover": "surface cue",
      "press": "native press",
      "release": "saved; next activation undoes"
    }
  },
  {
    "id": "menu",
    "number": 17,
    "category": "Navigation",
    "name": "Expand actions",
    "label": "Open actions",
    "reference": "B15",
    "principle": "Disclosure button controls a linked action panel.",
    "states": {
      "default": "collapsed",
      "hover": "icon moves",
      "press": "native press",
      "release": "expanded; Escape closes and restores focus"
    }
  },
  {
    "id": "back",
    "number": 18,
    "category": "Navigation",
    "name": "Directional arrow",
    "label": "Go back",
    "reference": "B16",
    "principle": "Arrow and label translate in opposite directions.",
    "states": {
      "default": "arrow and label",
      "hover": "arrow moves left",
      "press": "compress",
      "release": "dispatches activation without forced navigation"
    }
  },
  {
    "id": "goo",
    "number": 19,
    "category": "Experimental",
    "name": "SVG fusion",
    "label": "Fuse together",
    "reference": "B11",
    "principle": "SVG blur and alpha matrix merge three decorative circles.",
    "states": {
      "default": "three merged circles",
      "hover": "circles spread",
      "press": "compress",
      "release": "circles merge again"
    }
  },
  {
    "id": "noise",
    "number": 20,
    "category": "Experimental",
    "name": "Canvas grain",
    "label": "Make some noise",
    "reference": "B09",
    "principle": "Small procedural canvas redraws a finite grain burst.",
    "states": {
      "default": "static grain",
      "hover": "contrast cue",
      "press": "native press",
      "release": "six discrete grain frames; no idle animation"
    }
  }
];
