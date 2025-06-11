const url = "http://localhost:8000/stations";

fetch(url).then(response => {
    if (!response.ok)
        throw new Error("Failed To Fetch Station Data");
    return response.json();
}).then(data => {
    const tbody = document.querySelector("#Station_table tbody");

    data.forEach(station => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${station.station_id}</td>
            <td>${station.name}</td>
            <td>${station.code}</td>
            <td>${station.location}</td>
        `;
        tbody.appendChild(row);
    });
}).catch(err => {
    console.log(err.message);
});

fetch("http://localhost:8000/station/count")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch routes_station count");
    return res.json();
  })
  .then(data => {
    const totalCount = data.total;
    const ctx = document.getElementById("stationChart");

    if (!ctx) {
      console.error("Canvas element with id 'stationChart' not found");
      return;
    }

    new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Station"],
        datasets: [{
          label: "Total Station",
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
