document.getElementById("coachForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const coach_id = document.getElementById("coach_id").value;
  const train_id = document.getElementById("train_id").value;
  const class_type = document.getElementById("class_type").value;
  const total_seats = document.getElementById("total_seats").value;
  const base_fare = document.getElementById("base_fare").value;

  try {
    const response = await fetch("http://localhost:8000/add-coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        coach_id,
        train_id,
        class_type,
        total_seats,
        base_fare
      })
    });

    const result = await response.text();
    document.getElementById("message").textContent = result;
    document.getElementById("coachForm").reset();
  } catch (err) {
    console.error("Error adding coach:", err);
    document.getElementById("message").textContent = "Failed to add coach.";
  }
});