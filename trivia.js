//Nuevas Preguntas
//nuevasPreguntas();

let idx_film=0;
let idx_musi=0;
let idx_geog=0;
let film = document.querySelector("#vertical1-preg");
let musi = document.querySelector("#vertical2-preg");
let geog = document.querySelector("#vertical3-preg");
let musi_opc;
let array_film_q = [];
let array_film_a = [];
let array_musica_q = [];
let array_musica_a = [];
let array_musica_opc1=[];
let array_musica_opc2=[];
let array_musica_opc3=[];
let array_musica_opc4=[];
let array_geografia_q=[];
let array_geografia_a=[];
let azar;

function nuevasPreguntas() {
        llenar_array();
 }

async function llenar_array() {
    //llenando con Film (V o F)
    let response = await fetch("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=boolean");
    let dataApi = await response.json();
    
    for (let i = 0; i < dataApi.results.length; i++) {
        array_film_q.push(dataApi.results[i].question);
        array_film_a.push(dataApi.results[i].correct_answer);
    }
    film.innerHTML=array_film_q[0];
    idx_film=0;


    //llenando con Musica (varios elementos)
    response = await fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple");
    dataApi = await response.json();

    for (i = 0; i < dataApi.results.length; i++) {
        array_musica_q.push(dataApi.results[i].question);
        array_musica_a.push(dataApi.results[i].correct_answer);

        azar = Math.floor(Math.random() * 4); //azar de resp correcta
        if (azar==0) {
            array_musica_opc1.push(dataApi.results[i].correct_answer);
        } else {
            array_musica_opc1.push(dataApi.results[i].incorrect_answers[0]);
        }
        if (azar==1) {
            array_musica_opc2.push(dataApi.results[i].correct_answer);
        } else {
            array_musica_opc2.push(dataApi.results[i].incorrect_answers[1]);
        }
        if (azar==2) {
            array_musica_opc3.push(dataApi.results[i].correct_answer);
        } else {
            array_musica_opc3.push(dataApi.results[i].incorrect_answers[2]);
        }
        if (azar==3) {
            array_musica_opc4.push(dataApi.results[i].correct_answer);
        } else {
            array_musica_opc4.push(dataApi.results[i].incorrect_answers[3]);
        }
        
    }
    musi.innerHTML=array_musica_q[0];
    idx_musi=0;

    musi_opc = document.querySelector("#vertical2-radio-opc1");
    musi_opc.innerText=array_musica_opc1[0];
    musi_opc = document.querySelector("#vertical2-radio-opc2");
    musi_opc.innerText=array_musica_opc2[0];
    musi_opc = document.querySelector("#vertical2-radio-opc3");
    musi_opc.innerText=array_musica_opc3[0];
    musi_opc = document.querySelector("#vertical2-radio-opc4");
    musi_opc.innerText=array_musica_opc4[0];
    

    //llenando con geografia (T o F)
    response = await fetch("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=boolean");
    dataApi = await response.json();
    
    for (i = 0; i < dataApi.results.length; i++) {
        array_geografia_q.push(dataApi.results[i].question);
        array_geografia_a.push(dataApi.results[i].correct_answer);
    }
    geog.innerHTML=array_geografia_q[0];
    idx_geog=0;
}


//cambiar pregunta
function vertical1_click() {  //film
    idx_film=idx_film + 1;
    if (idx_film > 9){
        idx_film = 0;
    }
    film.innerHTML=array_film_q[idx_film];
    //limpia los radio button
    musi_opc = document.querySelectorAll("#vertical1-radio");
    for(i = 0; i < musi_opc.length; i++) {
        musi_opc[i].checked = false;
    }
}
function vertical2_click() {   //musica
    idx_musi=idx_musi + 1;
    if (idx_musi > 9){
        idx_musi = 0;
    }
    musi.innerHTML=array_musica_q[idx_musi];

    musi_opc = document.querySelector("#vertical2-radio-opc1");
    musi_opc.innerText=array_musica_opc1[idx_musi];
    musi_opc = document.querySelector("#vertical2-radio-opc2");
    musi_opc.innerText=array_musica_opc2[idx_musi];
    musi_opc = document.querySelector("#vertical2-radio-opc3");
    musi_opc.innerText=array_musica_opc3[idx_musi];
    musi_opc = document.querySelector("#vertical2-radio-opc4");
    musi_opc.innerText=array_musica_opc4[idx_musi];

    //limpia los radio button
    musi_opc = document.querySelectorAll("#vertical2-radio");
    for(i = 0; i < musi_opc.length; i++) {
        musi_opc[i].checked = false;
    }
}

