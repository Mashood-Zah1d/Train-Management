const url = "http://localhost:8000/payments";

// Fetch and populate table
fetch(url)
  .then((response) => {
    if (!response.ok) throw new Error("Failed To Fetch Payments");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#Payment_table tbody");

    data.forEach((p) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.payment_id}</td>
        <td>${p.ticket_id}</td>
        <td>${p.amount}</td>
        <td>${p.payment_method}</td>
        <td>${p.payment_status}</td>
        <td>${p.payment_time}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

fetch("http://localhost:8000/payment/count")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch payment count");
    return res.json();
  })
  .then(data => {
    const { total, pending, completed } = data;

    const ctx = document.getElementById("paymentChart");
    if (!ctx) {
      console.error("Canvas element with id 'paymentChart' not found");
      return;
    }

    new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Total", "Pending", "Completed"],
        datasets: [{
          label: "Payments",
          data: [total, pending, completed],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",   // Total
            "rgba(255, 205, 86, 0.6)",   // Pending
            "rgba(54, 162, 235, 0.6)"    // Completed
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 205, 86, 1)",
            "rgba(54, 162, 235, 1)"
          ],
          borderWidth: 1,
          borderRadius: 6,
          barThickness: 80
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });
  })
  .catch(err => {
    console.error(err.message);
  });
