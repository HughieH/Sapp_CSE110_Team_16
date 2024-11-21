const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8080;

// Middleware
app.use(cors()); // Allow requests from your frontend
app.use(bodyParser.json()); // Parse JSON request bodies

// Database connection
const db = new sqlite3.Database("../Database/sapp.db", (err) => {
    if (err) {
        console.error("Failed to connect to the database:", err);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Routes
app.get("/api/users", (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.post("/api/users", (req, res) => {
    const { name, email } = req.body;
    db.run(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [name, email],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