function vertical3_click() {   //geog
    idx_geog=idx_geog + 1;
    if (idx_geog > 9){
        idx_geog = 0;
    }
    geog.innerHTML=array_geografia_q[idx_geog];

    //limpia los radio button
    musi_opc = document.querySelectorAll("#vertical3-radio");
    for(i = 0; i < musi_opc.length; i++) {
        musi_opc[i].checked = false;
    }
}



//selecciona opcion
let tempVal;
let puntaje, puntaje_total;
let tempTotal;
function vertical1_radio_true() {
    puntaje=document.querySelector("#vertical1-puntaje");
    tempVal = parseInt(puntaje.innerText);

    puntaje_total=document.querySelector("#horiz1-points");
    tempTotal = parseInt(puntaje_total.innerText);
    
    if (array_film_a[idx_film]) {
        puntaje.innerText=tempVal + 100;
        puntaje_total.innerText=tempTotal + 100;
        alert("Correcto");
    } else {
        puntaje.innerText=tempVal - 100;
        puntaje_total.innerText=tempTotal - 100;
        alert("Incorrecto");
    }
    vertical1_click();   //cambiar pregunta
}
function vertical1_radio_false() {
    puntaje=document.querySelector("#vertical1-puntaje");
    tempVal = parseInt(puntaje.innerText);
    
    puntaje_total=document.querySelector("#horiz1-points");
    tempTotal = parseInt(puntaje_total.innerText);

    if (array_film_a[idx_film]) {
        puntaje.innerText=tempVal - 100;
        puntaje_total.innerText=tempTotal - 100;
        alert("Incorrecto");
    } else {
        puntaje.innerText=tempVal + 100;
        puntaje_total.innerText=tempTotal + 100;
        alert("Correcto");
    }
    vertical1_click();   //cambiar pregunta
}

//Musica
function vertical2_radio_opc1() {
    vertical2_radio_opcion(array_musica_opc1[idx_musi]);
}
function vertical2_radio_opc2() {
    vertical2_radio_opcion(array_musica_opc2[idx_musi]);
}
function vertical2_radio_opc3() {
    vertical2_radio_opcion(array_musica_opc3[idx_musi]);
}
function vertical2_radio_opc4() {
    vertical2_radio_opcion(array_musica_opc4[idx_musi]);
}
function vertical2_radio_opcion(eleccion) {
    puntaje=document.querySelector("#vertical2-puntaje")
    tempVal = parseInt(puntaje.innerText);
        
    puntaje_total=document.querySelector("#horiz1-points")
    tempTotal = parseInt(puntaje_total.innerText);

    if (eleccion == array_musica_a[idx_musi] ) {
        puntaje.innerText=tempVal + 50;
        puntaje_total.innerText=tempTotal + 50;
        alert("Correcto");
    } else {
        puntaje.innerText=tempVal - 50;
        puntaje_total.innerText=tempTotal - 50;
        alert("Incorrecto");
    }    
    vertical2_click();   //cambiar pregunta
}

//geog
function vertical3_radio_true() {
    puntaje=document.querySelector("#vertical3-puntaje")
    tempVal = parseInt(puntaje.innerText);
        
    puntaje_total=document.querySelector("#horiz1-points")
    tempTotal = parseInt(puntaje_total.innerText);

    if (array_geografia_a[idx_geog]) {
        puntaje.innerText=tempVal + 100;
        puntaje_total.innerText=tempTotal + 100;
        alert("Correcto");
    } else {
        puntaje.innerText=tempVal - 100;
        puntaje_total.innerText=tempTotal - 100;
        alert("Incorrecto");
    }
    vertical3_click();   //cambiar pregunta
}
function vertical3_radio_false() {
    puntaje=document.querySelector("#vertical3-puntaje")
    tempVal = parseInt(puntaje.innerText);
        
    puntaje_total=document.querySelector("#horiz1-points")
    tempTotal = parseInt(puntaje_total.innerText);

    if (array_geografia_a[idx_geog]) {
        puntaje.innerText=tempVal - 100;
        puntaje_total.innerText=tempTotal - 100;
        alert("Incorrecto");
    } else {
        puntaje.innerText=tempVal + 100;
        puntaje_total.innerText=tempTotal + 100;
        alert("Correcto");
    }
    vertical3_click();   //cambiar pregunta
}