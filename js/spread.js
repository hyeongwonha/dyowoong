/* 배너 자동배치 알고리즘 */
var container;
var popupContainer;
var width;
var height;

var banner_width = 79.2;
var banner_height = 238.7;
var banner_margin = 30;
var banner_num = 80;

var bannerBoxWidth = 206;
var bannerBoxHeight = 137;

var buttonId = ["introduce_button", "tester_button", "purchase_button"];
var buttonLink = ["./details.html#introduce", "./details.html#tester", "./details.html#purchase"];
var emptyBannerId = ["banner_empty_1", "banner_empty_2", "banner_empty_3"];

var isBannerOpen;

function updateDimensions() {
  width = $(container).width();
  banner_rows = Math.floor(width / (banner_width + banner_margin * 2));
  banner_cols = Math.ceil(banner_num / banner_rows);
  height = (banner_cols + 1) * (banner_height + banner_margin * 2);
  $(container).height(height);
}

var bannerGrid = [];
var buttonGrid = [];
for(var i=0; i<banner_num; i++) {
  bannerGrid.push(i);
  buttonGrid.push(i);
}

$(window).resize(function() {
  updateDimensions();
  clean();
  drawBanner(container);
  drawButton();
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
  shuffle(bannerGrid);

  drawBanner(container);
  drawButton();
}

function drawBanner(container) {
  if (isBannerOpen) {
    for (i=0; i<banner_num; i++) {
      var x_offset = banner_width * Math.random() * 1.2;
      var y_offset = banner_height * Math.random() * 1.2;

      var x = bannerGrid[i] % banner_rows * (banner_width + banner_margin * 2) + x_offset;
      var y = Math.floor(bannerGrid[i] / banner_rows) * (banner_height + banner_margin * 2) + y_offset;

      banner = document.createElement("img");
      animation_list = ["fadeInDown fast", "fadeInDown normal", "fadeInDown slow"];
      animation = animation_list[i%2];
      $(banner)
        .addClass("button banner animated " + animation)
        .attr("id", "banner" + i)
        .attr("style", "position: absolute; left: " + x + "px; top: " + y + "px;")
        .attr("src", "./images/banner.png")
        .click(function(e) {
          if ($(".popup").length === 0) {
            e.stopPropagation();
            drawPopup(1);
          }
        })
        .appendTo($(container));
    }
  }
}

function drawPopup(index) {
  popup = document.createElement("img");
  $(popup)
    .addClass("popup animated fadeInDown")
    .attr("src", "./images/banner_large_" + index + ".png")
    .appendTo($(popupContainer));
  $(container).addClass("blur");
  $(container).click(function() {
    cleanPopup(); 
  });
}

function cleanPopup() {
  $(popupContainer).empty();
  $(container).removeClass("blur");
}

function clean() {
  for (var i=0; i<banner_num; i++) {
    $("#banner" + i).remove();
  }

  for (var i=0; i<buttonId.length; i++) {
    $("#" + buttonId[i]).remove();
  }

  for (var i=0; i<emptyBannerId.length; i++) {
    $("#" + emptyBannerId[i]).remove();
  }
}

function drawButton() {
  if (isBannerOpen) { 
    for (var i=0; i<buttonId.length; i++) {
      var x_offset = banner_width * Math.random() * 1.0;
      var y_offset = banner_height * Math.random() * 1.0;

      var x = bannerGrid[i] % banner_rows * (banner_width + banner_margin * 2) + x_offset;
      var y = Math.floor(bannerGrid[i] / banner_rows) * (banner_height + banner_margin * 2) + y_offset;

      menu = document.createElement("a");
      $(menu)
        .addClass("menu animated fadeInDown")
        .attr("id", buttonId[i])
        .html("<img class=\"button\" src=\"./images/" + buttonId[i] + ".gif\" />")
        .attr("style", "position: absolute; left: " + x + "px; top: " + y + "px; z-index: 100;")
        .attr("href", buttonLink[i])
        .appendTo($(container));
    }

    var i_offset = buttonId.length;
    for (var i=0; i<emptyBannerId.length; i++) {
      var x_offset = banner_width * Math.random() * 1.0;
      var y_offset = banner_height * Math.random() * 1.0;

      var x = bannerGrid[i+i_offset] % banner_rows * (banner_width + banner_margin * 2) + x_offset;
      var y = Math.floor(bannerGrid[i+i_offset] / banner_rows) * (banner_height + banner_margin * 2) + y_offset;

      button = document.createElement("img");
      $(button)
        .addClass("button menu animated fadeInDown")
        .attr("id", emptyBannerId[i])
        .attr("src", "./images/" + emptyBannerId[i] + ".gif")
        .attr("style", "position: absolute; left: " + x + "px; top: " + y + "px; z-index: 100;")
        .click(function(e) {
          if ($(".popup").length === 0) {
            e.stopPropagation();
            drawPopup(1);
          }
        })
        .appendTo($(container));
    }
  }
}

function init(container, popupContainer) {
  this.container = container;
  this.popupContainer = popupContainer;
  updateDimensions();
  isBannerOpen = true;
  spread(container);
  
  // draw banner box
  bannerBox = document.createElement("img");
  var x = (width - bannerBoxWidth) / 2;
  var y = (height - bannerBoxHeight) / 2;
  $(bannerBox)
    .addClass("button bannerBox")
    .appendTo($(container))
    .click(function() {
      if (!isBannerOpen) {
        isBannerOpen = true;
        spread(container);
        $(bannerBox).removeClass("full");
      } else {
        isBannerOpen = false;
        clean();
        $(bannerBox).addClass("full");
      }
    });
}
