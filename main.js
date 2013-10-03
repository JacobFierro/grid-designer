
var rows = 35,
    cols = 50,
    sideLength = 30,
    gutter = 2,
    margin = { top: 50, right: 0, bottom: 100, left: 30 },
    width = (sideLength * cols + (gutter * cols)),
    height = (sideLength * rows + (gutter * rows)),
    gridSize = Math.floor(width / 24),
    colors = {
      fill : "#4c5c64",
      empty : "#ffffff",
      fillHover : "#596970",
      emptyHover : "#eeeeee"
    },
    gridgridCanvas = null;


function getBaseData() {
  var arr = [];

  for (var i = 1; i <= rows; i++) {
    for (var c = 1; c <= cols; c++) {
      arr.push({
        "row" : i,
        "col" : c,
        "color" : colors.fill
      });
    };
  };

  return arr;
}

function getToggleColor(cssHex) {
  return (cssHex === colors.fillHover) ? colors.empty : colors.fill;
}

function getHoverColor(cssHex) {
  return (cssHex === colors.fill) ? colors.fillHover : colors.emptyHover;
}

function getFillColor(cssHex) {
  if (cssHex === colors.fill) {
    return colors.fill;
  }
  return (cssHex === colors.fillHover) ? colors.fill : colors.empty;
}

function getOffset(pos) {
  var pos = pos - 1;
  var offset = (pos) * sideLength + (gutter * pos);
  return offset;
}

function save() {
  var arr = [];
  gridCanvas.each(function(data){
    arr.push(data);
  });
  console.log(JSON.stringify(arr));
}

function clearGrid() {
  $('#chart').html('');
}

function initializeGrid() {
  return d3.select('#chart').append('svg')
                .attr("width", width)
                .attr("height", height)
                .attr("class", "chart");
}

function loadGrid(grid, data) {
  gridCanvas = grid.selectAll(".col")
          .data(data)
          .enter().append("rect")
          .attr("x", function(d) { return getOffset(d.col); })
          .attr("y", function(d) { return getOffset(d.row); })
          .attr("class", "box")
          .attr("width", sideLength)
          .attr("height", sideLength)
          .attr('data-col', function(d) { return d.col; })
          .attr('data-row', function(d) { return d.row; })
          .style("fill", function(d) { return d.color; })
          .on('mouseover', function() {
            this.style.fill = getHoverColor(this.style.fill);
          })
          .on('mouseout', function() {
            this.style.fill = getFillColor(this.style.fill);
          })
          .on("click", function(box){
            box.color = getToggleColor(this.style.fill);
            this.style.fill = getToggleColor(this.style.fill);
          });
}

function resetGrid(data) {
  clearGrid();
  var grid = initializeGrid();
  loadGrid(grid, data);
}

function loadFromFile() {
  d3.json('documents/bob_the_robot.json', function(error, data){
    if (!!error) throw error;
    resetGrid(data);
  });
}

function initialize() {
  resetGrid(getBaseData());
}


$(function() {
  $('#save').on('click', function() {
    save();
  });

  $('#load').on('click', function() {
    loadFromFile();
  });

  initialize();
});










