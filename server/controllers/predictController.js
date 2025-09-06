import fetch from "node-fetch"; 

export const predictBoth = async (req, res) => {
  try {
    const payload = req.body;
    console.log("Received payload:", JSON.stringify(payload, null, 2)); 

    const response = await fetch("http://127.0.0.1:8000/predict/both", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("FastAPI error:", errorData);
      return res.status(response.status).json({
        message: "FastAPI request failed",
        details: errorData.detail || errorData.message || "Unknown error",
      });
    }

    const data = await response.json();
    console.log("FastAPI response:", data); 
    res.json(data);
  } catch (error) {
    console.error("Error fetching from FastAPI:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

