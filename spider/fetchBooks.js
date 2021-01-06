// 抓取豆瓣读书中的数据信息
const axios  = require('axios').default;
const cheerio = require('cheerio');
const Book = require('../models/Book');


/**
 * 获取豆瓣读书网页的源代码
 */
async function getBooksHtml(){
    const resp = await axios.get('https://book.douban.com/latest');
    return resp.data
}


/**
 * 从豆瓣读书中得到一个完整的网页，并从网页中分析出书籍的基本信息，然后得到一个书籍的详情页链接数组
 */
async function getBookList(){
    const html = await getBooksHtml();
    const $ = cheerio.load(html);
    const achorElements = $('#content .grid-12-12 li a.cover')
    const links = achorElements.map((i,ele)=>{
        const href = ele.attribs['href'];
        return href
    }).get();
    return links;
}

/** 
 * 根据书籍详情页的地址，得到该书籍的详情信息
 * @param {Array} detailUrl
 */
async function getBookDetail(detailUrl){
    const resp = await axios.get(detailUrl);
    const $ = cheerio.load(resp.data)
    const name  = $('h1').text().trim();
    const imgurl = $('#mainpic .nbg img').attr('src');
    const spans = $('#info span.pl');
    const authorSpan =  spans.filter((i,ele)=>{
        return $(ele).text().includes('作者')
    })
    const author = authorSpan.next('a').text()
    const publishSpan =  spans.filter((i,ele)=>{
        return $(ele).text().includes('出版年')
    })
    const publishDate = publishSpan[0].nextSibling.nodeValue.trim();
    return {
        name,
        imgurl,
        publishDate,
        author
    }
    
}

/**
 * 获取所有的书籍信息
 */
async function fetchAll(){
    const links = await getBookList(); // 得到所有的详情页地址
    const proms = links.map(link =>{
        return getBookDetail(link);
    })
    return Promise.all(proms)
}

/**
 * 得到书籍信息，并保存到数据库
 */
async function saveToDB(){
    const books = await fetchAll();
    Book.bulkCreate(books);
    console.log('抓取完成')
}
saveToDB()




