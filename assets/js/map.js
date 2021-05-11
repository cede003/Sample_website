// JavaScript Document

//DO NOT EDIT UNLESS LABELED "EDITABLE"
window.onload=function() {
    setTimeout(function() {
        window.scrollTo(0,1);
    }, 0);
    showDiv('lv1'); //EDITABLE: the default level to show when the window first loads

    var markInstance = new Mark(document.querySelectorAll(".directory"));
    var keywordInput = document.querySelector("input");
    function performMark() {
        var keyword = keywordInput.value;
        markInstance.unmark({
            done: function(){
                search();
                markInstance.mark(keyword);
            }
        });
    };
    keywordInput.addEventListener("input", performMark);
}

function finishedLoading(level) {
    var images = document.getElementById(level).getElementsByTagName('img');
    var imagesLoaded = 0;
    for(var i=0; i<images.length; i++) {
        if(images[i].complete) {
            imagesLoaded++;
        }
    }
    if(imagesLoaded >= images.length) {
        //hide loader after all images are loaded
        document.getElementById('loader').style.display='none';
    }
}

//highlights this specific icon on the map by hiding all other icons
//idNum = the one you want to highlight, input the number. e.g. for <img id="icon1"> and <img id="legend1">, input '1'
//level = the current level/floor. e.g. for "div id="icon-entry"> and <div id="legend-entry">, input 'entry'
function highlight(idNum, level) {
    var icons = document.getElementById('icon-'+level).getElementsByTagName('img');
    var legend = document.getElementById('legend-'+level).getElementsByTagName('img');
    //hide all
    for(var i=0; i<icons.length; i++) {
        icons[i].style.display='none';
        legend[i].style.opacity='0.5';
    }
    //now show this specific icon/legend
    icons.item(idNum).style.display='block';
    legend.item(idNum).style.opacity='1';
}

//toggles visibility only for this specific icon, does not affect visibility of other icons
function toggleVisibility(idNum, level) {
    var icons = document.getElementById('icon-'+level).getElementsByTagName('img');
    var legend = document.getElementById('legend-'+level).getElementsByTagName('img');
    //if this specific thing is visible, hide this specific icon
    if(icons.item(idNum).style.display!='none') {
        icons.item(idNum).style.display='none';
        legend.item(idNum).style.opacity='0.5';
    } else { //otherwise, show this specific icon/legend
        icons.item(idNum).style.display='block';
        legend.item(idNum).style.opacity='1';
    }
}

//for the 'show all' and 'hide all' button
//level = specifies current level to keep them independent of each other. e.g. if you 'hide all' for level 1 then you switch to level 3, level 3 is unaffected
//display = whether the icons on the map are visible or not ('block' vs 'none')
//opacity = the opacity of the images
function allButton(level, display, opacity) {
    var icons = document.getElementById('icon-'+level).getElementsByTagName('img');
    var legend = document.getElementById('legend-'+level).getElementsByTagName('img');
    for(var i=0; i<icons.length; i++) {
        icons[i].style.display=display;
        legend[i].style.opacity=opacity;
    }
}


//search/switch div function
function search() {
    var name = document.getElementById("searchForm").elements["searchItem"].value;
    var pattern = name.toLowerCase();
    var targetId = "";

    var containers = document.getElementById('divLinks').getElementsByTagName('div');
    var levelButtons = document.getElementById('levels').getElementsByTagName('img');
    var directories = document.getElementsByClassName("directory");
    for(var i=0; i<directories.length; i++) {
        var para = directories[i].querySelectorAll("p");
        var index = para[0].innerHTML.toLowerCase().indexOf(pattern);
        if(index!=-1 && pattern.length>0) {
            var targetId = directories[i].parentNode.id;
            //hide all containers
            for(var j=0; j<containers.length; j++) {
                containers[j].style.display='none';
            }
            //'unselect' all level buttons
            for(var k=0; k<levelButtons.length; k++) {
                levelButtons[k].style.opacity='0.5';
            }
            document.getElementById('button-'+targetId).style.opacity='1';
            document.getElementById('levels').style.display='block';

            document.getElementById(targetId).style.display='block';
            var divs = document.getElementById(targetId).getElementsByTagName('div');
            for(var n=0; n<divs.length; n++) {
                divs[n].style.display='block';
            }
        }
    }
}


//switches between 'containers' aka levels
function showDiv(level) {
    var containers = document.getElementById('divLinks').getElementsByTagName('div');
    var levelButtons = document.getElementById('levels').getElementsByTagName('img');
    //hide all containers
    for(var i=0; i<containers.length; i++) {
        containers[i].style.display='none';
    }
    //'unselect' all level buttons
    for(var i=0; i<levelButtons.length; i++) {
        levelButtons[i].style.opacity='0.5';
    }

    document.getElementById('loader').style.display='block';
    finishedLoading(level);

    //show content
    document.getElementById('button-'+level).style.opacity='1';
    document.getElementById(level).style.display='block';
    document.getElementById('levels').style.display='block';
    document.getElementById('directory-'+level).style.display='block';
    document.getElementById('icon-'+level).style.display='block';
    document.getElementById('legend-'+level).style.display='block';
}