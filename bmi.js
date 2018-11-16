const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://repertoire.bmi.com/Catalog.aspx?detail=writerid&page=1&fromrow=1&torow=25&keyid=232768&subid=0';
const fs = require('fs');
var output = '';
var tracks;

function isEmpty(string){
  if(string === ''){
    return true;
  } else {
    return false;
  }
}


rp(url).then(function(html){
    //success!
    tracks = $('td a', html);

  }).catch(function(err){
    console.error('There was a request denied bro! Slow down requests!')
  });

  // setTimeout(function(){

      // let currURL = 'https://repertoire.bmi.com/'+tracks[i].attribs.href;
      let currURL = 'https://repertoire.bmi.com/DetailView.aspx?detail=titleid&keyid=73208&ShowNbr=0&ShowSeqNbr=0&blnWriter=True&blnPublisher=True&blnArtist=True&blnAltTitles=True'
      console.log(currURL);
      rp(currURL).then(function(html){
        //GETS THE INFO
        console.log($('td', html));

      }).catch(function(err){
        console.error('There was a request denied bro! Slow down requests!')
      });
// }, 5000);





// .trackslist
