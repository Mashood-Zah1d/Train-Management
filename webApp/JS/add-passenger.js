document.getElementById("passengerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const passenger_id = document.getElementById("passenger_id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  try {
    const response = await fetch("http://localhost:8000/add-passenger", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        passenger_id,
        name,
        email,
        phone
      })
    });

    const resultText = await response.text();
    document.getElementById("message").textContent = resultText;
    document.getElementById("passengerForm").reset();
  } catch (err) {
    console.error("Error adding passenger:", err);
    document.getElementById("message").textContent = "Failed to add passenger.";
  }
});
