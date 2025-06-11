document.getElementById("paymentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payment_id = document.getElementById("payment_id").value;
  const ticket_id = document.getElementById("ticket_id").value;
  const amount = document.getElementById("amount").value;
  const payment_method = document.getElementById("payment_method").value;
  const payment_date = document.getElementById("payment_date").value;

  try {
    const response = await fetch("http://localhost:8000/add-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        payment_id,
        ticket_id,
        amount,
        payment_method,
        payment_date
      })
    });

    const resultText = await response.text();
    document.getElementById("message").textContent = resultText;
    document.getElementById("paymentForm").reset();
  } catch (err) {
    console.error("Error adding payment:", err);
    document.getElementById("message").textContent = "Failed to add payment.";
  }
});
