$(document).ready(function() { //when the document is ready...

  //save selectors as variables to increase performance
  var $window = $(window);

  var windowHeight = $window.height(); //get the height of the window

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

  }

  //function to be called whenever the window is scrolled or resized
  function Move() {
    var pos = $window.scrollTop(); //position of the scrollbar

    // TODO
    // ...
  }

  Reposition(); //Reposition various elements appropriately for the window size

  $window.resize(function(){ //if the user resizes the window...
    Move(); //move the background images in relation to the movement of the scrollbar
    Reposition(); //reposition the navigation list so it remains vertically central
  });   
  
  $window.bind('scroll', function(){ //when the user is scrolling...
    Move(); //move the background images in relation to the movement of the scrollbar
  });

});