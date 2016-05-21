/* 배너 자동배치 알고리즘 */
var container;
var popupContainer;
var width;
var height;

var banner_width = 79.2;
var banner_height = 238.7;
var banner_margin = 30;
var banner_num = 51;

var bannerBoxWidth = 206;
var bannerBoxHeight = 137;

var buttonId = ["introduce_button", "tester_button", "purchase_button"];
var buttonLink = ["./details.html#introduce", "./details.html#tester", "./details.html#purchase"];

var bannerEmptyNum = 12;

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
        .attr("src", "./images/banner/banner_" + (i+1) + ".png")
        .attr("data-number", i)
        .click(function(e) {
          if ($(".popup").length === 0) {
            e.stopPropagation();
            drawBannerPopup($(this).data('number'));
          }
        })
        .appendTo($(container));
    }
  }
}

function drawPopup(src) {
  popup = document.createElement("img");
  $(popup)
    .addClass("popup animated fadeInDown")
    .attr("src", src)
    .appendTo($(popupContainer));
  $(container).addClass("blur");
  $(container).click(function() {
    cleanPopup(); 
  });
}

function drawBannerPopup(index) {
  drawPopup("./images/banner_large/banner_large_" + (index+1) + ".png");
}

function drawEmptyBannerPopup(index) {
  drawPopup("./images/banner_empty/banner_empty_large_" + (index+1) + ".png");
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

  for (var i=0; i<bannerEmptyNum; i++) {
    $("#banner_empty_" + i).remove();
  }
}

function drawButton() {
  if (isBannerOpen) { 
    /* draw buttons linked to other pages */

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

    /* draw empty banners */

    var i_offset = buttonId.length;
    for (var i=0; i<bannerEmptyNum; i++) {
      var x_offset = banner_width * Math.random() * 1.0;
      var y_offset = banner_height * Math.random() * 1.0;

      var x = bannerGrid[i+i_offset] % banner_rows * (banner_width + banner_margin * 2) + x_offset;
      var y = Math.floor(bannerGrid[i+i_offset] / banner_rows) * (banner_height + banner_margin * 2) + y_offset;

      button = document.createElement("img");
      $(button)
        .addClass("bannerEmpty button menu animated fadeInDown")
        .attr("id", "banner_empty_" + i)
        .attr("src", "./images/banner_empty/banner_empty_" + (i+1) + ".png")
        .attr("style", "position: absolute; left: " + x + "px; top: " + y + "px; z-index: 100;")
        .attr("data-number", i)
        .click(function(e) {
          if ($(".popup").length === 0) {
            e.stopPropagation();
            drawEmptyBannerPopup($(this).data("number"));
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
  isBannerOpen = false;
  
  // draw banner box
  bannerBox = document.createElement("img");
  var x = (width - bannerBoxWidth) / 2;
  var y = (height - bannerBoxHeight) / 2;
  $(bannerBox)
    .addClass("button bannerBox full")
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
