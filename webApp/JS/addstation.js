document.getElementById("stationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const station_id = document.getElementById("station_id").value;
  const name = document.getElementById("name").value;
  const code = document.getElementById("code").value;
  const location = document.getElementById("location").value;

  try {
    const response = await fetch("http://localhost:8000/add-station", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        station_id,
        name,
        code,
        location
      })
    });

    const resultText = await response.text();
    document.getElementById("message").textContent = resultText;
    document.getElementById("stationForm").reset();
  } catch (err) {
    console.error("Error adding station:", err);
    document.getElementById("message").textContent = "Failed to add station.";
  }
});
