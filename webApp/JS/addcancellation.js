document.getElementById("cancellationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const cancellation_id = document.getElementById("cancellation_id").value;
  const ticket_id = document.getElementById("ticket_id").value;
  const reason = document.getElementById("reason").value;
  const refund_amount = document.getElementById("refund_amount").value;
  const status = document.getElementById("status").value;

  try {
    const response = await fetch("http://localhost:8000/add-cancellation", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        cancellation_id,
        ticket_id,
        reason,
        refund_amount,
        status
      })
    });

    const result = await response.text();
    document.getElementById("message").textContent = result;
    document.getElementById("cancellationForm").reset();
  } catch (err) {
    console.error("Error adding cancellation:", err);
    document.getElementById("message").textContent = "Failed to add cancellation.";
  }
});