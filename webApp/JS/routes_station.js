const url = "http://localhost:8000/route_station";
fetch(url)
  .then((response) => {
    if (!response.ok) throw new Error("Failed To Fetch Route Stations");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#RouteStations_table tbody");

    data.forEach((rs) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${rs.id}</td>
        <td>${rs.route_id}</td>
        <td>${rs.station_id}</td>
        <td>${rs.stop_number}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

  fetch("http://localhost:8000/routestation/count")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch routes_station count");
    return res.json();
  })
  .then(data => {
    const totalCount = data.total;
    const ctx = document.getElementById("routestationChart");

    if (!ctx) {
      console.error("Canvas element with id 'routes_stationChart' not found");
      return;
    }

    new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Routes_Station"],
        datasets: [{
          label: "Total Routes_station",
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
