document.getElementById("trainForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const train_id = document.getElementById("train_id").value;
  const train_number = document.getElementById("train_number").value;
  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const capacity = document.getElementById("capacity").value;

  try {
    const response = await fetch("http://localhost:8000/add-train", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        train_id,
        train_number,
        name,
        type,
        capacity
      })
    });

    const resultText = await response.text();
    document.getElementById("message").textContent = resultText;
    document.getElementById("trainForm").reset();
  } catch (err) {
    console.error("Error adding train:", err);
    document.getElementById("message").textContent = "Failed to add train.";
  }
});
