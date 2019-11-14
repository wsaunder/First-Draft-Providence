
  var mountain = {
      food: 1,
      stone: 2,
      metal: 1,
      mana: 0,
      //player: 0
    }
    var desert = {
      food: 1,
      stone: 0,
      metal: 0,
      mana: 1,
      //player: 0
    }
    var hills = {
      food: 2,
      stone: 1,
      metal: 1,
      mana: 0,
      //player: 0
    }
    var plains = {
      food: 3,
      stone: 0,
      metal: 1,
      mana: 0,
      //player: 0
    }
    var pasture = {
      food: 4,
      stone: 0,
      metal: 0,
      mana: 0,
      //player: 0
    }
    var forest = {
      food: 3,
      stone: 1,
      metal: 0,
      mana: 0,
      //player: 0
    }
    
    function Player(number) {
      this.playerNumber = number;
      this.food = 0;
      this.stone = 0;
      this.metal = 0;
      this.mana = 0;
      this.tiles = 0;
    }
    


    var landColor = {Mountain: "FireBrick", Pasture: "LawnGreen", Forest: "ForestGreen", Desert: "Peru", Hills: "DarkGoldenrod", Plains: "Wheat"};
    var color = "white";
    var any_selected = false;
    var meeple = 0;
    var temple = 0;
    var land = null;
    var turn = 0;
    var action = true;
    var currentPlayer = 1;
    var totalPlayers = 2;
    var players = [];

    
    function setColor(choice){
      color = choice.toString();
    }
    function setLand(choice){
      if (choice == 'Mountain'){
        land = mountain;
      } else if (choice == 'Desert') {
        land = desert;
      } else if (choice == 'Hills') {
        land = hills;
      } else if (choice == 'Plains') {
        land = plains;
      } else if (choice == 'Pasture') {
        land = pasture;
      } else if (choice == 'Forest'){
        land = forest;
      } else {
        land = null;}
      if (choice != null) {
        setColor(landColor[choice]);
      }
      document.getElementById('landSelection').innerHTML = choice;
    }
    
    function addMeeple(number) {
      meeple = number;
    }
    function addTemple(number) {
      temple = number;
    }
    var phases = ['Numbers', 'Intervention', 'Multiply', 'Intervention', 'Go Forth', 'Intervention', 'Holy War'];
    
    window.addEventListener("load", function() {
      var canvas = document.getElementById("hexCanvas");
      getHexGridWH();
      
      var grid = new HT.Grid(800, 600);
      var player1 = new Player(1);
      var player2 = new Player(2);
      players.push(player1);
      players.push(player2);
      
      
      function getCursorPosition(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      
      
      canvas.addEventListener("mouseup", function(e) {
        var point = getCursorPosition(canvas, e);
        var p = new HT.Point(point.x, point.y);
        //var p = new HT.Point(e.x-55, e.y-50);
        console.log(grid.GetHexAt(p))
        
        //if (Hexes.forEach(firstClick()) = )
        //addHex(grid.GetHexAt(p).Id, grid.GetHexAt(p).TopLeftPoint.X, grid.GetHexAt(p).TopLeftPoint.Y);
        //if (color != "white") {
        //  grid.GetHexAt(p).selected = true;
        //};
        //anySelected(p);
        //grid.CheckNeighbors(p);
        console.log(action);
        anySelected(p);
        

        
        
        
        
      });
      // checks if any hexes have been clicked yet
      anySelected = function(p) {
        if (action == true) {
        if (any_selected == true) {
          if (grid.CheckNeighbors(p) == true) {
            if (color != "white") {
              grid.GetHexAt(p).player = currentPlayer;
              grid.GetHexAt(p).meeples += meeple;
              grid.GetHexAt(p).temples += temple;           
              meeple = 0;
              temple = 0;
              //addHex(grid.GetHexAt(p).Id, grid.GetHexAt(p).TopLeftPoint.X, grid.GetHexAt(p).TopLeftPoint.Y);
              grid.GetHexAt(p).draw(canvas.getContext("2d"), color);
              grid.GetHexAt(p).selected = true;
              grid.GetHexAt(p).land = land;
              action = false;
              disable();
            }
          }
        }  else if (color != "white") {
          any_selected = true;
          //addHex(grid.GetHexAt(p).Id, grid.GetHexAt(p).TopLeftPoint.X, grid.GetHexAt(p).TopLeftPoint.Y);
          grid.GetHexAt(p).player = currentPlayer;
          grid.GetHexAt(p).land = land;
          grid.GetHexAt(p).draw(canvas.getContext("2d"), color);
          grid.GetHexAt(p).selected = true;
          action = false;
          disable();
        } else {
          $(document).ready(function(){
            $.notify("Please select a color" , { position:"top center"  } );
          })
        }
        }
      }
      
      
      
      addHex = function(name, x, y) {
        
        var hex = new HT.Hexagon(name, x, y);
        hex.draw(canvas.getContext("2d"), color);
      }
      //function firstClick(selected){
      //  if selected = true {
      //    return true;
      //  } else {
      //    return false;
      //  }
      //};
      
      
      nextTurn = function() {
        //updateResources();
        turn += 1;
        if (turn > 7) {
          turn = 1;
        }
        document.getElementById('phase').innerHTML = phases[turn-1];
        if (action == false) {
          disable();
        }
        action = true;
        if (turn == 1) {
          Numbers();
        }       
      }
      
      nextPlayer = function(){
        if (action == false){
          action = true;
          disable();
        }
        currentPlayer += 1;
        if (currentPlayer > totalPlayers) {
          currentPlayer = 1;
        }
        color = "white";
        setLand(null);
        document.getElementById('player#').innerHTML = currentPlayer;
      }
      disable = function() {
        $(document).ready(function(){
          $('.actionButton').toggle();
          //if (action = false) {
          //  //document.getElementsByClassName('actionButton').disabled = true;
          //  $('.actionButton').prop('disabled', true);
          //  $('.actionButton').toggle();
          //} else {
          //  $('.actionButton').prop('disabled', false);
          //  $('.actionButton').toggle();
          //}
          })
      }
      
      updateResources = function(){
          for (var n in grid.Hexes) {
            if (grid.Hexes[n].land) {
              for (var p in players) {
                players[p].tiles = 0;
                if (grid.Hexes[n].player == players[p].playerNumber) {
                  //players[p].tiles = 0;
                  //players[p].tiles += 1;
                  players[p].food += grid.Hexes[n].land.food;
                  players[p].stone += grid.Hexes[n].land.stone;
                  players[p].metal += grid.Hexes[n].land.metal;
                  players[p].mana += grid.Hexes[n].land.mana;
                }
              }
            }
          }
        
        document.getElementById("food1").innerHTML = player1.food;
        document.getElementById("stone1").innerHTML = player1.stone;
        document.getElementById("metal1").innerHTML = player1.metal;
        document.getElementById("mana1").innerHTML = player1.mana;
        document.getElementById("tile1").innerHTML = player1.tiles;
        document.getElementById("food2").innerHTML = player2.food;
        document.getElementById("stone2").innerHTML = player2.stone;
        document.getElementById("metal2").innerHTML = player2.metal;
        document.getElementById("mana2").innerHTML = player2.mana;
        document.getElementById("tile2").innerHTML = player1.tiles;
       }
  })