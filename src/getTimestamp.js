import React from 'react'

function getTimestamp() {
    
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = new Date();
    let hr = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    if (min < 10) {
        min = "0" + min;
    }
    let ampm = "AM";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "PM";
    }
    if(sec<10){
        sec="0"+sec;
    }
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let timestamp =  date + " " + month + " " + year + ", "+ hr + ":" + min + ":" + sec + " "+ampm;
    return timestamp
}

export default getTimestamp