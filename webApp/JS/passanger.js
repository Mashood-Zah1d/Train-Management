fetch("http://localhost:8000/passengers")
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch passengers");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#Passenger_table tbody");
    tbody.innerHTML = "";

    data.forEach(passenger => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${passenger.passenger_id}</td>
        <td>${passenger.name}</td>
        <td>${passenger.email}</td>
        <td>${passenger.phone}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error(err.message);
  });

fetch("http://localhost:8000/passengers/count")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch passenger count");
    return res.json();
  })
  .then(data => {
    console.log("Passenger count data:", data); // Debug log
    const totalCount = data.total;

    const ctx = document.getElementById("passengerChart");  // <== use the correct id
    if (!ctx) {
      console.error("Canvas element with id 'passengerChart' not found");
      return;
    }

    new Chart(ctx.getContext("2d"), {
  type: "bar",   // just change this from "bar"
  data: {
    labels: ["Passengers"],
    datasets: [{
      label: "Total Passengers",
      data: [totalCount],
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
       maxBarThickness: 100,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderWidth: 2,
      fill: true,
      tension: 0.3  // smooth curve
    }]
  },
  options: {
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
