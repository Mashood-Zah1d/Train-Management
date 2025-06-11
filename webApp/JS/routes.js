const url = "http://localhost:8000/routes";

fetch(url)
  .then(response => {
    if (!response.ok) throw new Error("Failed to Fetch Routes Data");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#Routes_table tbody");
    data.forEach(route => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${route.route_id}</td>
        <td>${route.start_station_id}</td>
        <td>${route.end_station_id}</td>
        <td>${route.distance_km}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
 fetch("http://localhost:8000/route/count")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch routes_station count");
    return res.json();
  })
  .then(data => {
    const totalCount = data.total;
    const ctx = document.getElementById("routeChart");

    if (!ctx) {
      console.error("Canvas element with id 'routes_stationChart' not found");
      return;
    }

    new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Routes"],
        datasets: [{
          label: "Total Routes",
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
