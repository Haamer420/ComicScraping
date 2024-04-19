const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeComics() {
    try { 
        const response = await axios.get('https://misIganesLink.com');
        const $ = cheerio.load(response.data);

        const comicTitles = [];
        $('div.comics-title').each((index, element) => {
            comicTitles.push($(element).text());
        });

        const comicImages = [];
        $('img.comic-image').each((index, element) => {
            comicImages.push($(element).attr('src'));
        });

        const comicsData = comicTitles.map((title, index) => ({
            title,
            image: comicImages[index]
        }));
        console.log(comicsData);

    } catch (error) {
        console.error('Error fetching comics:', error);
    }
}

scrapeComics();