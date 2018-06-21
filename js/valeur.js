var Lat = 43.182285500000006;        // LAT et LNG pour api meteo
var Lng = 2.9789195;

var Tempe = 35,
    Hum = 75,
    Masse = 34,
    Air = 85,
    NbAbeille = 48000;

var MTempeFst = 0;
var MTempe = 35;
var cardi = 0;
var Humi = 0;
var LogoM = "";
var VtVent = 0;

var EspTempe = 0;
var EspHum = 0;
var EspMasse = 0;
var EspAir = 0;
var interval;

function round2Fixed(value) {      // fonction arrondie a 2 decimales
    value = +value;

    if (isNaN(value))
        return NaN;

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + 2) : 2)));

    // Shift back
    value = value.toString().split('e');
    return (+(value[0] + 'e' + (value[1] ? (+value[1] - 2) : -2))).toFixed(2);
}

function RefreshVar() {          // fonction qui rafraichien consequence de l'esp
    var Esp = new XMLHttpRequest();
    Esp.open('GET' ,'http://192.168.4.1:80/read', false);
    Esp.send(null);


    if (Esp.status === 200) {
        var EspJson = JSON.parse(Esp.responseText);
    }

    EspTempe = EspJson.temp;
    Tempe = EspTempe;
    EspHum = EspJson.humidity;
    Hum = EspHum;
    EspMasse = EspJson.button1;
    Masse = round2Fixed(EspMasse / 10.24);
    EspAir = EspJson.button2;
    Air = round2Fixed(EspAir / 10.24);

    Variable();
}

var Meteo = new XMLHttpRequest();        // recup api meteo
Meteo.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + Lat +'&lon=' + Lng + '&appid=d3d7ae9413c8c4679b5e2db711c348cc', false);
Meteo.send(null);


if (Meteo.status === 200) {
     var courses = JSON.parse(Meteo.responseText);
}

function degreeToCardinalDirection(degree) {                    // fonction degree to cardinal
    const val = Math.floor(0.5 + (degree / 22.5)),
        cardinalDirection =  [
            'N',
            'NNE',
            'NE',
            'ENE',
            'E',
            'ESE',
            'SE',
            'SSE',
            'S',
            'SSO',
            'SO',
            'OSO',
            'O',
            'ONO',
            'NO',
            'NNO'
        ];

    return cardinalDirection[(val % 16)];
}

cardi = courses.wind.deg;                                             // sens du vent
if (cardi == null){
    cardi = 358;
    var Cardinal = degreeToCardinalDirection(cardi);
}else{
    var Cardinal = degreeToCardinalDirection(cardi);
}


MTempeFst = courses.main.temp;                                         // temp meteo

MTempe = parseInt(MTempeFst - 273.15);

VtVent = courses.wind.speed;                                           // Vitesse du vent

Humi = courses.main.humidity;                                          // humidité

LogoM = courses.weather[0].main;                                       // il fait beau :)

switch (LogoM) {                                                       // switch pour le logo du temps
    case 'Clear':
        LogoM = "wi wi-day-sunny";
        break;
    case 'Clouds':
        LogoM = "wi wi-cloud";
        break;
    case 'Drizzle':
        LogoM = "wi wi-showers";
        break;
    case 'Rain':
        LogoM = "wi wi-rain";
        break;
    case 'Thunderstorm':
        LogoM = "wi wi-thunderstorm";
        break;
    case 'Snow':
        LogoM = "wi wi-snow";
        break;
    case 'Atmosphere':
        LogoM = "wi wi-fog";
        break;
    default:
        console.log('Erreur LogoM = ' + LogoM );
}

var TempeP = document.getElementsByTagName('p')[3];                                   // tous les trucs qui sont modifié dans le html
var HumP = document.getElementsByTagName('p')[5];
var MasseP = document.getElementsByTagName('p')[7];
var AirP = document.getElementsByTagName('p')[9];
var Abeilles = document.getElementsByTagName('p')[11];
var MTempeP = document.getElementsByTagName('p')[12];
var CardiP = document.getElementsByTagName('p')[13];
var VtVentP = document.getElementsByTagName('p')[14];
var HumiP = document.getElementsByTagName('p')[15];
var LogoMP = document.getElementsByTagName('i')[2];

