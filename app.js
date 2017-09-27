'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var allStores = [];
var storeTable = document.getElementById('store');
var newCookieStore = document.getElementById('new-store');
var allStoreTotals = [];
var totalTurtle = 0;


function Store(name, minCust, maxCust, avgCookieSales){
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSales = avgCookieSales;
  this.dailySales = 0;
  this.hourlySales = [];
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

new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);


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
  totalTurtle = 0;
  for (var i in allStoreTotals){
    totalTurtle += allStoreTotals[i];
  }
}

function makeTotalsRender() {
  var trEl = document.createElement('tr');
  trEl.setAttribute('id', 'footer');

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

function handleNewStoreSubmit(event){
  allStoreTotals = [];
  event.preventDefault();
  var footerRow = document.getElementById('footer');
  if (!event.target.getStoreName.value || !event.target.getMinCusts.value || !event.target.getMaxCusts.value || !event.target.getAvgSales.value ) {
    return alert('Please fill in all fields!');
  }

  var newStoreName = event.target.getStoreName.value;
  var newMinCusts = parseInt(event.target.getMinCusts.value);
  var newMaxCusts = parseInt(event.target.getMaxCusts.value);
  var newAvgSales = parseInt(event.target.getAvgSales.value);
  new Store(newStoreName, newMinCusts, newMaxCusts, newAvgSales);

  event.target.getStoreName.value = null;
  event.target.getMinCusts.value = null;
  event.target.getMaxCusts.value = null;
  event.target.getAvgSales.value = null;

  storeTable.removeChild(footerRow);

  allStores[allStores.length - 1].hourlyTrans();
  allStores[allStores.length - 1].dailyTrans();
  allStores[allStores.length - 1].render();

  columnSum();
  totalTotalSum();
  makeTotalsRender();
}


newCookieStore.addEventListener('submit', handleNewStoreSubmit);

makeHeaderRow();

dataRowCall();

columnSum();

totalTotalSum();

makeTotalsRender();
