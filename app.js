'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];


var allStores = [];

var storeTable = document.getElementById('store');

function makeHeaderRow() {
  var trEl = document.createElement('tr');

  var thEl = document.createElement('th');
  thEl.textContent = 'Store';
  trEl.appendChild(thEl);

  for (var i in hours) {
    thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = 'Daily Total';
  trEl.appendChild(thEl);

  storeTable.appendChild(trEl);
}

makeHeaderRow();

function Store(name, minCust, maxCust, avgCookieSales, el){
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSales = avgCookieSales;
  this.dailySales = 0;
  this.hourlySales = [];
  this.el = el;
  allStores.push(this);
}

Store.prototype.hourlyCusts = function(){
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
};

Store.prototype.hourlyTrans = function(){
  for (var i in hours){
    var numCust = this.hourlyCusts();
    this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
  }
};

Store.prototype.dailyTrans = function(){
  for (var i in this.hourlySales){
    this.dailySales += this.hourlySales[i];
  }
};

Store.prototype.render = function(){

  var trEl = document.createElement('tr');

  var thEl = document.createElement('th');
  thEl.textContent = this.name;
  trEl.appendChild(thEl);

  for (var i in this.hourlySales) {
    var tdEl = document.createElement('td');
    tdEl.textContent = this.hourlySales[i] + ' cookies';
    trEl.appendChild(tdEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = this.dailySales;
  trEl.appendChild(thEl);

  storeTable.appendChild(trEl);
};

// Store.prototype.render = function(){
//   for (var j in allStores){
//     var trEl = document.createElement('tr');
//
//     var thEl = document.createElement('th');
//     thEl.textContent = this.name;
//     trEl.appendChild(thEl);
//
//     for (var i in hours) {
//       var numCust = this.hourlyCusts();
//       this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
//       this.dailySales += this.hourlySales[i];
//       var tdEl = document.createElement('td');
//       tdEl.textContent = this.hourlySales[i] + ' cookies';
//       var storeTd = document.getElementById(this.el);
//       storeTd.appendChild(tdEl);
//     }
//     storeTable.appendChild(trEl);
//   };
//
// };

new Store('1st and Pike', 23, 65, 6.3, 'pike');
new Store('SeaTac Airport', 3, 24, 1.2, 'seaTac');
new Store('Seattle Center', 11, 38, 3.7, 'seaCntr');
new Store('Capitol Hill', 20, 38, 2.3, 'capHill');
new Store('Alki', 2, 16, 4.6, 'alki');
console.log(allStores);

for (var i in allStores){
  allStores[i].hourlyTrans();
  allStores[i].dailyTrans();
  allStores[i].render();
}

//   var trEl = document.createElement('tr');
//
//   var thEl = document.createElement('th');
//   thEl.textContent = '1st and Pike';
//   trEl.appendChild(thEl);
//
//   for (var i in hours) {
//     var numCust = this.hourlyCusts();
//     this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
//     this.dailySales += this.hourlySales[i];
//     var tdEl = document.createElement('td');
//     tdEl.textContent = this.hourlySales[i] + ' cookies';
//     tdEl.appendChild(thEl);
//   }
//
//   tdEl = document.createElement('th');
//   tdEl.textContent = 'Daily Total';
//   trEl.appendChild(tdEl);
//
//   storeTable.appendChild(trEl);
// }


// var pike = {
//   name: 'Pike and 1st',
//   minCust: 23,
//   maxCust: 65,
//   avgCookieSales: 6.3,
//   dailySales: 0,
//   hourlySales: [],
//   hourlyCusts: function(){
//     return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
//   },
//   render: function(){
//     for (var i = 0; i < hours.length; i++){
//       var numCust = this.hourlyCusts();
//       this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
//       this.dailySales += this.hourlySales[i];
//       var liEl = document.createElement('li');
//       liEl.textContent = hours[i] + ': ' + this.hourlySales[i] + ' cookies';
//       var pikeUl = document.getElementById('pike');
//       pikeUl.appendChild(liEl);
//       //console.log(hours[i] + ': ' + this.hourlyCusts());
//     }
//   },
//   total: function(){
//     // console.log(this.dailySales);
//     // console.log(this.avgCookieSales);
//     // var totalSales = Math.round(this.dailySales);
//     var liEl = document.createElement('li');
//     liEl.textContent = 'Total Daily Sales: ' + this.dailySales + ' cookies';
//     var pikeUl = document.getElementById('pike');
//     pikeUl.appendChild(liEl);
//   }
// };
// // pike.render();
//
// var seaTac = {
//   name: 'SeaTac Airport',
//   minCust: 3,
//   maxCust: 24,
//   avgCookieSales: 1.2,
//   dailySales: 0,
//   hourlySales: [],
//   hourlyCusts: function(){
//     return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
//   },
//   render: function(){
//     for (var i = 0; i < hours.length; i++){
//       var numCust = this.hourlyCusts();
//       this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
//       this.dailySales += this.hourlySales[i];
//       var liEl = document.createElement('li');
//       liEl.textContent = hours[i] + ': ' + this.hourlySales[i] + ' cookies';
//       var seaTacUl = document.getElementById('seaTac');
//       seaTacUl.appendChild(liEl);
//     }
//   },
//   total: function(){
//     var liEl = document.createElement('li');
//     liEl.textContent = 'Total Daily Sales: ' + this.dailySales + ' cookies';
//     var seaTacUl = document.getElementById('seaTac');
//     seaTacUl.appendChild(liEl);
//   }
// };
// // seaTac.render();
//
// var seaCntr = {
//   name: 'Seattle Center',
//   minCust: 11,
//   maxCust: 38,
//   avgCookieSales: 3.7,
//   dailySales: 0,
//   hourlySales: [],
//   hourlyCusts: function(){
//     return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
//   },
//   render: function(){
//     for (var i = 0; i < hours.length; i++){
//       var numCust = this.hourlyCusts();
//       this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
//       this.dailySales += this.hourlySales[i];
//       var liEl = document.createElement('li');
//       liEl.textContent = hours[i] + ': ' + this.hourlySales[i] + ' cookies';
//       var seaCntrUl = document.getElementById('seaCntr');
//       seaCntrUl.appendChild(liEl);
//     }
//   },
//   total: function(){
//     var liEl = document.createElement('li');
//     liEl.textContent = 'Total Daily Sales: ' + this.dailySales + ' cookies';
//     var seaCntrUl = document.getElementById('seaCntr');
//     seaCntrUl.appendChild(liEl);
//   }
// };
// // seaCntr.render();
//
// var capHill = {
//   name: 'Capitol Hill',
//   minCust: 20,
//   maxCust: 38,
//   avgCookieSales: 2.3,
//   dailySales: 0,
//   hourlySales: [],
//   hourlyCusts: function(){
//     return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
//   },
//   render: function(){
//     for (var i = 0; i < hours.length; i++){
//       var numCust = this.hourlyCusts();
//       this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
//       this.dailySales += this.hourlySales[i];
//       var liEl = document.createElement('li');
//       liEl.textContent = hours[i] + ': ' + this.hourlySales[i] + ' cookies';
//       var capHillUl = document.getElementById('capHill');
//       capHillUl.appendChild(liEl);
//     }
//   },
//   total: function(){
//     var liEl = document.createElement('li');
//     liEl.textContent = 'Total Daily Sales: ' + this.dailySales + ' cookies';
//     var capHillUl = document.getElementById('capHill');
//     capHillUl.appendChild(liEl);
//   }
// };
// // capHill.render();
//
// var alki = {
//   name: 'Alki',
//   minCust: 2,
//   maxCust: 16,
//   avgCookieSales: 4.6,
//   dailySales: 0,
//   hourlySales: [],
//   hourlyCusts: function(){
//     return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
//   },
//   render: function(){
//     for (var i = 0; i < hours.length; i++){
//       var numCust = this.hourlyCusts();
//       this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
//       this.dailySales += this.hourlySales[i];
//       var liEl = document.createElement('li');
//       liEl.textContent = hours[i] + ': ' + this.hourlySales[i] + ' cookies';
//       var alkiUl = document.getElementById('alki');
//       alkiUl.appendChild(liEl);
//     }
//   },
//   total: function(){
//     var liEl = document.createElement('li');
//     liEl.textContent = 'Total Daily Sales: ' + this.dailySales + ' cookies';
//     var alkiUl = document.getElementById('alki');
//     alkiUl.appendChild(liEl);
//   }
// };
// alki.render();

// var locations = [pike, seaTac, seaCntr, capHill, alki];

// for (var i in allStores){
//   allStores[i].render();
// allStores[i].total();
// }
