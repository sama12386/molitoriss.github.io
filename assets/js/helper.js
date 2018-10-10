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

function setPageNumber(num) {
  document.getElementById("current-pg").innerText = num + 1;
}

function setTotalPages(num) {
  document.getElementById("total-pg").innerText = num;
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
  setPageNumber(current);
  setTotalPages(data.length);
}

document.getElementById("next").addEventListener("click", function(){
  current += 1;
  if (current < 0) {
    current = 0;
    return;
  } else if (current >= data.length) {
    current = data.length - 1;
    return;
  }
  var plot = data[current]
  setAll(plot);
});

document.getElementById("previous").addEventListener("click", function(){
  current -= 1;
  if (current < 0) {
    current = 0;
  } else if (current >= data.length) {
    current = data.length - 1;
  }
  current %= data.length;
  var plot = data[current]
  setAll(plot);
});

var plot = data[0];
setAll(plot);