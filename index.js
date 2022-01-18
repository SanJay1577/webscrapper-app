
 const express = require('express')  
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

async function scrapeProducts(url){
  const browser = await puppeteer.launch(); // we are using puppetter to launch the browser
  const page = await browser.newPage();   // new page for us in the browser
  await page.goto(url);

  const [el] = await page.$x('//*[@id="imgBlkFront"]');
  const src = await el.getProperty('src');  //getting the value in the page. 
  const image = await src.jsonValue();

  const [el2] = await page.$x('//*[@id="productTitle"]');
  const txt = await el2.getProperty('textContent');
  const title  = await txt.jsonValue();

 

  const [el3] = await page.$x('//*[@id="soldByThirdParty"]/span');
  const pricetxt = await el3.getProperty('textContent');
  const price = await pricetxt.jsonValue();


  console.log({image, title, price});
}
scrapeProducts('https://www.amazon.in/Zero-One-Start-Build-Future/dp/0753555190/ref=sr_1_1?crid=3IRL3Y398XYSA&keywords=peter+thiel+zero+to+one&qid=1642487073&s=books&sprefix=peter+th%2Cstripbooks%2C313&sr=1-1');