function Variable() {                                                               // envoi des variable dans le html
    if (Tempe < 30 || Tempe > 40){
        TempeP.innerHTML = Tempe + "°C";
        TempeP.style.color = "#C20007";
    } else if (Tempe >= 30 && Tempe <= 33 || Tempe >= 37 && Tempe <= 40){
        TempeP.innerHTML = Tempe + "°C";
        TempeP.style.color = "#FF7E08";
    }else {
        TempeP.innerHTML = Tempe + "°C";
        TempeP.style.color = "#05c200";
    }

    if (Hum < 65 || Hum > 85){
        HumP.innerHTML = Hum + " %";
        HumP.style.color = "#C20007";
    } else if (Hum >= 65 && Hum <= 70 || Hum >= 80 && Hum <= 85){
        HumP.innerHTML = Hum + " %";
        HumP.style.color = "#FF7E08";
    }else {
        HumP.innerHTML = Hum + " %";
        HumP.style.color = "#05c200";
    }

    if (Masse < 25 || Masse > 45){
        MasseP.innerHTML = Masse + " Kg";
        MasseP.style.color = "#C20007";
    } else if (Masse >= 25 && Masse <= 30 || Masse >= 40 && Masse <= 45){
        MasseP.innerHTML = Masse + " Kg";
        MasseP.style.color = "#FF7E08";
    }else {
        MasseP.innerHTML = Masse + " Kg";
        MasseP.style.color = "#05c200";
    }

    if (Air < 65 || Air > 100){
        AirP.innerHTML = Air + " %";
        AirP.style.color = "#C20007";
    } else if (Air >= 65 && Air <= 80){
        AirP.innerHTML = Air + " %";
        AirP.style.color = "#FF7E08";
    }else {
        AirP.innerHTML = Air + " %";
        AirP.style.color = "#05c200";
    }

    Abeilles.innerHTML = NbAbeille + " Abeilles";
    MTempeP.innerHTML = MTempe + "°C";
    CardiP.innerHTML = 'Sens du vent : ' + Cardinal;
    VtVentP.innerHTML = 'Vitesse du vent : ' + (parseInt(VtVent * 3.6)) + 'Km/h';
    HumiP.innerHTML = 'Humidité : ' + Humi + ' %';
    LogoMP.className = LogoM;
}

interval = setInterval(RefreshVar,1000);                                                     // interval de rafachisssement des le depart

function VariableNul() {                                    // pour la ruche deco
        TempeP.innerHTML = "...°C";
        TempeP.style.color = "#FFF";
        HumP.innerHTML = "... %";
        HumP.style.color = "#FFF";
        MasseP.innerHTML = "... Kg";
        MasseP.style.color = "#FFF";
        AirP.innerHTML = "... %";
        AirP.style.color = "#FFF";
        Abeilles.innerHTML = "... Abeilles";

}
var NomRuche = document.getElementsByTagName('p')[0];
var StatusP = document.getElementsByTagName('p')[1];
var ArrRuche = new Array ("Bee&be", "IN'ESS");
var Num = 0;
var Status = new Array ("OK", "DECO");


var Btnsuivant = document.getElementsByTagName('i')[1];                                               // bouton   <   pour changer la ruche
Btnsuivant.addEventListener("click", function () {
    if (Num == 0){
        ++Num;
        NomRuche.innerHTML = 'Ruche : <span id="nomruche">' + ArrRuche[Num] + '</span>';
        StatusP.innerHTML = 'Status : <span id="statusR">' + Status[Num] + '</span>';
        clearInterval(interval);
        VariableNul();
    } else {
        --Num;
        NomRuche.innerHTML = 'Ruche : <span id="nomruche">' + ArrRuche[Num] + '</span>';
        StatusP.innerHTML = 'Status : <span id="status">' + Status[Num] + '</span>';
        clearInterval(interval);
        interval = setInterval(RefreshVar,1000);
    }
});
var Btnsuivant = document.getElementsByTagName('i')[0];                                               // bouton   >   pour changer la ruche
Btnsuivant.addEventListener("click", function () {
    if (Num == 0){
        ++Num;
        NomRuche.innerHTML = 'Ruche : <span id="nomruche">' + ArrRuche[Num] + '</span>';
        StatusP.innerHTML = 'Status : <span id="statusR">' + Status[Num] + '</span>';
        clearInterval(interval);
        VariableNul();
    } else {
        --Num;
        NomRuche.innerHTML = 'Ruche : <span id="nomruche">' + ArrRuche[Num] + '</span>';
        StatusP.innerHTML = 'Status : <span id="status">' + Status[Num] + '</span>';
        clearInterval(interval);
        interval = setInterval(RefreshVar,1000);
    }
});