const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Normalizes frontend elements to the backend schema
 */
export function serializeElements(elements = []) {
  return elements.map((el, index) => {
    const base = {
      id: el.id || `el-${Date.now()}-${index}`,
      type: el.type === "rect" ? "rectangle" : el.type,
      x: Math.round(el.x ?? 0),
      y: Math.round(el.y ?? 0),
      rotation: Math.round(el.rotation ?? 0),
      opacity: el.opacity ?? 1,
      zIndex: index,
      fill: el.fill || "#6366f1",
      stroke: el.stroke || "transparent",
      strokeWidth: el.strokeWidth ?? 0,
    };

    if (el.type === "circle") {
      const radius = el.radius || 50;
      return {
        ...base,
        type: "circle",
        width: radius * 2,
        height: radius * 2,
        radius: radius,
      };
    }

    if (el.type === "text") {
      return {
        ...base,
        type: "text",
        width: el.width || 300,
        height: el.height || 50,
        content: el.text || "Text Element",
        fontSize: el.fontSize || 32,
        fontFamily: el.fontFamily || "sans-serif",
      };
    }

    // Default: rectangle / rect
    return {
      ...base,
      type: "rectangle",
      width: Math.round(el.width || 200),
      height: Math.round(el.height || 120),
      cornerRadius: el.cornerRadius ?? 0,
    };
  });
}

/**
 * Normalizes backend elements to the frontend Konva schema
 */
export function deserializeElements(elements = []) {
  return elements.map((el) => {
    const base = {
      id: el.id || el._id || `el-${Date.now()}`,
      x: el.x ?? 0,
      y: el.y ?? 0,
      rotation: el.rotation ?? 0,
      opacity: el.opacity ?? 1,
      fill: el.fill || "#6366f1",
      stroke: el.stroke || "transparent",
      strokeWidth: el.strokeWidth ?? 0,
      draggable: true,
    };

    if (el.type === "circle") {
      const radius = el.radius || (el.width ? el.width / 2 : 60);
      return {
        ...base,
        type: "circle",
        name: el.name || `Circle (${Math.round(radius)}px)`,
        radius: radius,
      };
    }

    if (el.type === "text") {
      return {
        ...base,
        type: "text",
        name: el.name || `Text (${el.content?.slice(0, 15) || "Text"}...)`,
        text: el.content || el.text || "Text Element",
        fontSize: el.fontSize || 32,
        fontFamily: el.fontFamily || "sans-serif",
        fontStyle: el.fontStyle || "normal",
        align: el.align || "left",
        width: el.width || 320,
      };
    }

    // Default: rectangle
    return {
      ...base,
      type: "rect",
      name: el.name || `Rectangle (${Math.round(el.width || 200)}×${Math.round(el.height || 120)})`,
      width: el.width || 200,
      height: el.height || 120,
      cornerRadius: el.cornerRadius ?? 8,
    };
  });
}

/**
 * List all canvases
 */
export async function listCanvases() {
  const res = await fetch(`${API_BASE_URL}/canvases`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch canvases (${res.status})`);
  }
  const json = await res.json();
  return json.data || [];
}

/**
 * Get a single canvas by ID
 */
export async function getCanvas(id) {
  const res = await fetch(`${API_BASE_URL}/canvases/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to load canvas (${res.status})`);
  }
  const json = await res.json();
  return json.data;
}

/**
 * Create a new canvas
 */
export async function createCanvas({ title, elements = [], width = 1200, height = 800, backgroundColor = "#12151f" }) {
  const payload = {
    title: title || "Untitled Canvas",
    description: "",
    width,
    height,
    backgroundColor,
    elements: serializeElements(elements),
  };

  const res = await fetch(`${API_BASE_URL}/canvases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to create canvas (${res.status})`);
  }
  const json = await res.json();
  return json.data;
}

/**
 * Update an existing canvas
 */
export async function updateCanvas(id, { title, elements = [], width = 1200, height = 800, backgroundColor = "#12151f" }) {
  const payload = {
    title: title || "Untitled Canvas",
    width,
    height,
    backgroundColor,
    elements: serializeElements(elements),
  };

  const res = await fetch(`${API_BASE_URL}/canvases/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to update canvas (${res.status})`);
  }
  const json = await res.json();
  return json.data;
}

/**
 * Delete a canvas by ID
 */
export async function deleteCanvas(id) {
  const res = await fetch(`${API_BASE_URL}/canvases/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to delete canvas (${res.status})`);
  }
  const json = await res.json();
  return json.data;
}
