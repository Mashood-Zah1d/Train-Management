const url = "http://localhost:8000/trains";

fetch(url)
  .then((response) => {
    if (!response.ok) throw new Error("Failed To Fetch trains");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#Train_table tbody");

    data.forEach((t) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${t.train_id}</td>
        <td>${t.train_number}</td>
        <td>${t.name}</td>
        <td>${t.type}</td>
        <td>${t.capacity}</td>
        
      `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
fetch("http://localhost:8000/train/count")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch train count");
    return res.json();
  })
  .then(data => {
    console.log("Fetched train count:", data); // ✅ Debug

    const totalCount = data.total;
    const ctx = document.getElementById("trainChart");

    if (!ctx) {
      console.error("Canvas element with id 'trainChart' not found");
      return;
    }

    new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Train"],
        datasets: [{
          label: "Total Train",
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
