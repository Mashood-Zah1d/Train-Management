document.getElementById("routeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const route_id = document.getElementById("route_id").value;
  const start_station_id = document.getElementById("start_station_id").value;
  const end_station_id = document.getElementById("end_station_id").value;
  const distance_km = document.getElementById("distance_km").value;

  try {
    const response = await fetch("http://localhost:8000/add-route", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        route_id,
        start_station_id,
        end_station_id,
        distance_km
      })
    });

    const resultText = await response.text();
    document.getElementById("message").textContent = resultText;
    document.getElementById("routeForm").reset();
  } catch (err) {
    console.error("Error adding route:", err);
    document.getElementById("message").textContent = "Failed to add route.";
  }
});
