const express = require('express');
const app = express();
const crawlRoutes = require('./routes/crawlRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/api/crawl', crawlRoutes);

// Server
const PORT = process.env.PORT || 3112;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
