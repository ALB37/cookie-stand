'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var allStores = [];
var storeTable = document.getElementById('store');
var allStoreTotals = [];
var totalTurtle = 0;


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
  for (var i = 0; i < hours.length; i++){
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

new Store('1st and Pike', 23, 65, 6.3, 'pike');
new Store('SeaTac Airport', 3, 24, 1.2, 'seaTac');
new Store('Seattle Center', 11, 38, 3.7, 'seaCntr');
new Store('Capitol Hill', 20, 38, 2.3, 'capHill');
new Store('Alki', 2, 16, 4.6, 'alki');

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

function dataRowCall(){
  for (var i in allStores){
    allStores[i].hourlyTrans();
    allStores[i].dailyTrans();
    allStores[i].render();
  }
}

function columnSum(){
  for (var i = 0; i < hours.length; i++){
    var storeTotal = 0;
    for (var j = 0; j < allStores.length; j++){
      storeTotal += allStores[j].hourlySales[i];
    }
    allStoreTotals.push(storeTotal);
  }
}

function totalTotalSum(){
  for (var i in allStoreTotals){
    totalTurtle += allStoreTotals[i];
  }
}

function makeTotalsRender() {
  var trEl = document.createElement('tr');

  var thEl = document.createElement('th');
  thEl.textContent = 'All Stores Totals';
  trEl.appendChild(thEl);

  for (var i in hours) {
    thEl = document.createElement('th');
    thEl.textContent = allStoreTotals[i];
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = totalTurtle;
  trEl.appendChild(thEl);

  storeTable.appendChild(trEl);
}


makeHeaderRow();

dataRowCall();

columnSum();

totalTotalSum();

makeTotalsRender();
