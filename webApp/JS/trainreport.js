const url = "http://localhost:8000/train_schedule_report";

fetch(url)
  .then(response => {
    if (!response.ok) throw new Error("Failed To Fetch Train Schedule Report");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#ScheduleReport_table tbody");

    data.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.schedule_id}</td>
        <td>${row.train_number}</td>
        <td>${row.train_name}</td>
        <td>${row.route_id}</td>
        <td>${row.start_station}</td>
        <td>${row.end_station}</td>
        <td>${row.departure_time}</td>
        <td>${row.arrival_time}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error(err.message);
  });

  fetch("http://localhost:8000/trainreport/count")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch train report count");
    return res.json();
  })
  .then(data => {
    console.log("Fetched train report count:", data); // ✅ Debug

    const totalCount = data.total;
    const ctx = document.getElementById("trainreportChart");

    if (!ctx) {
      console.error("Canvas element with id 'trainreportChart' not found");
      return;
    }

    new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Train Report"],
        datasets: [{
          label: "Total Train Report",
          data: [totalCount],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
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
