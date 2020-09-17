var events = [
  {
    "name": "",
    "year": "",
    "venue": "",
    "blurb": "",
    "description": "",
    "images": [
      "theatre/2019comedy/comedy1.jpg",
      "theatre/2019comedy/comedy4.jpg",
      "theatre/2019comedy/comedy3.jpg",
      "theatre/2019comedy/comedy8.jpg",
      "theatre/2019comedy/comedy5.jpg",
      "theatre/2019comedy/comedy10.jpg"
    ]
  }
];

var NAME = "name";
var YEAR = "year";
var POSITION = "position";
var IMAGES = "images";
var COLUMN = "column";
var DESCRIPTION = "description";

for (var i = 0; i < events.length; i++) {
  var event = events[i];
  var name = event[NAME];
  var year = event[YEAR];
  var position = event[POSITION];
  var imagePath = "assets/img/" + event[IMAGES][0];
  var subtitle = year + " - " + position;
  
  var gridSquare = createGridSquare(name, subtitle, imagePath);
  gridSquare.id = i;

  gridSquare.addEventListener("click", function(e){
    var eventNumber = Number(e.target.id);
    showModal(events[eventNumber]);
  });

  var col = event[COLUMN];
  getColumn(col).appendChild(gridSquare);
}

function hideModal() {
  var overlay = document.getElementById("modal-overlay");
  var modal = document.getElementById("modal");
  modal.style.opacity = 0;
  overlay.style.opacity = 0;
  setTimeout(function (){
    modal.style.zIndex = -5;
    overlay.style.zIndex = -5;
  }, 700)
}

function showModal(event) {
  var name = event[NAME];
  var year = event[YEAR];
  var position = event[POSITION];
  var description = event[DESCRIPTION];
  var imagePath = "assets/img/" + event[IMAGES][0];
  var images = event[IMAGES];
  var subtitle = event["venue"];
  var overlay = document.getElementById("modal-overlay");
  var modal = document.getElementById("modal");
  document.getElementById("modal-title").innerText = name;
  document.getElementById("modal-subtitle").innerText = subtitle;
  document.getElementById("modal-blurb").innerText = event["blurb"];
  document.getElementById("modal-title-small").innerText = name;
  document.getElementById("modal-subtitle-small").innerText = subtitle;
  document.getElementById("modal-description").innerHTML = description;
  document.getElementById("modal-image-inner").src = imagePath;
  console.log(imagePath);
  setImageGallery(images);
  modal.style.opacity = 1;
  modal.style.zIndex = 5;
  overlay.style.opacity = 1;
  overlay.style.zIndex = 5;
}

function setImageGallery(images) {
  var modalRow = document.getElementById("modal-row");
  modalRow.innerHTML = "";
  for (var i = 0; i < images.length; i++ ) {
    var image = document.createElement("div");
    image.classList.add("image");
    var imagePath = images[i];
    image.setAttribute('data-path', imagePath);
    image.style.backgroundImage = "url(assets/img/" + imagePath + ")";
    image.addEventListener("click", function(e) {
      var style = window.getComputedStyle(e.target);
      document.getElementById("modal-image-inner").src = "assets/img/" + e.target.getAttribute('data-path');
      console.log(e.target.getAttribute('data-path'));
    });
    modalRow.appendChild(image);
  }
}


function createGridSquare(title, subtitle, imagePath) {
  var gridSquare = document.createElement("div");
  var titleDiv = document.createElement("div");
  var title = document.createElement("h1");
  title.innerText = name;
  titleDiv.appendChild(title);
  gridSquare.appendChild(titleDiv);
  gridSquare.classList.add("page");
  gridSquare.style.backgroundImage = "url(" + imagePath + ")";
  return gridSquare;
}

function getColumn(colName) {
  var column = null;
  if (col == "1") {
    column = document.getElementById("col-1");
  } else if (col == "2") {
    column = document.getElementById("col-2");
  } else if (col == "3") {
    column = document.getElementById("col-3");
  } else if (col == "4") {
    column = document.getElementById("col-4");
  }
  return column
}

var yTransform1 = 0;
document.getElementById("col-1").addEventListener("wheel", function(e) {
  var transform = getTransform(e.deltaY);
  yTransform1 += -1 * transform;
  yTransform2 += -1 * transform / 4;
  yTransform3 += -1 * transform / 8;
  setTransforms();
});

