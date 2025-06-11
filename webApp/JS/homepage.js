const tableLinks = {
  stations: ['station.html', 'addstation.html'],
  trains: ['train.html', 'addtrain.html'],
  routes: ['routes.html', 'addroutes.html'],
  route_stations: ['routestation.html', 'addroutestation.html'],
  schedules: ['schedule.html', 'addschedule.html'],
  passengers: ['passenger.html', 'addpassenger.html'],
  tickets: ['ticket.html', 'addticket.html'],
  payments: ['payment.html', 'addpayment.html'],
  cancellations: ['cancellation.html', 'addcancellation.html'],
  train_coaches: ['traincoaches.html', 'addtraincoach.html']
};

fetch("http://localhost:8000/table-counts")
  .then(res => res.json())
  .then(data => {
    const dashboard = document.getElementById("dashboard");

    Object.entries(data).forEach(([tableName, count]) => {
      const [viewLink, addLink] = tableLinks[tableName];

      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";

      col.innerHTML = `
        <div class="card dashboard-card shadow p-3">
          <div class="card-body text-center">
            <h5 class="card-title text-capitalize">${tableName.replace('_', ' ')}</h5>
            <p class="card-text">${count} Records</p>
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-sm btn-outline-primary" onclick="location.href='${viewLink}'">View</button>
              <button class="btn btn-sm btn-outline-success" onclick="location.href='${addLink}'">Add</button>
            </div>
          </div>
        </div>
      `;

      dashboard.appendChild(col);
    });
  })
  .catch(err => console.error("Error loading dashboard data:", err));