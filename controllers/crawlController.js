const { discoverProductUrls } = require('../crawler/crawler');

const crawlDomains = async (req, res) => {
  const { domains } = req.body;

  if (!domains || !Array.isArray(domains)) {
    return res.status(400).json({ error: "Invalid input. Provide a list of domains." });
  }

  const results = {};
  for (const domain of domains) {
    try {
      console.log(`Crawling domain: ${domain}`);
      const productUrls = await discoverProductUrls(domain);
      results[domain] = productUrls;
    } catch (error) {
      console.error(`Error crawling ${domain}:`, error.message);
      results[domain] = [];
    }
  }

  res.status(200).json({
    message: "Crawling completed successfully.",
    results
  });
};

module.exports = { crawlDomains };