var yTransform2 = 0;
document.getElementById("col-2").addEventListener("wheel", function(e) {
  var transform = getTransform(e.deltaY);
  yTransform1 += -1 * transform / 4;
  yTransform2 += -1 * transform;
  yTransform3 += -1 * transform / 4;
  setTransforms();
});

var yTransform3 = 0;
document.getElementById("col-3").addEventListener("wheel", function(e) {
  var transform = getTransform(e.deltaY);
  yTransform1 += -1 * transform / 8;
  yTransform2 += -1 * transform / 4;
  yTransform3 += -1 * transform;
  setTransforms();
});

function getTransform(dy) {
  if (dy < 1 && dy > -1) {
    return dy * 60;
  } else {
    return dy;
  }
}

function dontUnderflow() {
  if (yTransform1 > 0) {
    yTransform1 = 0;
  }
  if (yTransform2 > 0) {
    yTransform2 = 0;
  }
  if (yTransform3 > 0) {
    yTransform3 = 0;
  }
}

function dontOverflow() {
  var col1Elements = document.querySelectorAll("#col-1 .page").length;
  var col2Elements = document.querySelectorAll("#col-2 .page").length;
  var col3Elements = document.querySelectorAll("#col-3 .page").length;
  var screenHeight = window.innerHeight - 170;
  var screenWidth = window.innerWidth;
  var cols = 3;
  if (screenWidth < 1000) {
    cols = 2;
  } else if (screenWidth < 700) {
    cols = 1;
  }
  var boxHeight = (((screenWidth) / cols) * 2 / 3) + 7;
  if ((yTransform1 - screenHeight) < -1 * (boxHeight * col1Elements)) {
    yTransform1 = -1 * ((boxHeight * col1Elements) - screenHeight);
  }
  if ((yTransform2 - screenHeight) < -1 * (boxHeight * col2Elements)) {
    yTransform2 = -1 * ((boxHeight * col2Elements) - screenHeight);
  }
  if ((yTransform3 - screenHeight) < -1 * (boxHeight * col3Elements)) {
    yTransform3 = -1 * ((boxHeight * col3Elements) - screenHeight);
  }
}

function setTransforms() {
  if (window.innerWidth < 700) {
    return;
  }
  dontOverflow();
  dontUnderflow();

  var column1 = document.getElementById("col-1");
  var column2 = document.getElementById("col-2");
  var column3 = document.getElementById("col-3");

  column1.style.transform = "translateY(" + yTransform1 + "px)";
  column2.style.transform = "translateY(" + yTransform2 + "px)";
  column3.style.transform = "translateY(" + yTransform3 + "px)";
  // For Webkit
  column1.style.webkitTransform = "translateY(" + yTransform1 + "px)";
  column2.style.webkitTransform = "translateY(" + yTransform2 + "px)";
  column3.style.webkitTransform = "translateY(" + yTransform3 + "px)";
  // For Opera
  column1.style.oTransform = "translateY(" + yTransform1 + "px)";
  column2.style.oTransform = "translateY(" + yTransform2 + "px)";
  column3.style.oTransform = "translateY(" + yTransform3 + "px)";
}

function zeroTransforms() {
  yTransform1 = 0;
  yTransform2 = 0;
  yTransform3 = 0;

  var column1 = document.getElementById("col-1");
  var column2 = document.getElementById("col-2");
  var column3 = document.getElementById("col-3");

  column1.style.transform = "translateY(" + yTransform1 + "px)";
  column2.style.transform = "translateY(" + yTransform2 + "px)";
  column3.style.transform = "translateY(" + yTransform3 + "px)";
  // For Webkit
  column1.style.webkitTransform = "translateY(" + yTransform1 + "px)";
  column2.style.webkitTransform = "translateY(" + yTransform2 + "px)";
  column3.style.webkitTransform = "translateY(" + yTransform3 + "px)";
  // For Opera
  column1.style.oTransform = "translateY(" + yTransform1 + "px)";
  column2.style.oTransform = "translateY(" + yTransform2 + "px)";
  column3.style.oTransform = "translateY(" + yTransform3 + "px)";
}

document.getElementById("modal-overlay").addEventListener("click", function() {
  hideModal();
});

window.addEventListener("resize", function(){
  console.log("Resizing");
  setTransforms();
  if (window.innerWidth < 700) {
    zeroTransforms()
  }
  window.scrollTo(0,0);
});
