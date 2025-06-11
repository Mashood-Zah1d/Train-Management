document.getElementById("ticketForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const ticket_id = document.getElementById("ticket_id").value;
  const schedule_id = document.getElementById("schedule_id").value;
  const passenger_id = document.getElementById("passenger_id").value;
  const seat_number = document.getElementById("seat_number").value;

  try {
    const response = await fetch("http://localhost:8000/add-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        ticket_id,
        schedule_id,
        passenger_id,
        seat_number
      })
    });

    const result = await response.text();
    document.getElementById("message").textContent = result;
    document.getElementById("ticketForm").reset();
  } catch (err) {
    console.error("Error adding ticket:", err);
    document.getElementById("message").textContent = "Failed to add ticket.";
  }
});
