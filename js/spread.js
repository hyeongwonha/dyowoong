/* 배너 자동배치 알고리즘 */
var container;
var width;
var height;

var banner_width = 108;
var banner_height = 326;
var banner_margin = 40;
var banner_num = 80;

var 

var bannerBoxWidth = 206;
var bannerBoxHeight = 137;

function updateDimensions() {
  width = $(container).width();
  height = $(container).height();
  banner_rows = Math.floor(width / (banner_width + banner_margin * 2));
  banner_cols = Math.ceil(banner_num / banner_rows);
}

var grid = [];
for(var i=0; i<banner_num; i++) {
  grid.push(i);
}

$(window).resize(function() {
  updateDimensions();
  clean();
  drawBanner(container);
});

function shuffle(array) {
  var counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    var index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function spread(container) {
  shuffle(grid);

  drawBanner(container);
}

function drawBanner(container) {
  for (i=0; i<banner_num; i++) {
    x_offset = banner_width * Math.random() * 0.7;
    y_offset = banner_height * Math.random() * 0.8;

    x = grid[i] % banner_rows * (banner_width + banner_margin * 2) + x_offset;
    y = Math.floor(grid[i] / banner_rows) * (banner_height + banner_margin * 2) + y_offset;

    banner = document.createElement("img");
    animation_list = ["fadeInDown fast", "fadeInDown normal", "fadeInDown slow"];
    animation = animation_list[i%2];
    $(banner)
      .addClass("banner animated " + animation)
      .attr("id", "banner" + i)
      .attr("style", "position: absolute; left: " + x + "px; top: " + y + "px;")
      .attr("src", "./images/banner.png")
      .appendTo($(container));
  }
}

function clean() {
  for (var i=0; i<banner_num; i++) {
    $("#banner" + i).remove();
  }
}

function drawMenu() {
  var menuImg = ["./images/introduce_button.png", "./images/tester_button.gif", "./images/purchase_button.png"];
  var x = ["20%", "70%", "40%"];
  var y = ["20%", "40%", "70%"];
  var size = ["80%", "70%", "70%"];
  for (var i=0; i<3; i++) {
    menu = document.createElement("a");
    $(menu)
      .addClass("menu animated fadeInDown")
      .html("<img src=\"" + menuImg[i] + "\" style=\"width: " + size[i] + ";\"/>")
      .attr("style", "position: fixed; left: " + x[i] + "; top: " + y[i] + "; z-index: 100;")
      .appendTo($(container));
  }
}

function init(container) {
  this.container = container;
  updateDimensions();
  spread(container);
  drawMenu();
  
  // draw banner box
  bannerBox = document.createElement("img");
  var x = (width - bannerBoxWidth) / 2;
  var y = (height - bannerBoxHeight) / 2;
  $(bannerBox)
    .addClass("bannerBox")
    .appendTo($(container))
    .click(function() {
      if ($(bannerBox).hasClass("full")) {
        spread(container);
        $(bannerBox).removeClass("full");
        $(".menu").removeClass("gone");
      } else {
        clean();
        $(bannerBox).addClass("full");
        $(".menu").addClass("gone");
      }
    });
}
