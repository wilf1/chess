var audio = new Audio("chesssound.mp3");
var audio2 = new Audio("chesssound2.mp3");
var box = document.getElementById("game");
var width = window.innerWidth;
var height = window.innerHeight;
var lastmove1;
var lastmove2;
var lastmove1s = new Array (0);
lastmove1s [0] = 64;
var lastmove2s = new Array (0);
lastmove2s [0] = 64;
var boards = new Array (0);
box.setAttribute("style", "padding-left: " + Math.floor((width - 576) / 2) + "px; padding-top: " + Math.floor((height - 568) / 2) + "px;" + "px; padding-right: " + (width - 568) / 2 + "px;");
var svg = document.getElementById("gamearea");
var rect=function(h,w,fill){
  var NS="http://www.w3.org/2000/svg";
  var SVGObj= document.createElementNS(NS,"rect");
  SVGObj.width.baseVal.value=w;
  SVGObj.height.baseVal.value=h;
  SVGObj.setAttribute("height",h);
  //SVGObj.setAttribute("stroke", "black");
  //SVGObj.setAttribute("stroke-width", 4);
  //SVGObj.setAttribute("stroke-linejoin", "round");
  SVGObj.style.fill=fill;
  return SVGObj;
}
var theme = 1;
var backcolour;

//var backcolour = "#595959";
//var backcolour = "rgb(86, 68, 59)";
//var darksquare = "rgb(62, 39, 27)";
//default
var darksquare;
var lightsquare;
var lightpiece;
var darkpiece;
var lastmovelight;
var lastmovedark;
var clicklight;
var clickdark;
var updatecolours = function (theme)
{
  if (theme == 1)
  {
    document.body.style.background = "rgb(39, 36, 36)";
    backcolour = "rgba(31, 31, 31,0)";
    darksquare = "rgb(81, 51, 30)";
    lightsquare ="rgb(156, 113, 58)";
    lightpiece = "rgb(215,215,215)";
    darkpiece = "rgb(5,5,5)";
    lastmovelight = "#767676";
    lastmovedark = "#343434";
    clicklight = "#0072de";
    clickdark = "#003b74";
  }
  if (theme == 4)
  {
    backcolour = "rgba(250, 250, 250, 0)";
    document.body.style.background = "#181818";
    darksquare = "rgb(78, 115, 55)";
    lightsquare ="rgb(157, 177, 97)";
    lightpiece = "rgb(255, 255, 255)";
    darkpiece = "rgb(5,5,5)";
    lastmovelight = "#757575";
    lastmovedark = "#343434";
    clicklight = "#ebe41f";
    clickdark = "#ebe41f";
  }
  if (theme == 2)
  {
    backcolour = "rgba(31, 31, 31,0)";
    document.body.style.background = "#d7d7d7";
    darksquare = "rgb(83, 38, 37)";
    lightsquare ="rgb(108, 108, 108)";
    lightpiece = "rgb(215,215,215)";
    darkpiece = "rgb(5,5,5)";
    lastmovelight = "#9a4343";
    lastmovedark = "#7e1b1b";
    clicklight = "#0072de";
    clickdark = "#003b74";
  }
  if (theme == 3)
  {
    backcolour = "rgba(31, 31, 31,0)";
    document.body.style.background = "#1e1e1e";
    darksquare = "rgb(64, 64, 64)";
    lightsquare ="rgb(122, 122, 122)";
    lightpiece = "rgb(243, 243, 243)";
    darkpiece = "rgb(5,5,5)";
    lastmovelight = "#c65d26";
    lastmovedark = "#cf4801";
    clicklight = "#c65d26";
    clickdark = "#cf4801";
  }
  if (theme == 5)
  {
    backcolour = "rgba(31, 31, 31,0)";
    document.body.style.background = "#1e1e1e";
    darksquare = "rgb(77, 139, 203)";
    lightsquare ="rgb(210, 211, 213)";
    lightpiece = "rgb(75, 75, 75)";
    darkpiece = "rgb(5,5,5)";
    lastmovelight = "#ffe027";
    lastmovedark = "#b69328";
    clicklight = "#ed8ebb";
    clickdark = "#c1387d";
  }
  if (theme == 6)
  {
    backcolour = "rgba(31, 31, 31,0)";
    document.body.style.background = "#cbcbcb";
    darksquare = "rgb(14, 14, 14)";
    lightsquare ="rgb(41, 39, 99)";
    lightpiece = "rgb(237, 237, 237)";
    darkpiece = "rgb(103, 103, 103)";
    lastmovelight = "#4b2fb3";
    lastmovedark = "#1f1f1f";
    clicklight = "#8e75e3";
    clickdark = "#8d8d8d";
  }
}


