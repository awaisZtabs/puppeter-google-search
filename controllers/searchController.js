const puppeteer = require('puppeteer');

const searchGoogle = async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        // Launch Puppeteer
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Set User-Agent to mimic a real browser
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        );

        // Navigate to Google
        await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });

        // Type the query into the search box and press Enter
        await page.type('textarea[name="q"]', query);
        await page.keyboard.press('Enter');

        // Wait for the search results to load
        await page.waitForSelector('div.g', { timeout: 10000 });

        // Extract titles of the top 10 results
        const titles = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('div.g h3'))
                .slice(0, 10) // Limit to the first 10 results
                .map(el => el.textContent.trim()); // Extract and clean text
        });

        // Close the browser
        await browser.close();
        // Respond with the top 10 titles
        if (titles.length === 0) {
            return res.status(404).json({ message: 'No results found for the given query.' });
        }

        res.json({ titles });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while performing the search.' });
    }
};

module.exports = { searchGoogle };
