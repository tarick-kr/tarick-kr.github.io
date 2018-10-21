// инициализируем Phaser. В этой строке мы указываем размер окна (800x600), тип рендера (в данном случае автоматический выбор между WebGL и Canvas), название и основные функции 
var game = new Phaser.Game(640, 360, Phaser.AUTO, 'battleSea_v4', { preload: preload, create: create, update: update}); 
  
// объявляем переменную для нашего будущего спрайта 
var backgroundSea; 
  
// preload() содержит код для загрузки ресурсов 
function preload() { 
  
// загрузим какую-нибудь картинку: первым параметром идет название картинки, а вторым путь к ней
game.load.image('backgroundSea', 'assets/backgroundSea.png');
//game.load.image('starfield', 'assets/games/invaders/starfield.png');
} 
  
// create() вызывается после того, как завершится выполнение preload(). Предназначен для создания объектов, например, спрайтов, карт, коллизий и тому подобных вещей. 
function create() { 
 // создаем наш спрайт из картинки, которую только-что загрузили и размещаем его
backgroundSea = game.add.sprite(0, 0, 'backgroundSea');
// запускаем аркадную физику в игре и делаем её доступной для нашего спрайта
game.physics.startSystem(Phaser.Physics.ARCADE);
game.physics.enable(backgroundSea, Phaser.Physics.ARCADE)
} 
  
// update() вызывается 60 раз в секунду. Предназначен для обновления позиций, удаления игровых объектов. В общем для всего того, что является динамической частью игры. 
function update() { 
 // для при,мера сделаем так, чтобы наша картинка перемещалась к низу экрана. Это можно сделать задав параметр velocity.
backgroundSea.body.velocity.x = -100;
} 
