const puppeteer = require('puppeteer')

export async function scrapeNZX(url: any){
    //setup page
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url);

    //scrape the number of rows on the page
    const [element] = await page.$x('//*[@id="dynamic-market-summary-container"]/div/div/div[2]/table/tbody/tr/td[2]')
    const text = await element.getProperty('textContent')
    const result = await text.jsonValue()
    const rows = parseInt(result.trim())

    const data = []

    try{
        //for each row, scrape the code, name, and price
        for(let row = 1; row < rows+1; row++){
            const pt1 = '//*[@id="instruments-table"]/tbody/tr['

            //get the code
            const codept2 = ']/td[1]/a/strong'
            let loc = pt1.concat(row.toString().concat(codept2))
            const [el] = await page.$x(loc.toString())
            const txt = await el.getProperty('textContent')
            const code = await txt.jsonValue();

            //get the name
            const namept2 = ']/td[2]/span/a'
            loc = pt1.concat(row.toString().concat(namept2))
            const [el2] = await page.$x(loc.toString())
            const txt2 = await el2.getProperty('textContent')
            const name = await txt2.jsonValue();

            //get the price
            const pricept2 = ']/td[3]'
            loc = pt1.concat(row.toString().concat(pricept2))
            const [el3] = await page.$x(loc.toString())
            const txt3 = await el3.getProperty('textContent')
            const val = await txt3.jsonValue();
            const price = val.trim()

            data.push({code: code, name:name, price:price})
        }

        //npm i fs
        //const fs = require('fs')
        //fs.writeFile(
        //    './nzx-data.json',
        //    JSON.stringify(data, null, 2)
        //    , function(err, result){
        //        if(err) console.log('error', err)
        //   })
    }catch(error){
        console.log(error.message)
    }

    browser.close()
    return data
}

//scrapeNZX('https://www.nzx.com/markets/NZSX')

export default scrapeNZX;