const getHTML = require('html-get')

/**
 * `browserless` will be passed to `html-get`
 * as driver for getting the rendered HTML.
 */
const browserless = require('browserless')()

const getContent = async url => {
    // const { url } = req.body
  // create a browser context inside the main Chromium process
  const browserContext = browserless.createContext()
  const promise = getHTML(url, { getBrowserless: () => browserContext })
  // close browser resources before return the result
  promise.then(() => browserContext).then(browser => browser.destroyContext())
  return promise
}

/**
 * `metascraper` is a collection of tiny packages,
 * so you can just use what you actually need.
 */
const metascraper = require('metascraper')([
//   require('metascraper-author')(),
//   require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
//   require('metascraper-logo')(),
//   require('metascraper-clearbit')(),
//   require('metascraper-publisher')(),
  require('metascraper-title')(),
//   require('metascraper-url')()
])

/**
 * The main logic
 */
const scrapeUrl = async (req, res) => {
    const { url } = req.body
    
    let response = await getContent(url)
        .then(metascraper)
        .then(metadata => metadata)
        // .then(browserless.close)
        // .then(process.exit)
    
    return res.json({ response })
}

module.exports = scrapeUrl