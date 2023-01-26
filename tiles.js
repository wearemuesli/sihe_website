layers = document.getElementsByClassName("tile");
var userscrolled = 0;
var scrollingTime = 0;
var iframes = document.getElementsByClassName('iframes');
var scroller = document.getElementById('scroller');
var isFullyScrolled = false;
var tileMode = "scroll";
var lastScrollTop = 0;






positionTitleLines();

window.addEventListener("resize", positionTitleLines());

scroller.addEventListener('scroll', function(event)
{
    scrollTile(event);
});


var intervalId = window.setInterval(function(){
    randomFavicon();
}, 1000);




function spawnTile() {
    
    var newTile = document.createElement('div');
    newTile.className = 'tile';

    var tileYpos = (window.innerHeight);
    var tileLeftMargin = getRandomFloat(20, 80);
    var tileRightMargin = 100 - tileLeftMargin;
    var tileSpeed = getRandomFloat(1, 2);

    newTile.setAttribute("data-top", tileYpos);
    newTile.setAttribute("data-speed", tileSpeed);
    newTile.setAttribute("tile-scroll-value", 0);
    newTile.style.top = tileYpos + "px";
    newTile.style.left = tileLeftMargin + "%";
    newTile.style.transform = "translateX(-" + tileRightMargin + "%)" 

    document.getElementById('tiles-container').appendChild(newTile);

    var tileImage = document.createElement('img');
    tileImage.src = "tiles/tile_" + getRandomInt(1, 20).toString() + ".png";
    tileImage.className = 'tile-image';
    newTile.appendChild(tileImage)
};


var scrollTimer = -1;


scrollTile = function(event) {

    var scrollAmount = -(lastScrollTop - scroller.scrollTop);
    lastScrollTop = scroller.scrollTop;

    var allTiles = document.getElementsByClassName("tile");

    for (var i = 0; i < allTiles.length; i++) {
        tile = allTiles[i];
        var newScrollValue = 0;

        newScrollValue = parseInt(tile.getAttribute("tile-scroll-value")) + scrollAmount;

        var speed = tile.getAttribute('data-speed');
        var top = tile.getAttribute('data-top');
        tile.style.top = (top - newScrollValue * speed) + "px";
        tile.setAttribute("tile-scroll-value", newScrollValue);


        if(tile.firstChild.classList.contains("shaking") == false)
        {
            console.log("adding");
            tile.firstChild.classList.add("shaking");
        }

        if (scrollTimer != -1)
        clearTimeout(scrollTimer);

        scrollTimer = window.setTimeout("removeWiggle()", 25);
    }
    
    let tilesNumber = document.getElementById("tiles-container").childNodes.length;

    if (tilesNumber < 20) {
        if (scroller.scrollTop % 17 == 0) 
        {
            spawnTile()        
        }
    }
};


function removeWiggle() {
    var allTiles = document.getElementsByClassName("tile");
    console.log("removing");
    for (var i = 0; i < allTiles.length; i++) 
    {
        tile = allTiles[i];
        tile.firstChild.classList.remove("shaking");
    }
}




function getRandomFloat(min, max) {
    number = Math.random() * (max - min) + min;
    return number;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function positionTitleLines() {

    var lines = document.getElementsByClassName("line");

    for (var i = 0; i < lines.length; i++) {

        line = lines[i];

        var lineContainer = line.parentNode.parentNode;

        line.style.marginTop = (lineContainer.clientHeight -10) / 2 + "px";
    }
};

function showImageFocus(sourgeImage) {
    document.getElementById('image-focus-section').style.display = 'block';
    var image = document.getElementById('image-focus');
    image.src = sourgeImage;
    image.style.marginTop = (window.innerHeight - image.clientHeight) / 2 +'px';
};

function hideImageFocus() {
    document.getElementById('image-focus-section').style.display = 'none';
    document.getElementById('image-focus-section').style.marginTop = 'none';
};

function randomFavicon() {
    var link = document.querySelector("link[rel~='icon']");
    link.href = "tiles/tile_" + getRandomInt(1, 20).toString() + ".png";
};




