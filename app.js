'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var pike = {
  name: 'Pike and 1st',
  minCust: 23,
  maxCust: 65,
  avgCookieSales: 6.3,
  dailySales: 0,
  hourlySales: [],
  hourlyCusts: function(){
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  render: function(){
    for (var i = 0; i < hours.length; i++){
      var numCust = this.hourlyCusts();
      this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
      this.dailySales += this.hourlySales[i];
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.hourlySales[i] + ' cookies';
      var pikeUl = document.getElementById('pike');
      pikeUl.appendChild(liEl);
      //console.log(hours[i] + ': ' + this.hourlyCusts());
    }
  },
  total: function(){
    // console.log(this.dailySales);
    // console.log(this.avgCookieSales);
    // var totalSales = Math.round(this.dailySales);
    var liEl = document.createElement('li');
    liEl.textContent = 'Total Daily Sales: ' + this.dailySales + ' cookies';
    var pikeUl = document.getElementById('pike');
    pikeUl.appendChild(liEl);
  }
};
// pike.render();

var seaTac = {
  name: 'SeaTac Airport',
  minCust: 3,
  maxCust: 24,
  avgCookieSales: 1.2,
  dailySales: 0,
  hourlySales: [],
  hourlyCusts: function(){
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  render: function(){
    for (var i = 0; i < hours.length; i++){
      var numCust = this.hourlyCusts();
      this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
      this.dailySales += this.hourlySales[i];
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.hourlySales[i] + ' cookies';
      var seaTacUl = document.getElementById('seaTac');
      seaTacUl.appendChild(liEl);
    }
  },
  total: function(){
    var liEl = document.createElement('li');
    liEl.textContent = 'Total Daily Sales: ' + this.dailySales + ' cookies';
    var seaTacUl = document.getElementById('seaTac');
    seaTacUl.appendChild(liEl);
  }
};
// seaTac.render();

var seaCntr = {
  name: 'Seattle Center',
  minCust: 11,
  maxCust: 38,
  avgCookieSales: 3.7,
  dailySales: 0,
  hourlySales: [],
  hourlyCusts: function(){
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  render: function(){
    for (var i = 0; i < hours.length; i++){
      var numCust = this.hourlyCusts();
      this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
      this.dailySales += this.hourlySales[i];
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.hourlySales[i] + ' cookies';
      var seaCntrUl = document.getElementById('seaCntr');
      seaCntrUl.appendChild(liEl);
    }
  },
  total: function(){
    var liEl = document.createElement('li');
    liEl.textContent = 'Total Daily Sales: ' + this.dailySales + ' cookies';
    var seaCntrUl = document.getElementById('seaCntr');
    seaCntrUl.appendChild(liEl);
  }
};
// seaCntr.render();

var capHill = {
  name: 'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  avgCookieSales: 2.3,
  dailySales: 0,
  hourlySales: [],
  hourlyCusts: function(){
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  render: function(){
    for (var i = 0; i < hours.length; i++){
      var numCust = this.hourlyCusts();
      this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
      this.dailySales += this.hourlySales[i];
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.hourlySales[i] + ' cookies';
      var capHillUl = document.getElementById('capHill');
      capHillUl.appendChild(liEl);
    }
  },
  total: function(){
    var liEl = document.createElement('li');
    liEl.textContent = 'Total Daily Sales: ' + this.dailySales + ' cookies';
    var capHillUl = document.getElementById('capHill');
    capHillUl.appendChild(liEl);
  }
};
// capHill.render();

var alki = {
  name: 'Alki',
  minCust: 2,
  maxCust: 16,
  avgCookieSales: 4.6,
  dailySales: 0,
  hourlySales: [],
  hourlyCusts: function(){
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  render: function(){
    for (var i = 0; i < hours.length; i++){
      var numCust = this.hourlyCusts();
      this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
      this.dailySales += this.hourlySales[i];
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.hourlySales[i] + ' cookies';
      var alkiUl = document.getElementById('alki');
      alkiUl.appendChild(liEl);
    }
  },
  total: function(){
    var liEl = document.createElement('li');
    liEl.textContent = 'Total Daily Sales: ' + this.dailySales + ' cookies';
    var alkiUl = document.getElementById('alki');
    alkiUl.appendChild(liEl);
  }
};
// alki.render();

var locations = [pike, seaTac, seaCntr, capHill, alki];

for (var i in locations){
  locations[i].render();
  locations[i].total();
}
