const url = "http://localhost:8000/tickets";

fetch(url)
  .then((response) => {
    if (!response.ok) throw new Error("Failed To Fetch Tickets");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#Ticket_table tbody");

    data.forEach((t) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${t.ticket_id}</td>
        <td>${t.passenger_id}</td>
        <td>${t.schedule_id}</td>
        <td>${t.seat_number}</td>
        <td>${t.booking_time}</td>
        
      `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
fetch("http://localhost:8000/ticket/count")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch ticket count");
    return res.json();
  })
  .then(data => {
    const totalCount = data.total;
    const ctx = document.getElementById("ticketChart");

    if (!ctx) {
      console.error("Canvas element with id 'ticketChart' not found");
      return;
    }

    new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Ticket"],
        datasets: [{
          label: "Total Ticket",
          data: [totalCount],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          borderRadius: 6,        // Rounded bar corners
          barThickness: 80        // Control bar width
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