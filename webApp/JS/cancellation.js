fetch("http://localhost:8000/cancellations")
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch cancellations");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#cancellation_table tbody");
    tbody.innerHTML = "";

    data.forEach(cancellation => {
      const row = document.createElement("tr");
       row.innerHTML = `
        <td>${cancellation.cancellation_id}</td>
        <td>${cancellation.ticket_id}</td>
        <td>${cancellation.reason || "N/A"}</td>
        <td>${cancellation.cancelled_at}</td>
        <td>${cancellation.refund_amount}</td>
        <td>${cancellation.status}</td>
       
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error(err.message);
    alert("Failed to load cancellation data");
  });

// Bar Chart for Cancellation Stats
fetch("http://localhost:8000/cancellations/stats")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch cancellation stats");
    return res.json();
  })
  .then(data => {
    const ctx = document.getElementById("cancellationChart");
    if (!ctx) return;

    new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Processed", "Pending", "Rejected"],
        datasets: [{
          label: "Cancellation Status",
          data: [data.processed, data.pending, data.rejected],
          backgroundColor: [
            "rgba(40, 167, 69, 0.8)",  // Green
            "rgba(255, 193, 7, 0.8)",   // Yellow
            "rgba(220, 53, 69, 0.8)"    // Red
          ],
          borderColor: [
            "rgba(40, 167, 69, 1)",
            "rgba(255, 193, 7, 1)",
            "rgba(220, 53, 69, 1)"
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  })
  .catch(err => console.error(err));