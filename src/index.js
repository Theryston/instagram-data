const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
require("dotenv/config");

exports.handler = async (event) => {
  const instagramUser = await run({
    username: event.username,
  });

  return instagramUser;
};

async function run({ username }) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await page.goto("https://www.instagram.com");

  const response = await page.evaluate(
    async ({ username }) => {
      const response = await fetch(
        "https://i.instagram.com/api/v1/users/web_profile_info/?username=" +
          username,
        {
          headers: {
            "x-ig-app-id": "936619743392459",
          },
        }
      ).then((res) => res.json());
      return response;
    },
    {
      username,
    }
  );

  browser.close();

  return response.data;
}
