/**
 *   Name: Maxim Tsov
 *   Date: 09.04.2020
 *   Lab9
 */
"use strict";

(function () {

    window.addEventListener("load", initialize);

    /**
     *  initialize function
     */
    function initialize() {
        let busStopInfo = JSON.parse(getBusStopInfo());

        document.getElementById("busStopName").innerText = busStopInfo.name;

        let busNameLabel = document.getElementsByClassName("busNameLabel");
        let buses = busStop.buses.split(',');
        let radioBox = document.getElementsByName("radioBox");
        for (let i = 0; i < busNameLabel.length; i++) {
            busNameLabel[i].innerHTML = "Bus №" + buses[i];
            radioBox[i].classList.value = buses[i];
            radioBox[i].addEventListener("change", radioChange);
        }
        document.getElementById("busList").innerText = "Busses: " + busStopInfo.buses;
    }

    /**
     *  RadioButton change event
     */
    function radioChange() {
        let info = JSON.parse(getBus(this.classList.value));

        let output = "";
        output += info.name + " - " + info.size + " size\n";
        output += "Route: " + info.start + " to " + info.end + "\n";
        output += "Frequency: " + info.frequency + " minutes\n";
        output += "Quality: " + info.quality + "/5 \n";
        output += "Note: " + info.note;
        document.getElementById("output").innerText = output;
    }

})();