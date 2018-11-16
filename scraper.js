const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.bobdylan.com/albums/blonde-on-blonde/';
const fs = require('fs');
var output = '';
var tracks;
Array.prototype.randomOne  = function(){
    return this[(Math.floor(this.length*Math.random()))]
  }

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
    createSentence(wordCount){
      // Initialize
      this.currentSentence = '';
      this.currentWord = this.starterWords.randomOne();
      this.currentSentence += this.currentWord;

      // Carve a path
      console.log(this.currentWord)
      for(let i = 0; i < wordCount; i++){
        this.currentWord = this.chainer[this.currentWord].randomOne();
        while(/[A-Z]/.test( this.currentWord[0])){
          this.currentWord = this.chainer[this.currentWord].randomOne();
          console.log(this.currentWord);
          }
      this.currentSentence += ' '+this.currentWord;
      }

    }
}
var bd = new textMaker();
rp(url).then(function(html){
    //success!
    tracks = $('.title', html);
    for (let i = 0; i < tracks.length;i++){
      currURL = tracks[i].attribs.href;
      rp(currURL).then(function(html){
        //GETS THE LYRICS
        let lyrics = ($('.lyrics',html).children());

        for (var j = 0; j < lyrics.length; j++) {
          let currLyrics = lyrics[j].prev.data;

          currLyrics = currLyrics.replace(/\s\s+/g, ' ');
          currLyrics = currLyrics.replace(/(\r\n|\n|\r)/gm," ");
          currLyrics = currLyrics.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
          let firstWord = currLyrics.split(" ")[1];
          if(!isEmpty(firstWord)){
            bd.starterWords.push(firstWord);
          }
          output += currLyrics;
        }

      })
    }
  })
  .catch(function(err){
    console.error('There was a request denied bro! Slow down requests!')
  });

  setTimeout(function(){
    bd.parse(output);
    let data = JSON.stringify(bd.chainer);
    fs.writeFileSync('blondeonblonde.json', data);
}, 10000);





// .trackslist