//var darksquare = "rgb(75, 62, 56)";
//var lightsquare = "rgb(159, 132, 97)";

//greenwhite
//

var turn = 1;
//var lastmovelight = "#0072de";
//var lastmovedark = "#003b74";
//steel
//var lastmovelight = "#748798";
//var lastmovedark = "#31363a";
//grey

//var clicklight = "#46bc00";
//var clickdark = "#308000";

//var darksquare = "rgb(130, 145, 124)";
//var lightsquare ="rgb(46, 71, 46)";
var pawn = function (x, y, size, colour)
{
  var NS="http://www.w3.org/2000/svg";
  var SVGObj= document.createElementNS(NS,"polygon");
  var xpoints = [-10, 10, 10, 5, 15, -15, -5, -10, -10];
  var ypoints = [-22, -22, -1, -1, 25, 25, -1, -1, -22];
  var points = "";
  for (var i = 0; i < xpoints.length;i++)
  {
    points += xpoints[i] * size + x;
    points += ",";
    points += ypoints[i] * size + y;
    points += " ";
  }

  SVGObj.style.fill = colour;
  SVGObj.setAttribute("points", points);
  return SVGObj;
};
var knight = function (x, y, size, colour)
{
  var NS="http://www.w3.org/2000/svg";
  var SVGObj= document.createElementNS(NS,"polygon");
  var xpoints = [-20, -14.4, 20, 20, 1.6, 20, -20];
  var ypoints = [-25, -18, -18, 2, 2, 25, 25];
  var points = "";
  for (var i = 0; i < xpoints.length;i++)
  {
    points += xpoints[i] * size + x;
    points += ",";
    points += ypoints[i] * size + y;
    points += " ";
  }

  SVGObj.style.fill = colour;
  SVGObj.setAttribute("points", points);
  return SVGObj;
};
var bishop = function (x, y, size, colour)
{
  var NS="http://www.w3.org/2000/svg";
  var SVGObj= document.createElementNS(NS,"polygon");
  var xpoints = [-14, 0, 4.67, 0, 4.67, 9.3, 14, 14, 5, 20, -20, -5, -14];
  var ypoints = [-11, -25, -20.33, -15.67, -11, -15.67, -11, -1, -1, 25, 25, -1, -1];
  var points = "";
  for (var i = 0; i < xpoints.length;i++)
  {
    points += xpoints[i] * size + x;
    points += ",";
    points += ypoints[i] * size + y;
    points += " ";
  }

  SVGObj.style.fill = colour;
  SVGObj.setAttribute("points", points);
  return SVGObj;
};
var rook = function (x, y, size, colour)
{
  var NS="http://www.w3.org/2000/svg";
  var SVGObj= document.createElementNS(NS,"polygon");
  var xpoints = [-20, -8, -8, 8, 8, 20, 20, 10, 20, -20, -10, -20] ;
  var ypoints =  [-25, -25, -18, -18, -25, -25, -5, -5, 25, 25, -5, -5];
  var points = "";
  for (var i = 0; i < xpoints.length;i++)
  {
    points += xpoints[i] * size + x;
    points += ",";
    points += ypoints[i] * size + y;
    points += " ";
  }

  SVGObj.style.fill = colour;
  SVGObj.setAttribute("points", points);
  return SVGObj;
};
var queen = function (x, y, size, colour)
{
  var NS="http://www.w3.org/2000/svg";
  var SVGObj= document.createElementNS(NS,"polygon");
  var xpoints = [-20, -6, 0, 6, 20, 13, 7, 20, -20, -7, -13] ;
  var ypoints =  [-25, -15, -25, -15, -25, -5, -5, 25, 25, -5, -5];
  var points = "";
  for (var i = 0; i < xpoints.length;i++)
  {
    points += xpoints[i] * size + x;
    points += ",";
    points += ypoints[i] * size + y;
    points += " ";
  }

  SVGObj.style.fill = colour;
  SVGObj.setAttribute("points", points);
  return SVGObj;
};
var king = function (x, y, size, colour)
{
  var NS="http://www.w3.org/2000/svg";
  var SVGObj= document.createElementNS(NS,"polygon");
  var xpoints = [-20, -7, -7, 7, 7, 20, 20, 10, 20, -20, -10, -20] ;
  var ypoints =   [-14, -14, -27, -27, -14, -14, 0, 0, 25, 25, 0, 0];
  var points = "";
  for (var i = 0; i < xpoints.length;i++)
  {
    points += xpoints[i] * size + x;
    points += ",";
    points += ypoints[i] * size + y;
    points += " ";
  }

  SVGObj.style.fill = colour;
  SVGObj.setAttribute("points", points);
  return SVGObj;
};
var size = 70;
var colour;

