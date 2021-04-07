          var Item = {
              name: ['Passport', 'Rock', 'Wooden Stick', 'Fish', 'Banana', 'Water Skin', 'Coconut', 'Lucas\' ID', 'William\'s ID', 'Ryan\'s ID', 'Snack'],
              url: ['image/item/passport.PNG', "image/item/rock.png", "image/item/wooden_stick.png", "image/item/fish.png", "image/item/banana.png", "image/item/water_skin.png", "image/item/coconut.png", "image/item/man_1_id.png", "image/item/man_2_id.png", "image/item/man_3_id.png", 'image/item/snack.png']
          };
          var gapX = [80, 145, 210, 275];
          var gapY = [220, 300, 380, 460];

          function addItem(id, amount) {

              if (id < Item.name.length && amount > 0) {


                  if (Inventory.hasItem(Item.name[id]) == false) {

                      Inventory.calculate_Pos();
                  }

                  Inventory.addItem(Item.name[id], amount, Item.url[id]);
                  Animate.info.alpha = 1;
                  Animate.info.start = true;
                  Animate.info.name = Item.name[id];
                  Animate.info.amount = amount;
              }
          }

          function removeItem(id, amount) {
              if (id < Item.name.length && amount > 0) {
                  Inventory.removeItem(Item.name[id], amount, Item.url[id]);
              }
          }

          function checkItemQuantity(id, value) {
              if (id < Item.name.length) {
                  return Inventory.checkItemQuantity(Item.name[id], value);
              }
          }

          function hasItem(id) {
              if (id < Item.name.length) {
                  return Inventory.hasItem(Item.name[id]);
              }

          }

          function getItemQuantity(id) {
              return Inventory.getItemQuantity(Item.name[id]);
          }

          var Inventory = {
              items: [],
              box: new Image(),
              PosX: [],
              PosY: [],
              row: 0,
              column: 0,
              addItem: function (id, amount, imageUrl) {
                  for (var i = 0; i < this.items.length; i++) {

                      if (this.items[i].id == id) {
                          this.items[i].amount += amount;
                          this.items[i].imageUrl = imageUrl;
                          return;
                      }
                  }
                  this.items.push({
                      id: id,
                      amount: amount,
                      imageUrl: imageUrl,
                      img: new Image(),
                  });
              },
              removeItem: function (id, amount) {
                  for (var i = 0; i < this.items.length; i++) {
                      if (this.items[i].id == id) {
                          this.items[i].amount -= amount;
                          if (this.items[i].amount <= 0) {
                              this.items.splice(i, 1);
                              this.PosX.pop();
                              this.PosY.pop();

                              if (this.row % 4 == 0) {
                                  Inventory.column--;
                              }
                              Inventory.row--;
                          }
                          return;
                      }

                  }
              },
              hasItem: function (id) {
                  if (this.items.length == 0) {
                      return false;
                  } else {
                      for (var i = 0; i < this.items.length; i++) {
                          if (this.items[i].id == id) {
                              return true;
                          }
                      }
                      return false;
                  }
              },
              checkItemQuantity: function (id, value) {
                  if (this.items.length > 0) {
                      {
                          for (var i = 0; i < this.items.length; i++) {
                              if (this.items[i].id == id) {
                                  if (this.items[i].amount < value) {
                                      return true;
                                  }
                                  if (this.items[i].amount >= value) {
                                      return false;
                                  }
                              }
                          }
                      }
                  }
              },
              getItemQuantity: function (id) {
                  if (this.items.length > 0) {
                      {
                          for (var i = 0; i < this.items.length; i++) {
                              if (this.items[i].id == id) {
                                  return this.items[i].amount;
                              }
                          }
                          return 0;
                      }
                  }
              },
              calculate_Pos: function () {
                  this.PosX.push(gapX[this.row % 4] + 5);
                  this.PosY.push(gapY[this.column] + 5);
                  this.row++;
                  if ((this.row % 4 == 0)) {
                      this.column++;
                  }
              },
              draw: function () {
                  this.box.src = "image/ui/inventory.png";
                  for (var i = 0; i < 4; i++) {
                      for (var j = 0; j < 4; j++) {
                          ctx.drawImage(this.box, gapX[j], gapY[i]);
                      }
                  }
                  if (this.items.length > 0) {
                      ctx.textAlign = "center";
                      ctx.font = "15px Poppins";
                      ctx.fillStyle = "black";
                      for (var i = 0; i < this.items.length; i++) {
                          this.items[i].img.src = this.items[i].imageUrl;
                          ctx.drawImage(this.items[i].img, this.PosX[i], this.PosY[i], 40, 40);
                          ctx.fillText(this.items[i].amount, this.PosX[i], this.PosY[i]);
                          if (x > this.PosX[i] && x < this.PosX[i] + this.box.width && y > this.PosY[i] && y < this.PosY[i] + this.box.height && home.itemInfo == false) {
                              ctx.fillText(this.items[i].id, this.PosX[i] + 20, this.PosY[i] + 50);
                              canvas.style.cursor = "pointer";
                          }
                      }
                  }
              }
          };

          var ItemInfo = {
              close: new Image(),
              Passport_click: false,
              wooden_Stick_Click: false,
              rock_Click: false,
              fish_Click: false,
              banana_Click: false,
              water_Skin_Click: false,
              cocount_Click: false,
              id_1_Click: false,
              id_2_Click: false,
              id_3_Click: false,
              snack_Click: false,
              Serach: function () {
                  for (var i = 0; i < Inventory.items.length; i++) {
                      if (home.itemInfo == false) {
                          if (Inventory.items[i].id == "Passport") {
                              if (x > Inventory.PosX[i] && x < Inventory.PosX[i] + 50 && y > Inventory.PosY[i] && y < Inventory.PosY[i] + 50) {
                                  this.Passport_click = true;
                                  home.itemInfo = true;
                                  Animate.passport.start = true;
                              }
                          }
                          if (Inventory.items[i].id == 'Wooden Stick') {
                              if (dx > Inventory.PosX[i] && dx < Inventory.PosX[i] + 50 && y > Inventory.PosY[i] && y < Inventory.PosY[i] + 50) {

                                  this.wooden_Stick_Click = true;
                                  home.itemInfo = true;
                              }
                          }
                          if (Inventory.items[i].id == 'Rock') {

                              if (dx > Inventory.PosX[i] && dx < Inventory.PosX[i] + 50 && y > Inventory.PosY[i] && y < Inventory.PosY[i] + 50) {

                                  this.rock_Click = true;
                                  home.itemInfo = true;
                              }
                          }
                          if (Inventory.items[i].id == 'Fish') {

                              if (dx > Inventory.PosX[i] && dx < Inventory.PosX[i] + 50 && y > Inventory.PosY[i] && y < Inventory.PosY[i] + 50) {
                                  this.fish_Click = true;
                                  home.itemInfo = true;
                              }
                          }
                          if (Inventory.items[i].id == 'Banana') {

                              if (dx > Inventory.PosX[i] && dx < Inventory.PosX[i] + 50 && y > Inventory.PosY[i] && y < Inventory.PosY[i] + 50) {
                                  this.banana_Click = true;
                                  home.itemInfo = true;
                              }
                          }
                          if (Inventory.items[i].id == 'Water Skin') {

                              if (dx > Inventory.PosX[i] && dx < Inventory.PosX[i] + 50 && y > Inventory.PosY[i] && y < Inventory.PosY[i] + 50) {
                                  this.water_Skin_Click = true;
                                  home.itemInfo = true;
                              }
                          }
                          if (Inventory.items[i].id == 'Coconut') {

                              if (dx > Inventory.PosX[i] && dx < Inventory.PosX[i] + 50 && y > Inventory.PosY[i] && y < Inventory.PosY[i] + 50) {
                                  this.cocount_Click = true;
                                  home.itemInfo = true;
                              }
                          }
                          if (Inventory.items[i].id == 'Lucas\' ID') {

                              if (dx > Inventory.PosX[i] && dx < Inventory.PosX[i] + 50 && y > Inventory.PosY[i] && y < Inventory.PosY[i] + 50) {
                                  this.id_1_Click = true;
                                  home.itemInfo = true;
                              }
                          }
                          if (Inventory.items[i].id == 'William\'s ID') {

                              if (dx > Inventory.PosX[i] && dx < Inventory.PosX[i] + 50 && y > Inventory.PosY[i] && y < Inventory.PosY[i] + 50) {
                                  this.id_2_Click = true;
                                  home.itemInfo = true;
                              }
                          }
                          if (Inventory.items[i].id == 'Ryan\'s ID') {

                              if (dx > Inventory.PosX[i] && dx < Inventory.PosX[i] + 50 && y > Inventory.PosY[i] && y < Inventory.PosY[i] + 50) {
                                  this.id_3_Click = true;
                                  home.itemInfo = true;
                              }
                          }
                          if (Inventory.items[i].id == 'Snack') {

                              if (dx > Inventory.PosX[i] && dx < Inventory.PosX[i] + 50 && y > Inventory.PosY[i] && y < Inventory.PosY[i] + 50) {
                                  this.snack_Click = true;
                                  home.itemInfo = true;
                              }
                          }
                      }
                  }
              },
              update: function () {
                  this.close.src = "image/ui/close.png";
                  if (this.Passport_click == true) {
                      this.drawPassport();
                      if (dx > 290 && dx < 315 && dy > 230 && dy < 265) {
                          canvas.style.cursor = "pointer";
                          this.Passport_click = false;
                          home.itemInfo = false;
                          this.view = false;
                      }
                  }
                  if (this.wooden_Stick_Click == true) {
                      this.draw_Wooden_Stick();
                      if (dx > 290 && dx < 315 && dy > 230 && dy < 265) {
                          canvas.style.cursor = "pointer";
                          this.wooden_Stick_Click = false;
                          home.itemInfo = false;
                      }

                  }
                  if (this.rock_Click == true) {
                      this.draw_Rock();
                      if (dx > 290 && dx < 315 && dy > 230 && dy < 265) {
                          canvas.style.cursor = "pointer";
                          this.rock_Click = false;
                          home.itemInfo = false;
                      }

                  }
                  if (this.fish_Click == true) {
                      this.draw_Fish();
                      if (dx > 290 && dx < 315 && dy > 230 && dy < 265) {
                          canvas.style.cursor = "pointer";
                          this.fish_Click = false;
                          home.itemInfo = false;
                      }

                  }
                  if (this.banana_Click == true) {
                      this.draw_Banana();
                      if (dx > 290 && dx < 315 && dy > 230 && dy < 265) {
                          canvas.style.cursor = "pointer";
                          this.banana_Click = false;
                          home.itemInfo = false;
                      }

                  }
                  if (this.water_Skin_Click == true) {
                      this.draw_Water_Skin();
                      if (dx > 290 && dx < 315 && dy > 230 && dy < 265) {
                          canvas.style.cursor = "pointer";
                          this.water_Skin_Click = false;
                          home.itemInfo = false;
                      }

                  }
                  if (this.cocount_Click == true) {
                      this.draw_Cocount();
                      if (dx > 290 && dx < 315 && dy > 230 && dy < 265) {
                          canvas.style.cursor = "pointer";
                          this.cocount_Click = false;
                          home.itemInfo = false;
                      }

                  }
                  if (this.id_1_Click == true) {
                      this.draw_Id_1();
                      if (dx > 290 && dx < 315 && dy > 230 && dy < 265) {
                          canvas.style.cursor = "pointer";
                          this.id_1_Click = false;
                          home.itemInfo = false;
                      }

                  }
                  if (this.id_2_Click == true) {
                      this.draw_Id_2();
                      if (dx > 290 && dx < 315 && dy > 230 && dy < 265) {
                          canvas.style.cursor = "pointer";
                          this.id_2_Click = false;
                          home.itemInfo = false;
                      }

                  }
                  if (this.id_3_Click == true) {
                      this.draw_Id_3();
                      if (dx > 290 && dx < 315 && dy > 230 && dy < 265) {
                          canvas.style.cursor = "pointer";
                          this.id_3_Click = false;
                          home.itemInfo = false;
                      }

                  }
                  if (this.snack_Click == true) {
                      this.draw_Snack();
                      if (dx > 290 && dx < 315 && dy > 230 && dy < 265) {
                          canvas.style.cursor = "pointer";
                          this.snack_Click = false;
                          home.itemInfo = false;
                      }

                  }
              },
              drawContent: function () {
                  ctx.fillStyle = "rgba(0,0,0,0.7)";
                  ctx.fillRect(80, 220, 246, 288);
                  ctx.drawImage(this.close, 290, 230);
                  if (x > 290 && x < 315 && y > 230 && y < 265) {
                      canvas.style.cursor = "pointer";
                  }
                  ctx.font = "18px Poppins";
                  ctx.fillStyle = "white";
                  ctx.textAlign = "left";
              },
              drawFoodContent: function () {
                  ctx.fillStyle = "darkRed";
                  ctx.fillRect(180, 480, 40, 20);
                  ctx.fillStyle = "white";
                  ctx.fillText('Eat', 187, 495);
                  if (x > 180 && x < 220 && y > 480 && y < 500) {
                      canvas.style.cursor = "pointer";
                  }
              },
              drawDrinkContent: function () {
                  ctx.fillStyle = "darkRed";
                  ctx.fillRect(176, 480, 47, 20);
                  ctx.fillStyle = "white";
                  ctx.fillText('Drink', 177, 495);
                  if (x > 176 && x < 225 && y > 480 && y < 500) {
                      canvas.style.cursor = "pointer";
                  }
              },
              drawPassport: function () {
                  var passportContent = new Image();
                  passportContent.src = "image/item/passport.png";
                  this.drawContent();
                  ctx.drawImage(passportContent, 100, 270, 200, 200);
                  ctx.fillText('It\'s my passport.', 90, 250);
                  setInterval(Animate.passport.start, 100);
              },
              draw_Wooden_Stick: function () {
                  var wooden_Stick = new Image();
                  wooden_Stick.src = "image/item/wooden_stick.png";
                  this.drawContent();
                  ctx.drawImage(wooden_Stick, 100, 270, 200, 200);

                  ctx.fillText('Just a stick.', 90, 250);
              },
              draw_Rock: function () {
                  var rock = new Image();
                  rock.src = "image/item/rock.png";
                  this.drawContent();
                  ctx.drawImage(rock, 100, 270, 200, 200);
                  ctx.font = "16px Poppins";
                  ctx.fillText('It got nerves of steel.', 90, 250);
              },
              draw_Fish: function () {
                  var fish = new Image();
                  fish.src = "image/item/fish.png";
                  this.drawContent();
                  ctx.drawImage(fish, 100, 270, 200, 200);
                  this.drawFoodContent();
                  ctx.font = "16px Poppins";

                  ctx.fillText('Just Keep Swimming.', 90, 250);
              },
              draw_Banana: function () {
                  var banana = new Image();
                  banana.src = "image/item/banana.png";
                  this.drawContent();
                  ctx.drawImage(banana, 100, 270, 200, 200);
                  this.drawFoodContent();

                  ctx.font = "16px Poppins";
                  ctx.fillText('Common tropical fruit.', 90, 250);
              },
              draw_Water_Skin: function () {
                  var water_Skin = new Image();
                  water_Skin.src = "image/item/water_skin.png";
                  this.drawContent();
                  ctx.drawImage(water_Skin, 100, 270, 200, 200);
                  this.drawDrinkContent();

                  ctx.font = "16px Poppins";
                  ctx.fillText('It can be filled with water.', 90, 250);
              },
              draw_Cocount: function () {
                  var coconut = new Image();
                  coconut.src = "image/item/coconut.png";
                  this.drawContent();
                  ctx.drawImage(coconut, 100, 270, 200, 200);
                  this.drawFoodContent();

                  ctx.font = "16px Poppins";
                  ctx.fillText('Common tropical fruit.', 90, 250);
              },
              draw_Id_1: function () {
                  var id = new Image();
                  id.src = "image/item/man_1_id.png";
                  this.drawContent();
                  ctx.drawImage(id, 53, 270, 300, 200);
                  ctx.font = "16px Poppins";
                  ctx.fillText('Lucas\'s ID.', 90, 250);
              },
              draw_Id_2: function () {
                  var id = new Image();
                  id.src = "image/item/man_2_id.png";
                  this.drawContent();
                  ctx.drawImage(id, 53, 270, 300, 200);
                  ctx.font = "16px Poppins";
                  ctx.fillText('William\'s ID.', 90, 250);
              },
              draw_Id_3: function () {
                  var id = new Image();
                  id.src = "image/item/man_3_id.png";
                  this.drawContent();
                  ctx.drawImage(id, 53, 270, 300, 200);
                  ctx.font = "16px Poppins";
                  ctx.fillText('Ryan\'s ID.', 90, 250);
              },
              draw_Snack: function () {
                  var snack = new Image();
                  snack.src = "image/item/snack.png";
                  this.drawContent();
                  ctx.drawImage(snack, 105, 300, 200, 85);
                  this.drawFoodContent();
                  ctx.font = "16px Poppins";
                  ctx.fillText('Consumable.', 90, 250);
              }
          }

          var Animate = {



              info: {
                  x: 100,
                  y: 100,
                  alpha: 1,
                  start: false,
                  name: '',
                  amount: 0,
                  run: function () {

                      ctx.save();
                      ctx.fillStyle = "black";
                      this.alpha -= 0.01
                      ctx.globalAlpha = this.alpha;
                      ctx.fillRect(100, 525, 200, 20);
                      ctx.textAlign = "center";
                      ctx.fillStyle = "white";
                      ctx.font = "16px Poppins";
                      ctx.fillText(this.name + '    x' + this.amount, 200, 540);
                      ctx.restore();
                      if (this.alpha < 0.1) {
                          this.start = false;
                          this.alpha = 1;
                      }

                  }

              },
              passport: {
                  x: 0,
                  y: 0,
                  start: false,
                  run: function () {
                      var pic = new Image();

                      pic.src = "image/item/fuck.png";

                      ctx.drawImage(pic, this.x, this.y -= 0.5);

                      if (this.y < -84) {
                          Animate.passport.start = false;
                          this.y = 0;
                      }

                  }
              }
          }