fetch("http://localhost:8000/train_coaches")
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch coaches");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#coach_table tbody");
    tbody.innerHTML = "";

    data.forEach(coach => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${coach.coach_id}</td>
        <td>${coach.train_id}</td>
        <td>${coach.class_type}</td>
        <td>${coach.total_seats}</td>
        <td>${coach.base_fare}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error(err.message);
    console.log("Failed to load coach data");
  });

// Coach count chart
fetch("http://localhost:8000/train_coaches/count")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch coach count");
    return res.json();
  })
  .then(data => {
    const ctx = document.getElementById("coachChart");
    if (!ctx) return;

    new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Total Coaches"],
        datasets: [{
          label: "Coaches by Class",
          data: [data.total],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  })
  .catch(err => console.error(err));