//knightone = knight(10,10,1,"white");
//svg.appendChild(knightone);
var board = new Array (64);
for (var i = 0; i < 64; i++)
{
  board [i] = 0;
}
for (var i = 0; i < 8; i++)
{
  board [i + 8] = 2;
}
for (var i = 0; i < 8; i++)
{
  board [i + 48] = 1;
}
board [1] = 4;
board [6] = 4;
board [57] = 3;
board [62] = 3;
board[2] = 6;
board [5] = 6;
board [58] = 5;
board [61] = 5;
board [0] = 8;
board [7] = 8;
board [56] = 7;
board [63] = 7;
board [3] = 10;
board [4] = 12;
board [59] = 9;
board [60] = 11;
var render = function (board, lastmove1, lastmove2)
{
  updatecolours(theme);
  svg.innerHTML= '';
  var back = rect (568, 568, backcolour);
  svg.appendChild(back);
  for (var x = 0; x < 8; x++)
  {
    for (var y = 0; y < 8; y++)
    {
      if ((x + y) % 2 == 0)
      {
        colour = lightsquare;
      }
      else
      {
        colour = darksquare;
      }
      if (y * 8 + x == lastmove1 || y * 8 + x == lastmove2)
      {
        //colour = "#56a00a";
        if ((x + y) % 2 == 0)
        {
          colour = lastmovelight;
        }
        else
        {
          colour = lastmovedark;
          //colour = "rgb(54, 75, 52)";
        }

      }
      var rectangle = rect (size, size,colour);
      svg.appendChild(rectangle);
      rectangle.x.baseVal.value = x * size + 8;
      rectangle.y.baseVal.value = y * size + 8;
      // rectangle.rx.baseVal.value = 2;
      //rectangle.ry.baseVal.value = 2;
    }
  }
  var piecesize = 1;
  for (var x = 0; x < 8; x++)
  {
    for (var y = 0; y < 8; y++)
    {
      if (board [y * 8 + x] == 1)
      {
        var newpawn = pawn (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
        svg.appendChild(newpawn);
      }
      if (board [y * 8 + x] == 2)
      {
        var newpawn = pawn (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
        svg.appendChild(newpawn);
      }
      if (board [y * 8 + x] == 3)
      {
        var newknight = knight (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
        svg.appendChild(newknight);
      }
      if (board [y * 8 + x] == 4)
      {
        var newknight = knight (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
        svg.appendChild(newknight);
      }
      if (board [y * 8 + x] == 5)
      {
        var newbishop = bishop (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
        svg.appendChild(newbishop);
      }
      if (board [y * 8 + x] == 6)
      {
        var newbishop = bishop (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
        svg.appendChild(newbishop);
      }
      if (board [y * 8 + x] == 7)
      {
        var newrook = rook (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
        svg.appendChild(newrook);
      }
      if (board [y * 8 + x] == 8)
      {
        var newrook = rook (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
        svg.appendChild(newrook);
      }
      if (board [y * 8 + x] == 9)
      {
        var newqueen = queen (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
        svg.appendChild(newqueen);
      }
      if (board [y * 8 + x] == 10)
      {
        var newqueen = queen (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
        svg.appendChild(newqueen);
      }
      if (board [y * 8 + x] == 11)
      {
        var newking = king (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
        svg.appendChild(newking);
      }
      if (board [y * 8 + x] == 12)
      {
        var newking = king (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
        svg.appendChild(newking);
      }
      piecesize = 1;
    }
  }
  
};

/*var controls = document.getElementById("toolbar");
var toolbar = rect(30, 560, "white");
toolbar.y.baseVal.value = 10;
toolbar.x.baseVal.value = 8;
controls.appendChild(toolbar);
var undobutton = rect(30, 60, "black");
undobutton.x.baseVal.value = 228;
undobutton.y.baseVal.value = 10;
controls.appendChild(undobutton);
var*/ 

var go = 0;
boards [0] = new Array (64);
for (var i = 0; i < 64; i++)
  {
    boards [boards.length - 1] [i] = board [i];
  }
render (board, 64, 64);
var stopjiggling = 0;
var continues = 0;
animatepiece = function (board, piece, newplace, oldsize, newsize, dorotate, validmoves, lastmove1, lastmove2)
{
  updatecolours (theme);
  svg.innerHTML= '';
  var back = rect (568, 568, backcolour);
  svg.appendChild(back);
  for (var x = 0; x < 8; x++)
  {
    for (var y = 0; y < 8; y++)
    {

      if ((x + y) % 2 == 0)
      {
        colour = lightsquare;
      }
      else
      {
        colour = darksquare;
        //colour = "rgb(54, 75, 52)";
      }

      if (y * 8 + x == piece && dorotate)
      {
        //colour = "#56a00a";
        if ((x + y) % 2 == 0)
        {
          colour = clicklight;
        }
        else
        {
          colour = clickdark;
          //colour = "rgb(54, 75, 52)";
        }

      }
      if (y * 8 + x == lastmove1 || y * 8 + x == lastmove2)
      {
        //colour = "#56a00a";
        if ((x + y) % 2 == 0)
        {
          colour = lastmovelight;
        }
        else
        {
          colour = lastmovedark;
          //colour = "rgb(54, 75, 52)";
        }

      }
      var rectangle = rect (size , size ,colour);
      /*if (dorotate)
      {
        if (validmoves.includes(y * 8 + x))
        {
          rectangle.setAttribute("stroke", "#0072de");
          rectangle.setAttribute("stroke-width", 4);
        }
      }*/
      svg.appendChild(rectangle);
      rectangle.x.baseVal.value = x * size + 8;
      rectangle.y.baseVal.value = y * size + 8;
      // rectangle.rx.baseVal.value = 2;
      //rectangle.ry.baseVal.value = 2;
    }
  }
  var piecesize = 1;
  for (var x = 0; x < 8; x++)
  {
    for (var y = 0; y < 8; y++)
    {
      if (y * 8 + x == piece)
      {
        piecesize = oldsize;
      }
      else
      {
        piecesize = 1;
      }
      if (board [y * 8 + x] == 1)
      {
        if (y * 8 + x == piece)
        {
          var animated = pawn (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = pawn (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(newpiece);
        }

      }
      if (board [y * 8 + x] == 2)
      {
        if (y * 8 + x == piece)
        {
          var animated = pawn (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = pawn (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 3)
      {
        if (y * 8 + x == piece)
        {
          var animated = knight (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = knight (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 4)
      {
        if (y * 8 + x == piece)
        {
          var animated = knight (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = knight (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 5)
      {
        if (y * 8 + x == piece)
        {
          var animated = bishop (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = bishop (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 6)
      {
        if (y * 8 + x == piece)
        {
          var animated = bishop (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = bishop (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 7)
      {
        if (y * 8 + x == piece)
        {
          var animated = rook (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = rook (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 8)
      {
        if (y * 8 + x == piece)
        {
          var animated = rook (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = rook (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 9)
      {
        if (y * 8 + x == piece)
        {
          var animated = queen (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = queen (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 10)
      {
        if (y * 8 + x == piece)
        {
          var animated = queen (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = queen (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 11)
      {
        if (y * 8 + x == piece)
        {
          var animated = king (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = king (x * 70 + 43, y * 70 + 43, piecesize, lightpiece);
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 12)
      {
        if (y * 8 + x == piece)
        {
          var animated = king (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = king (x * 70 + 43, y * 70 + 43, piecesize, darkpiece);
          svg.appendChild(newpiece);
        }
      }
      if (validmoves != null)
      {
        if (board [y * 8 + x] > 0 && validmoves.includes(y * 8 + x))
        {
          if (board [y * 8 + x] % 2 == 0)
          {
            newpiece.setAttribute("stroke", lightpiece);
          }
          else
          {
            newpiece.setAttribute("stroke", darkpiece);
          }

          newpiece.setAttribute("stroke-width", 4);
        }
      }

      piecesize = 1;
    }
  }

  if (newplace != piece)
  {
    var targetx = ((newplace % 8) - (piece % 8)) * 70;
    var targety = (Math.floor(newplace / 8) - Math.floor(piece / 8)) * 70;
    var x = 0;
    var y = 0;


    var move = setInterval (function(){
      animated.setAttribute ("transform", "translate (" + x + " " + y + ")");
      x += targetx / 5;
      y += targety / 5;
      if (Math.abs(x) > Math.abs (targetx) || Math.abs (y) > Math.abs (targety))
      {
        clearInterval(move);
        continueon();
      }
    }, 10);

  }
  if (newsize != piecesize)
  {
    var animatesize = piecesize;
    var bob = setInterval (function(){
      animated.setAttribute("transform", "scale("+animatesize+") translate (" + ((piece%8) * 70 + 43) * (-1 + (1 / animatesize)) + " " + (Math.floor(piece/8) * 70 + 43)*(-1 + (1 / animatesize)) + ")");
      animatesize += 0.1
      if (animatesize > newsize)
      {
        clearInterval(bob);
      }
    }, 5);

    //animated.setAttribute("transform", "translate(109,109)");
  }
  if (dorotate)
  {
    /*var rotation = 0;
      var stage = 0;
      var jiggle = setInterval (function(){
        animated.setAttribute("transform", "rotate(" + rotation + "," + ((piece%8) * 70 + 39) + "," + (Math.floor(piece/8) * 70 + 39) + ")");
        if (stage == 0 || stage == 2)
          {
            rotation -=1;
          }
        else
          {
            rotation +=1;
          }

        if (rotation < -8)
          {
            stage = 1;
          }
        if (rotation > 8)
          {
            stage = 2;
          }
        if (rotation < 0 && stage == 2)
          {
            //clearInterval(jiggle);
            stage = 0;
          }
        if (stopjiggling == 1)
          {
            clearInterval (jiggle);
          }

      }, 10);*/
    //animated.style.stroke = "rgb(53, 100, 60)";
    /*if (board[piece] % 2 == 0)
        {
          animated.style.stroke = lightpiece;
        }
      else
        {
          animated.style.stroke = darkpiece;
        }*/
    //animated.style.stroke = darksquare;

    animated.setAttribute("stroke-width", 4);
    var squaresize = 16;
    for (var i = 0; i < validmoves.length; i++)
    {
      if (board [validmoves[i]] == 0)
      {
        if (board[piece]%2==1)
        {
          var rectangle = rect(squaresize,squaresize,lightpiece);
        }
        else
        {
          var rectangle = rect(squaresize,squaresize,darkpiece);
        }

        rectangle.x.baseVal.value = (validmoves[i] % 8) * 70 + 43 - (squaresize/2);
        rectangle.y.baseVal.value = Math.floor(validmoves[i] / 8) * 70 + 43 - (squaresize / 2);
        svg.appendChild(rectangle);
      }

    }
  }
  return board;
};
var getcoord = function (x, y)
{

  x = x - svg.getBoundingClientRect().left;
  y = y - svg.getBoundingClientRect().top;
  if (x > 568 || x < 4 || y > 568 || y < 4)
  {
    return 64;
  }
  return (Math.floor((x - 8)/70) + (8 * Math.floor((y - 8) / 70))) ;
};

var isvalidmove = function (board, piece, destination, turn)
{
  if (board [piece] == 0)
  {
    return false;
  }
  if (board [piece] % 2 != turn % 2)
  {

    return false;
  }
  if (board[piece] % 2 == board [destination] % 2 && board [destination] > 0)
  {
    return false;
  }
  if (board [piece] == 1)
  {
    if (board [destination] == 0 && destination == piece - 8)
    {
      return true;
    }
    if (board [destination] == 0 && piece > 47 && destination == piece - 16 && board [piece - 8] == 0)
    {
      return true;
    }
    if (board [destination] > 0 && ((destination == piece - 7 && piece % 8 < 7) || (destination == piece - 9 && piece % 8 > 0)))
    {
      console.log("piece: ", piece);
      return true;
    }
    return false;
  }
  if (board [piece] == 2)
  {
    if (board [destination] == 0 && destination == piece + 8)
    {
      return true;
    }
    if (board [destination] == 0 && piece < 16 && destination == piece + 16 && board [piece + 8] == 0)
    {
      return true;
    }
    if (board [destination] > 0 && ((destination == piece + 7 && piece % 8 > 0) || (destination == piece + 9 && piece % 8 < 7)))
      {
      return true;
    }
    return false;
  }
  if (board [piece] == 3 || board [piece] == 4)
  {
    var xchange = Math.abs((destination % 8) - (piece % 8));
    var ychange = Math.abs(Math.floor(destination / 8) - Math.floor(piece / 8));
    if ((xchange == 1 && ychange == 2)||(xchange == 2 && ychange == 1))
    {
      return true;
    }
    return false;
  }
  if (board [piece] == 5 || board [piece] == 6)
  {
    var xchange = (destination % 8) - (piece % 8);
    var ychange = Math.floor(destination / 8) - Math.floor(piece / 8);
    if (Math.abs(xchange) != Math.abs(ychange))
    {
      return false;
    }
    for (var i = 1; i < Math.abs (xchange); i++)
    {
      if (board [8 * (Math.floor(piece / 8)+ i * (ychange / Math.abs(ychange))    ) + (piece%8) + ((xchange/Math.abs(xchange)) * i)] > 0)
      {
        return false;
      }
    }
    return true;
  }
  if (board [piece] == 7 || board [piece] == 8)
  {
    var xchange = (destination % 8) - (piece % 8);
    var ychange = Math.floor(destination / 8) - Math.floor(piece / 8);
    if (Math.abs(xchange) > 0 && Math.abs(ychange) > 0)
    {
      return false;
    }
    if (ychange == 0)
    {
      for (var i = 1; i < Math.abs (xchange); i++)
      {
        if (board [piece + (i * (xchange/Math.abs(xchange)))] > 0)
        {
          return false;
        }
      }
    }
    else
    {
      for (var i = 1; i < Math.abs (ychange); i++)
      {
        if (board [piece + (8 * i * (ychange/Math.abs(ychange)))] > 0)
        {
          return false;
        }
      }
    }

    return true;
  }
  if (board [piece] == 9 || board [piece] == 10)
  {
    var xchange = (destination % 8) - (piece % 8);
    var ychange = Math.floor(destination / 8) - Math.floor(piece / 8);
    if (Math.abs(xchange) == Math.abs (ychange))
    {
      for (var i = 1; i < Math.abs (xchange); i++)
      {
        if (board [8 * (Math.floor(piece / 8)+ i * (ychange / Math.abs(ychange))    ) + (piece%8) + ((xchange/Math.abs(xchange)) * i)] > 0)
        {
          return false;
        }
      }
      return true;
    }
    if (xchange != 0 && ychange == 0)
    {
      for (var i = 1; i < Math.abs (xchange); i++)
      {
        if (board [piece + (i * (xchange/Math.abs(xchange)))] > 0)
        {
          return false;
        }
      }
      return true;
    }
    if (xchange == 0 & ychange != 0)
    {
      for (var i = 1; i < Math.abs (ychange); i++)
      {
        if (board [piece + (8 * i * (ychange/Math.abs(ychange)))] > 0)
        {
          return false;
        }
      }
      return true;
    }

    return false;
  }
  if (board [piece] == 11 || board [piece] == 12)
  {
    var xchange = Math.abs((destination % 8) - (piece % 8));
    var ychange = Math.abs(Math.floor(destination / 8) - Math.floor(piece / 8));
    if (xchange + ychange < 3 && xchange < 2 && ychange < 2)
    {
      return true;
    }
    if (board [piece] == 11)
      {
        if (piece == 60 && destination == 62 && board [61] == 0 && board [62] == 0 && board [63] == 7)
          {
            return true;
          }
        if (piece == 60 && destination == 58 && board [59] == 0 && board [58] == 0 && board [57] == 0 && board [56] == 7)
        {
          return true;
        }
      }
    if (board [piece] == 12)
    {
      if (piece == 4 && destination == 6 && board [5] == 0 && board [6] == 0 && board [7] == 8)
      {
        return true;
      }
      if (piece == 4 && destination == 2 && board [1] == 0 && board [2] == 0 && board [3] == 0 && board [0] == 8)
      {
        return true;
      }
    }

    return false;
  }
  return true;
}
var isincheck = function (board, side)
{
  var kingposition;
  for (var i = 0; i < 64; i++)
    {
      if (board [i] == side + 10)
        {
          kingposition = i;
        }
    }
  for (var i = 0; i < 64; i ++)
    {
      if (board [i] > 0 && board [i] % 2 != side % 2)
        {
          if (isvalidmove(board, i, kingposition, (side % 2) + 1))
            {
              return true;
            }
        }
    }
  return false;
}
var isvalid = function (board, piece, destination, turn)
{
  if (isvalidmove(board, piece, destination, turn))
    {
      var testboard = new Array (64);
      for (var i = 0; i < 64; i++)
        {
          testboard [i] = board [i];
        }
      testboard [destination] = testboard [piece];
      testboard [piece] = 0;
      if (isincheck(testboard, turn))
        {
          return false;
        }
      if (board [piece] > 10 && (Math.abs(destination - piece) == 2 || Math.abs(destination - piece) == 3))
        {
          if (isincheck (board, turn))
            {
              return false;
            }
          for (var i = 0; i < 64; i++)
          {
            testboard [i] = board [i];
          }
          if (board[piece] == 11)
            {
              for (var i = 0; i < go; i++)
              {
                if (lastmove1s [i] == 60)
                  {
                    return false;
                  }
              }
              if (destination == 62)
                {
                  testboard [61] = 11;
                  if (isincheck(testboard, turn))
                    {
                      return false;
                    }
                }
              if (destination == 58)
              {
                testboard [59] = 11;
                if (isincheck(testboard, turn))
                {
                  return false;
                }
              }
            }
          if (board[piece] == 12)
          {
            for (var i = 0; i < go; i++)
            {
              if (lastmove1s [i] == 4)
              {
                return false;
              }
            }
            if (destination == 6)
            {
              testboard [5] = 12;
              if (isincheck(testboard, turn))
              {
                return false;
              }
            }
            if (destination == 2)
            {
              testboard [3] = 12;
              if (isincheck(testboard, turn))
              {
                return false;
              }
            }
          }
          
        }
      return true;
    }
  return false;
}
var validmoves = function (board, selection, turn)
{
  var finallist = new Array (0);
  for (var i = 0; i < 64; i++)
  {
    if (isvalid(board, selection, i , turn))
    {
      finallist [finallist.length] = i;
    }
  }
  return finallist;
}
/*var ispromoting = false;
var promote = function (board, destination, turn)
{
  var menu = rect(200,200, "white");
  svg.appendChild(menu);
}*/
var makemove = function (board, piece, destination)
{
  //audio.play();
  if (board [piece] == 11 && piece == 60 && destination == 62)
  {
    board [63] = 0;
    board [61] = 7;
  }
  if (board [piece] == 11 && piece == 60 && destination == 58)
  {
    board [56] = 0;
    board [59] = 7;
  }
  if (board [piece] == 12 && piece == 4 && destination == 6)
  {
    board [7] = 0;
    board [5] = 8;
  }
  if (board [piece] == 12 && piece == 4 && destination == 2)
  {
    board [0] = 0;
    board [3] = 8;
  }
  board [destination] = board [piece];
  board [piece] = 0;
  if (board [destination] == 1 && destination < 8)
    {
      //promote(board, destination, 1 + (1 + board[destination] % 2));
      board [destination] = 9;
    }
  if (board [destination] == 2 && destination > 55)
  {
    //promote(board, destination, 1 + (1 + board[destination] % 2));
    board [destination] = 10;
  }
  lastmove1 = piece;
  lastmove2 = destination;
  while (lastmove1s.length - 1 > go)
  {
    lastmove1s.pop();
  }
  while (lastmove2s.length - 1 > go)
  {
    lastmove2s.pop();
  }
  lastmove1s [lastmove1s.length] = lastmove1;
  lastmove2s [lastmove2s.length] = lastmove2;
  return board;
}
var selection = 64;
var xmouse;
var ymouse;
var jiggling;
var saveselection;
svg.addEventListener('click', function(event)
                     {
  if (selection == 64)
  {
    selection = getcoord (event.clientX, event.clientY);
    saveselection = selection;
    if (selection < 64 && board [selection] > 0 && board [selection] % 2 == turn % 2)
    {
      stopjiggling = 0;
      animatepiece (board,selection,selection,1, 1, true, validmoves(board, selection, turn), lastmove1, lastmove2);
      //jiggling = setInterval(function(){
      // animatepiece (board,selection,selection,1, 1, true);
      //  if (saveselection != selection)
      //  {
      //  clearInterval(jiggling);
      //}
      //      }, 500);


    }
    else
    {
      selection = 64;
      stopjiggling = 1;
    }
  }
  else
  {
    if (isvalid(board,selection,getcoord (event.clientX, event.clientY), turn))
    {
      //   clearInterval(jiggling);
      stopjiggling = 1;
      render(board, lastmove1, lastmove2);
      animatepiece(board, selection, getcoord (event.clientX, event.clientY), 1, 1, false, null);
      turn = 1 + (turn % 2);
      xmouse = event.clientX;
      ymouse = event.clientY;
    }
    else
    {
      if (getcoord (event.clientX, event.clientY) == selection)
        {
          selection = 64;
          stopjiggling = 1;
          render(board, lastmove1, lastmove2);
        }
      else
        {
          selection = getcoord (event.clientX, event.clientY);
          saveselection = selection;
          if (selection < 64 && board [selection] > 0 && board [selection] % 2 == turn % 2)
          {
            stopjiggling = 0;
            animatepiece (board,selection,selection,1, 1, true, validmoves(board, selection, turn), lastmove1, lastmove2);
          }

          else
          {
            selection = 64;
            stopjiggling = 1;
            render(board, lastmove1, lastmove2);
          }
        }
      // clearInterval(jiggling);
      
    }


  }

  //render(board, 64, 1);

});
var continueon = function ()
{
  board = makemove (board, selection, getcoord (xmouse, ymouse));
  while (boards.length - 1  > go)
    {
      boards.pop();
    }
  go++;
  boards[go] = new Array (64);
  
  for (var i = 0; i < 64; i++)
    {
      boards [go] [i] = board [i];
    }
  var movecount = 0;
  for (var i = 0; i < 64; i++)
    {
      if (board [i] % 2 == turn % 2)
        {
          movecount += validmoves(board, i, turn).length;
        }
    }
 // console.log("moves: ", movecount);
  if (movecount == 0 && isincheck(board, turn))
    {
      console.log("checkmate!")
    }
 /* console.log(boards);
  console.log(lastmove1s);
  console.log(lastmove2s);
  console.log("go: ", go);*/
  render (boards [go], lastmove1s[go], lastmove2s[go]);
  selection = 64;
};
svg.addEventListener('mousemove', function(event){
  if ((getcoord(event.clientX, event.clientY) < 64 && board [getcoord(event.clientX, event.clientY)] > 0 && board [getcoord(event.clientX, event.clientY)] % 2 == turn % 2)|| selection < 64 && (validmoves(board, selection, turn).includes(getcoord(event.clientX, event.clientY)) || selection == getcoord(event.clientX, event.clientY)))
  {
    document.body.style.cursor = "pointer";
  }
  else
  {
    document.body.style.cursor = "default";
  }
  //document.body.style.cursor = "pointer";

});
svg.addEventListener('mouseout', function(event){
  document.body.style.cursor = "default";
});
document.addEventListener ('keydown', function(event)
                     {
  if (event.keyCode == 37)
    {
      if (go > 0)
        {

          go --;
          for (var i = 0; i < 64; i++)
          {
            board [i] = boards [go] [i];
          }
          lastmove1 = lastmove1s [go];
          lastmove2 = lastmove2s [go];
          turn = 1 + (go % 2);
          render(board, lastmove1, lastmove2);
        }
      console.log(boards);
      console.log(lastmove1s);
      console.log(lastmove2s);
      console.log("go: ", go);
      
      
    }
  if (event.keyCode == 39)
    {
      if (boards.length - 1 > go)
        {
          go++;
          for (var i = 0; i < 64; i++)
            {
              board [i] = boards [go] [i];
            }
          lastmove1 = lastmove1s [go];
          lastmove2 = lastmove2s [go];
          turn = 1 + (go % 2);
          render(board, lastmove1, lastmove2);
        }
      console.log(boards);
      console.log(lastmove1s);
      console.log(lastmove2s);
      console.log("go: ", go);
    }
  if (event.keyCode == 32)
  {
    theme = theme % 6;
    theme ++;
    render(boards[go], lastmove1s[go], lastmove2s [go]);
  }

});
