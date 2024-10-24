
const express = require('express');
const app = express();
const PORT = 3000;

const leads = [
  { "id": 1, "name": "Alice Johnson", "email": "alice.j@example.com", "status": "new" },
  { "id": 2, "name": "Michael Brown", "email": "michael.b@example.com", "status": "qualified" },
  { "id": 3, "name": "Emily Davis", "email": "emily.d@example.com", "status": "contacted" },
  { "id": 4, "name": "David Wilson", "email": "david.w@example.com", "status": "closed" },
  { "id": 5, "name": "Sophia Martinez", "email": "sophia.m@example.com", "status": "new" }
];

const campaigns = [
  { "id": 1, "name": "Spring Sale 2024", "leads_generated": 300 },
  { "id": 2, "name": "Black Friday Blast", "leads_generated": 500 },
  { "id": 3, "name": "Holiday Discounts", "leads_generated": 350 },
  { "id": 4, "name": "New Year Promo", "leads_generated": 450 }
];


app.get('/leads', (req, res) => {
    res.json(leads);
});

app.get('/campaigns', (req, res) => {
    res.json(campaigns);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
