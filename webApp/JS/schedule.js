const url = "http://localhost:8000/schedules";
fetch(url)
  .then((response) => {
    if (!response.ok) throw new Error("Failed To Fetch Schedule Data");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#Schedule_table tbody");

    data.forEach((schedule) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${schedule.schedule_id}</td>
        <td>${schedule.train_id}</td>
        <td>${schedule.route_id}</td>
        <td>${schedule.departure_time}</td>
        <td>${schedule.arrival_time}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

  fetch("http://localhost:8000/schedule/count")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch routes_station count");
    return res.json();
  })
  .then(data => {
    const totalCount = data.total;
    const ctx = document.getElementById("scheduleChart");

    if (!ctx) {
      console.error("Canvas element with id 'scheduleChart' not found");
      return;
    }

    new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["schedule"],
        datasets: [{
          label: "Total Schedule",
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
