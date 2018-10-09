var current = 0;

function changePDF(path) {
  var pdfViewer = document.getElementById("pdf-embed");
  pdfViewer.setAttribute(attr, path);
}

function setTitle(title) {
  document.getElementById("plot-title").innerText = title;
}

function setSubtitle(subtitle) {
  document.getElementById("plot-subtitle").innerText = subtitle;
}

function setDescription(description) {
  document.getElementById("plot-description").innerText = description;
}

function setAll(plot) {
  var title = plot["title"];
  var subtitle = plot["subtitle"];
  var path = plot["path"];
  var description = plot["description"];

  setTitle(title);
  setSubtitle(subtitle);
  setDescription(description);
  changePDF(path);
}

document.getElementById("next").addEventListener("click", function(){
  current += 1;
  if (current < 0) {
    current = 0;
  }
  current %= data.length;
  var plot = data[current]
  setAll(plot);
});

document.getElementById("previous").addEventListener("click", function(){
  current -= 1;
  if (current < 0) {
    current = 0;
  }
  current %= data.length;
  var plot = data[current]
  setAll(plot);
});

var plot = data[0];
setAll(plot);