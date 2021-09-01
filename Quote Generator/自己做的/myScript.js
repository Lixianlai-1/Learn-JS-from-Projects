"use strict";

const quoteContainer = document.querySelector(".quote-box");
const quoteText = document.querySelector(".quote");
const authorText = document.querySelector(".author");
const newQuoteBtn = document.querySelector(".newQuote");
const newWeiboBtn = document.querySelector(".weibo");

// 得到新的名言JSON文件，赋值给quoteValue
let quoteValue;

// 改变文字和作者名
const changeQuote = function () {
  quoteText.textContent = quoteValue.hitokoto;
  authorText.textContent = quoteValue.creator;
};

// 发微博
const faWeibo = async function () {
  const openWeiboUrl = await fetch("");
};

const getQuote = async function () {
  try {
    // 得到一言的API response
    const response = await fetch("https://v1.hitokoto.cn");
    quoteValue = await response.json();
    console.log(quoteValue);
    changeQuote();
  } catch (err) {
    console.error(err.message);
  }
};

newQuoteBtn.addEventListener("click", getQuote);
