"use strict"

function $(query){
    return document.querySelector(query);
}

function $all(query){
    return document.querySelectorAll(query);
}

function go(url, hard=true){
    if(hard) window.location.replace(url);
    else window.location.href=url;
}