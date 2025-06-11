const express = require("express");
require('dotenv').config();
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 8000;
app.use(cors());

const pool = new Pool({
  connectionString:process.env.url ,
  ssl: { rejectUnauthorized: false }
});

app.get("/trains", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM trains");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching passengers:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.use(express.urlencoded({ extended: true }));

app.post('/add-passenger', async (req, res) => {
    const { passenger_id, name, email, phone } = req.body;

    try {
        await pool.query(
            'INSERT INTO passengers (passenger_id, name, email, phone) VALUES ($1, $2, $3, $4)',
            [passenger_id, name, email, phone]
        );
        res.send('Passenger added successfully!');
    } catch (err) {
        console.error('Error inserting passenger:', err);
        res.status(500).send('Failed to add passenger');
    }
});

app.get("/stations", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stations");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching stations:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/routes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM routes");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching routes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/route_station", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM route_stations");  // 🔄 corrected name
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching route stations:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/schedules", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM schedules");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching schedules:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/passengers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM passengers");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching passengers:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/tickets", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tickets");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/payments", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM payments");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/train_schedule_report", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM train_schedule_report ORDER BY departure_time");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching train schedule report:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/passengers/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM passengers");
    const count = parseInt(result.rows[0].count);
    res.json({ total: count });
  } catch (err) {
    console.error("Error fetching passenger count:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/payment/count", async (req, res) => {
  try {
    const totalResult = await pool.query("SELECT COUNT(*) FROM payments");
    const pendingResult = await pool.query(
      "SELECT COUNT(*) FROM payments WHERE payment_status = 'Pending'"
    );
    const completedResult = await pool.query(
      "SELECT COUNT(*) FROM payments WHERE payment_status = 'Completed'"
    );

    res.json({
      total: parseInt(totalResult.rows[0].count),
      pending: parseInt(pendingResult.rows[0].count),
      completed: parseInt(completedResult.rows[0].count)
    });
  } catch (err) {
    console.error("Error fetching payment counts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/routestation/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM route_stations");
    const count = parseInt(result.rows[0].count);
    res.json({ total: count });
  } catch (err) {
    console.error("Error fetching payment count:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/route/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM routes");
    const count = parseInt(result.rows[0].count);
    res.json({ total: count });
  } catch (err) {
    console.error("Error fetching payment count:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/schedule/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM schedules");
    const count = parseInt(result.rows[0].count);
    res.json({ total: count });
  } catch (err) {
    console.error("Error fetching payment count:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/station/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM stations");
    const count = parseInt(result.rows[0].count);
    res.json({ total: count });
  } catch (err) {
    console.error("Error fetching payment count:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/ticket/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM tickets");
    const count = parseInt(result.rows[0].count);
    res.json({ total: count });
  } catch (err) {
    console.error("Error fetching payment count:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/train/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM trains");
    const count = parseInt(result.rows[0].count);
    res.json({ total: count });
  } catch (err) {
    console.error("Error fetching payment count:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/trainreport/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM train_schedule_report");
    const count = parseInt(result.rows[0].count);
    res.json({ total: count });
  } catch (err) {
    console.error("Error fetching payment count:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(express.urlencoded({ extended: true }));

app.post('/add-passenger', async (req, res) => {
  const { passenger_id, name, email, phone } = req.body;

  try {
    await pool.query(
      'INSERT INTO passengers (passenger_id, name, email, phone) VALUES ($1, $2, $3, $4)',
      [passenger_id, name, email, phone]
    );
    res.send('Passenger added successfully!');
  } catch (err) {
    console.error('Error inserting passenger:', err);
    res.status(500).send('Failed to add passenger');
  }
});

app.post('/add-payment', async (req, res) => {
  const { payment_id, ticket_id, amount, payment_method, payment_date } = req.body;

  try {
    await pool.query(
      'INSERT INTO payments (payment_id, ticket_id, amount, payment_method, payment_time) VALUES ($1, $2, $3, $4, $5)',
      [payment_id, ticket_id, amount, payment_method, payment_date]
    );
    res.send('Payment added successfully!');
  } catch (err) {
    console.error('Error inserting payment:', err);
    res.status(500).send('Failed to add payment');
  }
});

app.post('/add-train', async (req, res) => {
  const { train_id, train_number, name, type, capacity } = req.body;

  try {
    await pool.query(
      'INSERT INTO trains (train_id, train_number, name, type, capacity) VALUES ($1, $2, $3, $4, $5)',
      [train_id, train_number, name, type, capacity]
    );
    res.send('Train added successfully!');
  } catch (err) {
    console.error('Error inserting train:', err);
    res.status(500).send('Failed to add train');
  }
});

app.post('/add-route', async (req, res) => {
  const { route_id, start_station_id, end_station_id, distance_km } = req.body;

  try {
    await pool.query(
      'INSERT INTO routes (route_id, start_station_id, end_station_id, distance_km) VALUES ($1, $2, $3, $4)',
      [route_id, start_station_id, end_station_id, distance_km]
    );
    res.send('Route added successfully!');
  } catch (err) {
    console.error('Error inserting route:', err);
    res.status(500).send('Failed to add route');
  }
});

app.post('/add-station', async (req, res) => {
  const { station_id, name, code, location } = req.body;

  try {
    await pool.query(
      'INSERT INTO stations (station_id, name, code, location) VALUES ($1, $2, $3, $4)',
      [station_id, name, code, location]
    );
    res.send('Station added successfully!');
  } catch (err) {
    console.error('Error inserting station:', err);
    res.status(500).send('Failed to add station');
  }
});

app.post('/add-route-station', async (req, res) => {
  const { id, route_id, station_id, stop_number } = req.body;

  try {
    await pool.query(
      'INSERT INTO route_stations (id, route_id, station_id, stop_number) VALUES ($1, $2, $3, $4)',
      [id, route_id, station_id, stop_number]
    );
    res.send('Route station added successfully!');
  } catch (err) {
    console.error('Error inserting route station:', err);
    res.status(500).send('Failed to add route station');
  }
});

app.post('/add-schedule', async (req, res) => {
  const { schedule_id, train_id, route_id, departure_time, arrival_time } = req.body;

  try {
    await pool.query(
      'INSERT INTO schedules (schedule_id, train_id, route_id, departure_time, arrival_time) VALUES ($1, $2, $3, $4, $5)',
      [schedule_id, train_id, route_id, departure_time, arrival_time]
    );
    res.send('Schedule added successfully!');
  } catch (err) {
    console.error('Error inserting schedule:', err);
    res.status(500).send('Failed to add schedule');
  }
});

app.post('/add-cancellation', async (req, res) => {
  const { cancellation_id, ticket_id, reason, refund_amount, status } = req.body;

  try {
    await pool.query(
      'INSERT INTO cancellations (cancellation_id, ticket_id, reason, refund_amount, status) VALUES ($1, $2, $3, $4, $5)',
      [cancellation_id, ticket_id, reason, refund_amount, status]
    );
    res.send('Cancellation added successfully!');
  } catch (err) {
    console.error('Error inserting cancellation:', err);
    res.status(500).send('Failed to add cancellation');
  }
});


app.post('/add-coach', async (req, res) => {
  const { coach_id, train_id, class_type, total_seats, base_fare } = req.body;

  try {
    await pool.query(
      'INSERT INTO train_coaches (coach_id, train_id, class_type, total_seats, base_fare) VALUES ($1, $2, $3, $4, $5)',
      [coach_id, train_id, class_type, total_seats, base_fare]
    );
    res.send('Coach added successfully!');
  } catch (err) {
    console.error('Error inserting coach:', err);
    res.status(500).send('Failed to add coach');
  }
});
app.post('/add-ticket', async (req, res) => {
  const { ticket_id, schedule_id, passenger_id, seat_number } = req.body;

  try {
    await pool.query(
      `INSERT INTO tickets
         (ticket_id, schedule_id, passenger_id, seat_number)
       VALUES ($1, $2, $3, $4)`,
      [ticket_id, schedule_id, passenger_id, seat_number]
    );
    res.send('Ticket added successfully!');
  } catch (err) {
    console.error('Error inserting ticket:', err);
    res.status(500).send('Failed to add ticket');
  }
});

app.get("/table-counts", async (req, res) => {
  try {
    const tables = [
      "stations",
      "trains",
      "routes",
      "route_stations",
      "schedules",
      "passengers",
      "tickets",
      "payments",
      "train_coaches",  
      "cancellations" 
    ];

    const counts = {};
    for (const table of tables) {
      const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
      counts[table] = parseInt(result.rows[0].count);
    }

    res.json(counts);
  } catch (err) {
    console.error("Error fetching table counts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/train_coaches", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * from train_coaches
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/train_coaches/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) as total FROM train_coaches");
    res.json({ total: parseInt(result.rows[0].total) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/cancellations", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM cancellations 
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/cancellations/stats", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        SUM(CASE WHEN status = 'Processed' THEN 1 ELSE 0 END) as processed,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected
      FROM cancellations
    `);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
