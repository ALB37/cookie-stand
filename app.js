'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var pike = {
  name: 'Pike and 1st',
  minCust: 23,
  maxCust: 65,
  avgCookieSales: 6.3,
  hourlyCusts: function(){
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  render: function(){
    for (var i = 0; i < hours.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.hourlyCusts() + ' cookies';
      var pikeUl = document.getElementById('pike');
      pikeUl.appendChild(liEl);
      //console.log(hours[i] + ': ' + this.hourlyCusts());
    }
  }
};
pike.render();

var seaTac = {
  name: 'SeaTac Airport',
  minCust: 3,
  maxCust: 24,
  avgCookieSales: 1.2,

};

var seaCntr = {
  name: 'Seattle Center',
  minCust: 11,
  maxCust: 38,
  avgCookieSales: 3.7,

};

var capHill = {
  name: 'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  avgCookieSales: 2.3,

};

var alki = {
  name: 'Alki',
  minCust: 2,
  maxCust: 16,
  avgCookieSales: 4.6,

};
