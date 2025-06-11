document.getElementById("routeStationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const route_id = document.getElementById("route_id").value;
  const station_id = document.getElementById("station_id").value;
  const stop_number = document.getElementById("stop_number").value;

  try {
    const response = await fetch("http://localhost:8000/add-route-station", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        id,
        route_id,
        station_id,
        stop_number
      })
    });

    const resultText = await response.text();
    document.getElementById("message").textContent = resultText;
    document.getElementById("routeStationForm").reset();
  } catch (err) {
    console.error("Error adding route station:", err);
    document.getElementById("message").textContent = "Failed to add route station.";
  }
});
