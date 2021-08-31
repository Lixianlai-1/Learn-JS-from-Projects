"use strict";

// 用和HTML对应的驼峰定义
// 这里用id帮助定义常量
// 定义container，文本和按钮
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// fetch("https://type.fit/api/quotes")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     console.log(data[Math.round(Math.random())]);
//     const quoteAll = data[Math.round(Math.random())];
//     console.log(quoteAll.text);
//     console.log(quoteAll.author);

//     const html = `
//     <span id="quote"
//     >${quoteAll.text}
//      </span>
//     `;
//   });

let apiQuotes = [];

// ----------------------------------------------------------------------------------------
const newQuote = function () {
  // 注意Math.random()后面是要跟()，不然没执行，我在这个错误上浪费了很多时间！
  const quote = apiQuotes[Math.round(Math.random() * apiQuotes.length)];

  // 当quote的length过长时，在class中增加quote-long，修改一下css样式
  if (quote.text.length > 120) {
    quoteText.classList.add("quote-long");
  } else {
    quoteText.classList.remove("quote-long");
  }

  // 推荐使用textContent，文章https://www.zhangxinxu.com/wordpress/2019/09/js-dom-innertext-textcontent/?shrink=1
  quoteText.textContent = quote.text;

  // 因为有的作者名是null，所以需要设置判断条件
  if (!quote.author) {
    authorText.textContent = "Unkonwn";
  } else {
    authorText.textContent = quote.author;
  }
};

// ----------------------------------------------------------------------------------------
// 发推特
function Tweet() {
  const url = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  // 这里要做的很简单，用window.open打开网站即可，_blank代表用新的标签打开
  window.open(url, "_blank");
}

// ----------------------------------------------------------------------------------------
// async函数是AsyncFunction构造函数的实例， 并且其中允许使用await关键字。async和await关键字让我们可以用一种更简洁的方式写出基于Promise的异步行为，而无需刻意地链式调用promise。
async function getQuotes() {
  // 找到api的网站并定义
  const apiUrl = "https://type.fit/api/quotes";
  try {
    // await  操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用。
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // 必须在数组长度之内的数量中随机抽取啊

    newQuote();
    //catch要设置参数框
  } catch (error) {}
}

// ----------------------------------------------------------------------------------------
// 监听newQuote按钮，执行getQuptes函数
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", Tweet);
