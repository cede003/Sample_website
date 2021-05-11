// JavaScript Document
var index = 3;

function changePic(sign) {
    var pics = document.getElementById('grid-container').getElementsByTagName('img');
    if(sign == "+"){
        index++;
    }else{
        index--;
    }
    if(index < 0){
        index = 0;
        return false;
    }
    if(index >= pics.length){
        index = pics.length -1;
        return false;
    }
    for(var i=0; i<pics.length; i++) {
        if(i == index){
            pics[i].style.display='block';
        }else{
            pics[i].style.display='none';
        }
    }
}