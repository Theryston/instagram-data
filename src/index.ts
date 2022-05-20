import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import "dotenv/config";

exports.handler = async (event) => {
  const instagramUser = await run({
    username: event.username,
  });

  const response = {
    statusCode: 200,
    userInstagramData: instagramUser,
  };

  return response;
};

export async function run({ username }: { username: string }) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await page.goto("https://www.instagram.com");

  await page.waitForSelector('[name="username"]');

  await page.focus('[name="username"]');

  await page.keyboard.type(process.env.USERNAME_PRIMARY, { delay: 1 });

  await page.focus('[name="password"]');

  await page.keyboard.type(process.env.PASSWORD_PRIMARY, { delay: 1 });

  await page.click('[type="submit"]');

  await page.waitForNavigation();

  await page.goto(`https://www.instagram.com/${username}/?__a=1`);

  const dataText = await page.evaluate(() => {
    const data = document.querySelector("pre").innerHTML;
    return data;
  });

  const dataObj = JSON.parse(dataText);

  await browser.close();

  return dataObj;
}
