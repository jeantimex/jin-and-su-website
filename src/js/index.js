$(document).ready(function() { //when the document is ready...

  //save selectors as variables to increase performance
  var $window = $(window);

  // other variables
  var windowHeight = $window.height();
  var windowWidth = $window.width();
  var panelHeight = $window.height();
  var panelWidth = $window.width();
  var positionOfBackground = (windowHeight/2) - (windowWidth/2);
  var pos = $window.scrollTop(); //position of the scrollbar
  var vertShift = 0;
  var horShift = 0;

  var $BG3a   = $('#intro-her');          //Chris Silas Neal
  var $BG3b   = $('#intro-her').find('.b');   //
  var $BG3c   = $('#intro-her').find('.c');   //
  var $BG3d   = $('#intro-her').find('.d');   //

  //apply the class "inview" to a section that is in the viewport
  $('section').bind('inview', function (event, visible) {
    if (visible == true) {
      $(this).addClass("inview");
    } else {
      $(this).removeClass("inview");
    }
  });

  // Called every pixel scrolled. Sets position of the background image element
  /*arguments: 
    orientation = alignment of bg image
    x = horizontal position of background
    windowHeight = height of the viewport
    pos = position of the scrollbar
    adjuster = adjust the position of the background
    inertia = how fast the background moves in relation to scrolling
  */
  function CalculateShift(valign, halign, pos, adjuster, vinertia, hinertia){
    var returnValue = '';
    var returnY = '';
    var returnX = '';

    // for vertical shift
    switch (valign) {
      case "top":
        returnY = (-((panelHeight + pos) - adjuster) * vinertia) + "px";
        break;
      case "middle":
        console.log("---------------------------");
        console.log("panelHeight: " + panelHeight);
        console.log("pos: " + pos);
        console.log("adjuster: " + adjuster);
        console.log("vinertia: " + vinertia);
        console.log("positionOfBackground: " + positionOfBackground);
        returnY = ((-((panelHeight + pos) - adjuster) * vinertia) + positionOfBackground)  + "px";
        break;
      case "bottom":
        returnY = ((-((panelHeight + pos) - adjuster) * vinertia) + (positionOfBackground * 2)) + "px";
        break;
      case "static":
        returnY = 50 + "%";
        break;
      default: ;//alert('defaulted');
    }

    // for horizontal shift
    switch (halign) {
      case "right":
        returnX = horShift * 2 + (((panelHeight + pos) - adjuster) * hinertia) + "px";
        break;
      case "center":
        returnX = horShift + (((panelHeight + pos) - adjuster) * hinertia) + "px";
        break;
      case "left":
        returnX = (((panelHeight + pos) - adjuster) * hinertia) + "px";
        break;
      case "static":
        returnX = 50 + "%";
        break;
      default: ;//alert('defaulted');
    }

    //put the string together & return it
    returnValue = returnX + ' ' + returnY;
    return returnValue;
  }

  // if the browser window is resized...
  function Reposition() {
    windowHeight = $window.height(); // get new height
    windowWidth = $window.width(); // get new width

    // set the panel height
    panelHeight = windowHeight;

    // figure out background size offset for middle placement
    positionOfBackground = (windowHeight / 2) - 500;

    $('.panel, .text').css('height', panelHeight);

    // set the panel width
    if (windowWidth > 1000) {
      panelWidth = 1000;
    } else {
      panelWidth = windowWidth;
    }
    horShift = (windowWidth - panelWidth) * .5;

    // scroll controller
    if (windowHeight > 800) {
      vertShift = ((windowHeight - panelHeight) / 2);
    } else {
      vertShift = 0;
    }
    $('body').css('padding-top', vertShift);
  }

  //function to be called whenever the window is scrolled or resized
  function Move() {
    if ($BG3a.hasClass("inview")) { // Intro Her - Chris Neal
      $BG3a.css({'background-position': CalculateShift('middle', 'static', pos, (panelHeight * 3),  .6, 0)}); // city
      $BG3b.css({'background-position': CalculateShift('middle', 'static', pos, (panelHeight * 3),  .4, 0), 'height': panelHeight}); // stars
      $BG3c.css({'background-position': CalculateShift('middle', 'static', pos, (panelHeight * 3),  .2, 0), 'height': panelHeight}); // moon
      $BG3d.css({'background-position': CalculateShift('middle', 'static', pos, (panelHeight * 3), -.4, 0), 'height': panelHeight}); // jess
    }
  }

  Reposition(); //Reposition various elements appropriately for the window size

  $window.resize(function(){ //if the user resizes the window...
    Reposition(); //reposition the navigation list so it remains vertically central
    Move(); //move the background images in relation to the movement of the scrollbar
  });   
  
  $window.bind('scroll', function(){ //when the user is scrolling...
    pos = $window.scrollTop();
    Move(); //move the background images in relation to the movement of the scrollbar
  });

});