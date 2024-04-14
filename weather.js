window.weatherWidgetConfig =  window.weatherWidgetConfig || [];
window.weatherWidgetConfig.push({
   selector:".weatherWidget",
   apiKey:"E2WYPVKLPDRAQZZ78RPNE3KAZ", //Sign up for your personal key
   location:"Athens, Greece", //Enter an address
   unitGroup:"metric", //"us" or "metric"
   forecastDays:5, //how many days forecast to show
   title:"Athens, Greece", //optional title to show in the 
   showTitle:true, 
   showConditions:true
});
  
(function() {
var d = document, s = d.createElement('script');
s.src = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Athens%2C%20Greece?unitGroup=metric&key=E2WYPVKLPDRAQZZ78RPNE3KAZ&contentType=json';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();