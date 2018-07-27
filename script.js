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

var backcolour = "rgb(114, 114, 114)";
//var backcolour = "#595959";
//var backcolour = "rgb(86, 68, 59)";
//var darksquare = "rgb(62, 39, 27)";
var darksquare = "rgb(75, 62, 56)";
//var darksquare = "rgb(60, 49, 43)";
var lightsquare = "rgb(159, 132, 97)";
//var lightsquare ="rgb(140, 115, 83)";
var lightpiece = "rgb(215,215,215)";
var darkpiece = "rgb(5,5,5)";
var turn = 1;
//var darksquare = "rgb(130, 145, 124)";
//var lightsquare ="rgb(46, 71, 46)";
var pawn = function (x, y, size, colour)
{
  var NS="http://www.w3.org/2000/svg";
  var SVGObj= document.createElementNS(NS,"polygon");
  var xpoints = [-10, 10, 10, 5, 15, -15, -5, -10, -10];
  var ypoints = [-25, -25, -5, -5, 25, 25, -5, -5, -25];
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
  var xpoints = [-14, 0, 14, 14, 5, 20, -20, -5, -14];
  var ypoints = [-10, -25, -10, -1, -1, 25, 25, -1, -1];
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
  var ypoints =   [-12, -12, -25, -25, -12, -12, 2, 2, 25, 25, 2, 2];
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
var render = function (board)
{
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
      var rectangle = rect (size - 8, size - 8,colour);
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
              var newpawn = pawn (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
              svg.appendChild(newpawn);
            }
          if (board [y * 8 + x] == 2)
          {
            var newpawn = pawn (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
            svg.appendChild(newpawn);
          }
          if (board [y * 8 + x] == 3)
          {
            var newknight = knight (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
            svg.appendChild(newknight);
          }
          if (board [y * 8 + x] == 4)
          {
            var newknight = knight (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
            svg.appendChild(newknight);
          }
          if (board [y * 8 + x] == 5)
          {
            var newbishop = bishop (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
            svg.appendChild(newbishop);
          }
          if (board [y * 8 + x] == 6)
          {
            var newbishop = bishop (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
            svg.appendChild(newbishop);
          }
          if (board [y * 8 + x] == 7)
          {
            var newrook = rook (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
            svg.appendChild(newrook);
          }
          if (board [y * 8 + x] == 8)
          {
            var newrook = rook (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
            svg.appendChild(newrook);
          }
          if (board [y * 8 + x] == 9)
          {
            var newqueen = queen (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
            svg.appendChild(newqueen);
          }
          if (board [y * 8 + x] == 10)
          {
            var newqueen = queen (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
            svg.appendChild(newqueen);
          }
          if (board [y * 8 + x] == 11)
          {
            var newking = king (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
            svg.appendChild(newking);
          }
          if (board [y * 8 + x] == 12)
          {
            var newking = king (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
            svg.appendChild(newking);
          }
          piecesize = 1;
        }
    }
};
render (board);
var stopjiggling = 0;
var continues = 0;
animatepiece = function (board, piece, newplace, oldsize, newsize, dorotate, validmoves)
{
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
            colour = "#0072de";
          }
          else
          {
            colour = "#003b74";
            //colour = "rgb(54, 75, 52)";
          }
          
        }
      var rectangle = rect (size - 8, size - 8,colour);
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
            var animated = pawn (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
            svg.appendChild(animated);
          }
        else
          {
            var newpiece = pawn (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
            svg.appendChild(newpiece);
          }
        
      }
      if (board [y * 8 + x] == 2)
      {
        if (y * 8 + x == piece)
        {
          var animated = pawn (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = pawn (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 3)
      {
        if (y * 8 + x == piece)
        {
          var animated = knight (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = knight (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 4)
      {
        if (y * 8 + x == piece)
        {
          var animated = knight (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = knight (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 5)
      {
        if (y * 8 + x == piece)
        {
          var animated = bishop (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = bishop (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 6)
      {
        if (y * 8 + x == piece)
        {
          var animated = bishop (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = bishop (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 7)
      {
        if (y * 8 + x == piece)
        {
          var animated = rook (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = rook (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 8)
      {
        if (y * 8 + x == piece)
        {
          var animated = rook (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = rook (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 9)
      {
        if (y * 8 + x == piece)
        {
          var animated = queen (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = queen (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 10)
      {
        if (y * 8 + x == piece)
        {
          var animated = queen (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = queen (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 11)
      {
        if (y * 8 + x == piece)
        {
          var animated = king (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = king (x * 70 + 39, y * 70 + 39, piecesize, "rgb(215, 215, 215)");
          svg.appendChild(newpiece);
        }
      }
      if (board [y * 8 + x] == 12)
      {
        if (y * 8 + x == piece)
        {
          var animated = king (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
          svg.appendChild(animated);
        }
        else
        {
          var newpiece = king (x * 70 + 39, y * 70 + 39, piecesize, "rgb(5, 5, 5)");
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
        x += targetx / 10;
        y += targety / 10;
        if (Math.abs(x) > Math.abs (targetx) || Math.abs (y) > Math.abs (targety))
          {
            clearInterval(move);
            continueon();
          }
      }, 5);
      
    }
  if (newsize != piecesize)
    {
      var animatesize = piecesize;
      var bob = setInterval (function(){
        animated.setAttribute("transform", "scale("+animatesize+") translate (" + ((piece%8) * 70 + 39) * (-1 + (1 / animatesize)) + " " + (Math.floor(piece/8) * 70 + 39)*(-1 + (1 / animatesize)) + ")");
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

              rectangle.x.baseVal.value = (validmoves[i] % 8) * 70 + 39 - (squaresize/2);
              rectangle.y.baseVal.value = Math.floor(validmoves[i] / 8) * 70 + 39 - (squaresize / 2);
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
  return (Math.floor((x - 4)/70) + (8 * Math.floor((y - 4) / 70))) ;
};
var isvalid = function (board, piece, destination, turn)
{
  if (board [piece] == 0)
    {
      return false;
    }
  if (board [piece] % 2 != turn % 2)
    {
      console.log(board [piece]);
      console.log(turn);
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
      if (board [destination] > 0 && (destination == piece - 7 || destination == piece - 9))
        {
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
    if (board [destination] > 0 && (destination == piece + 7 || destination == piece + 9))
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

    return false;
  }
  return true;
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
var makemove = function (board, piece, destination)
{
  board [destination] = board [piece];
  board [piece] = 0;
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
      console.log("valid mvoes", validmoves(board, selection, turn));
      saveselection = selection;
      if (selection < 64 && board [selection] > 0 && board [selection] % 2 == turn % 2)
        {
            stopjiggling = 0;
          animatepiece (board,selection,selection,1, 1, true, validmoves(board, selection, turn));
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
          render(board);
          board = animatepiece(board, selection, getcoord (event.clientX, event.clientY), 1, 1, false, null);
          turn = 1 + (turn % 2);
          xmouse = event.clientX;
          ymouse = event.clientY;
        }
      else
        {
       
          // clearInterval(jiggling);
          selection = 64;
          stopjiggling = 1;
          render(board);
        }
      
      
    }
  
  //render(board, 64, 1);
  
});
var continueon = function ()
{
  board = makemove (board, selection, getcoord (xmouse, ymouse));
  render (board);
  selection = 64;
};
svg.addEventListener('mousemove', function(event){
  if ((selection == 64 && getcoord(event.clientX, event.clientY) < 64 && board [getcoord(event.clientX, event.clientY)] > 0 && board [getcoord(event.clientX, event.clientY)] % 2 == turn % 2)|| selection < 64 && (validmoves(board, selection, turn).includes(getcoord(event.clientX, event.clientY)) || selection == getcoord(event.clientX, event.clientY)))
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
