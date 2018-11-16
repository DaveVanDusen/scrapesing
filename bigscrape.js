const rp = require('request-promise');
const $ = require('cheerio');
const baseURL = 'http://www.bobdylan.com/albums/?filter=chronological'
const fs = require('fs');
var output = '';
var tracks, currURL, tracksURL;

function isEmpty(string){
  if(string === ''){
    return true;
  } else {
    return false;
  }
}

class textMaker {
  constructor(){
    this.chainer = {};
    this.paragraph = '';
    this.starterWords = [];
    this.currentSentence = '';
  }
  parse(paragraph){
            this.paragraph = paragraph.split(' ');
            for(let i=0;i<this.paragraph.length-1;i++){
              if(isEmpty(this.paragraph[i])){
                i++;
              }
                if (this.chainer.hasOwnProperty(this.paragraph[i])){
                  if(!isEmpty(this.paragraph[i+1])){
                  this.chainer[this.paragraph[i]].push(this.paragraph[i+1]);
                  }
                } else {
                  if(!isEmpty(this.paragraph[i+1])){
                  this.chainer[this.paragraph[i]] = [this.paragraph[i+1],];
                }
                }
              }
          }
}
var bd = new textMaker();


rp(baseURL).then(function(html){
  //get album links
let  albums = $('.caption h3 a', html);
  for(let i = 0; i < 20; i++){
    currURL = albums[i].attribs.href;
      rp(currURL).then(function(html){
          //get tracks
          tracks = $('.title', html);

          for (let k = 0; k < tracks.length;k++){
            tracksURL = tracks[k].attribs.href;
            rp(tracksURL).then(function(html){
              //GETS THE LYRICS
              let lyrics = ($('.lyrics',html).children());

              for (var j = 0; j < lyrics.length; j++) {
                let currLyrics = lyrics[j].prev.data;
                console.log(currLyrics);
                if(typeof currLyrics != undefined){
                currLyrics = currLyrics.replace(/\s\s+/g, ' ');
                currLyrics = currLyrics.replace(/(\r\n|\n|\r)/gm," ");
                currLyrics = currLyrics.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

                let firstWord = currLyrics.split(" ")[1];
                if(!isEmpty(firstWord)){
                  bd.starterWords.push(firstWord);
                }

                output += currLyrics;
              }
              }

            })
    }
  })
  .catch(function(err){
    console.error('There was a request denied bro! Slow down requests!')
  });
}
});

  setTimeout(function(){
    bd.parse(output);
    let data = JSON.stringify(bd.chainer);
    fs.writeFileSync('blondeonblonde.json', data);
}, 60000);





// .trackslist
