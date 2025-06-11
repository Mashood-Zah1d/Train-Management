document.getElementById("scheduleForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const schedule_id = document.getElementById("schedule_id").value;
  const train_id = document.getElementById("train_id").value;
  const route_id = document.getElementById("route_id").value;
  const departure_time = document.getElementById("departure_time").value;
  const arrival_time = document.getElementById("arrival_time").value;

  try {
    const response = await fetch("http://localhost:8000/add-schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        schedule_id,
        train_id,
        route_id,
        departure_time,
        arrival_time
      })
    });

    const result = await response.text();
    document.getElementById("message").textContent = result;
    document.getElementById("scheduleForm").reset();
  } catch (err) {
    console.error("Error adding schedule:", err);
    document.getElementById("message").textContent = "Failed to add schedule.";
  }
});
