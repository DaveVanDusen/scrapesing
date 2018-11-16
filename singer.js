var fs = require('fs');
var obj;
Array.prototype.randomOne  = function(){
    return this[(Math.floor(this.length*Math.random()))]
  }
fs.readFile('blondeonblonde.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  let x = new createSentence(1000,obj);
  console.log(x.currentSentence)
});
function createSentence(wordCount, obj){
  // Initialize
  this.currentSentence = '';
  this.currentWord = 'the';
  this.currentSentence += this.currentWord;
  this.wordCount = 0;
  this.wordReset = 4;


  // Carve a path
  for(let i = 0; i < wordCount; i++){
    if(obj[this.currentWord] !== undefined){
      this.currentWord = obj[this.currentWord].randomOne();
    } else {
      this.currentWord = 'the';
    }

    while(/[A-Z]/.test( this.currentWord[0]) && !this.currentWord.length){
      this.currentWord = obj[this.currentWord].randomOne();
      }

    if(this.wordCount < this.wordReset){
      this.currentSentence += ' '+this.currentWord;
      this.wordCount++;
    } else {
      this.currentSentence += ' '+this.currentWord+'\n';
      this.wordCount = 0;
      this.wordReset = 3 + Math.floor(Math.random()*4);

  }
  }
}
