const express = require("express");
const app = express();

app.use(express.json());

// --- שמירת משתמשים בזיכרון ---
let users = {};

// --- בדיקה שהשרת עובד ---
app.get("/", (req, res) => {
  res.send("השרת עובד");
});

// --- קבלת נתונים מ-Pollfish ---
app.post("/pollfish", (req, res) => {
  console.log("📩 נתונים שהתקבלו:", req.body);

  const userId = req.body.user_id || "guest";
  const reward = parseFloat(req.body.reward_value || 0);

  if (!users[userId]) {
    users[userId] = { coins: 0 };
  }

  users[userId].coins += reward * 750;

  console.log("💰 עודכן משתמש:", userId, users[userId]);

  res.send("ok");
});

// --- קבלת נתונים של משתמש ---
app.get("/user/:id", (req, res) => {
  const user = users[req.params.id] || { coins: 0 };
  res.json(user);
});

// --- משיכה ---
app.post("/withdraw", (req, res) => {
  const userId = req.body.user_id;

  if (!users[userId]) {
    return res.send("אין משתמש");
  }

  users[userId].coins = 0;

  res.send("נשלח לפייפל (דמו)");
});

// --- הפעלת שרת ---
app.listen(3000, () => {
  console.log("🚀 השרת רץ על פורט 3000");
});
