var running = false;
var position = 0;
var interval;
var sounds = ["first", "second"];
var delay;

var flag =[];
var beat=[];
var size=[];
var dur1,dur2,dur3;

function getMatId(matrix){
    var table;
    switch (matrix) {
        case 1:
            table="drum-matrix"
        break;
        case 2:
            table="drum-matrix2"
        break;
        case 3:
            table="drum-matrix3"
        break;
    }
    return table;
}

function reset(matrix) {
    var table=getMatId(matrix);
    removeArm(matrix);
    switch (matrix){
        case 1:
            filteredkicks = [];
            filteredsnare = [];
        break;
        case 2:
            tomone = [];
            tomtwo = [];
        break;
        case 3:
            closedh = [];
            openh = [];
        break;
    }
}

function highlightActive(n,matrix) {
    var table=getMatId(matrix);
    var active = document.getElementById(table);
    active.rows[0].cells[n].classList.add("active");
    active.rows[1].cells[n].classList.add("active");
}

function removeHighlight(matrix) {
    var table=getMatId(matrix);
    var deactive = document.getElementById(table);
    for (i = 0; i < deactive.rows[0].cells.length; i++) {
            deactive.rows[0].cells[i].classList.remove("active");
            deactive.rows[1].cells[i].classList.remove("active");
        }
}

function removeArm(matrix) {
    var table=getMatId(matrix);
    var deactive = document.getElementById(table);
    for (i = 0; i < deactive.rows[0].cells.length; i++) {
            deactive.rows[0].cells[i].classList.remove("armed");
            deactive.rows[1].cells[i].classList.remove("armed");
        }
}

function generateTable(n,table,beat) {
    var dis;
    var i = 0
    dis = table.id;
    
    if (table.rows.length != 0){
        for (i = 0; i < sounds.length; i++) {
            table.deleteRow(0);
        }
    }
    for ( i = 0; i < sounds.length; i ++) {
        var row = table.insertRow(i);
        row.classList.add("tableRow");
        
        for (var k = 0; k < n; k++) {
            var cell = row.insertCell(k);
            
            switch ( dis ) {
                    
                case 'drum-matrix':
                    cell.classList.add(k, "cell", "notArmed");
            cell.id = k;
            armByClick(dis,i,cell);
            if (k % (n/beat) === 0) {
                cell.classList.add("beginningOfBeat");
                if (!cell.classList.contains("armed")) {
                    cell.classList.add("notArmedBeginningOfBeat");
                }
            }
                    break;
                case 'drum-matrix2':
                              
            cell.classList.add(k+100, "cell", "notArmed");
            cell.id = k;
            armByClick(dis,i,cell);
            if (k % (n/beat) === 0) {
                cell.classList.add("beginningOfBeat");
                if (!cell.classList.contains("armed")) {
                    cell.classList.add("notArmedBeginningOfBeat");
                }
            }
                    break;
                    
                case 'drum-matrix3':
                    cell.classList.add(k+200, "cell", "notArmed");
            cell.id = k;
            armByClick(dis,i,cell);
            if (k % (n/beat) === 0) {
                cell.classList.add("beginningOfBeat");
                if (!cell.classList.contains("armed")) {
                    cell.classList.add("notArmedBeginningOfBeat");
                }
            }
                    break;
                    
                    
                    
            }
            

        }
    }
}   

function changeTS(matrix){ 
    var table=[];
    var e;
    
    switch(matrix) {
        case 1:
            e = document.getElementById("tsks");
            table[matrix]=document.getElementById('drum-matrix');
            
        break;
        case 2:
            e = document.getElementById("tstoms");
            table[matrix]=document.getElementById('drum-matrix2');
        break;
        case 3:
            e = document.getElementById("tshats");
            table[matrix]=document.getElementById('drum-matrix3');
        break;
        default:
    }
    var datats = e[e.selectedIndex].value;
    
    switch(datats) {
        case "0":
            flag[matrix] = 0 ;
            beat[matrix] = 4;
            size[matrix] = beat[matrix]*4;
        break;
        case "1":
            flag[matrix] = 0 ;
            beat[matrix] = 5;
            size[matrix] = beat[matrix]*4;
        break;
        case "2":
            flag[matrix] = 0 ;
            beat[matrix] = 3;
            size[matrix] = beat[matrix]*4;
        break;
        case "3":
            flag[matrix] = 0 ;
            beat[matrix] = 7;
            size[matrix] = beat[matrix]*4;
        break;
        case "4":
            flag[matrix] = 1 ;
            beat[matrix] = 7;
            size[matrix] = beat[matrix]*2;
        break;
        case "5":
            flag[matrix] = 1 ;
            beat[matrix] = 6;
            size[matrix] = beat[matrix]*2;
        break;
        default:
    }
//    console.log(datats);
    setTime();
    generateTable(size[matrix],table[matrix],beat[matrix]);
    indexreset(0);
    polyreset();
}

function setInitialTempo(t) {
  tempo = t;
  setTime();
}

function setTime() {
    delay = 60000 / tempo / (size[1] / 4);
    drumsTs1 = Math.floor(delay);
    loopTs1 = drumsTs1 ;
    dur1 = loopTs1*size[1];
    
    switch ( flag[2] ) {
        case 0:
            delay2 = size[1]/size[2]*delay;
            drumsTs2 = Math.floor(delay2);
            loopTs2 = drumsTs2 ; 
            dur2 = loopTs2*size[2];
            break ;
        case 1 : 
            delay2 = delay;
            drumsTs2 = Math.floor(delay2);
            loopTs2 = drumsTs2 ; 
            dur2 = loopTs2*size[2];
        break ;
    }
    switch ( flag[3] ) {
        case 0:
            delay3 = size[1]/size[3]*delay;
            drumsTs3 = Math.floor(delay3);
            loopTs3 = drumsTs3 ; 
            dur3 = loopTs3*size[3];
        break ;
        case 1 : 
            delay3 = delay;
            drumsTs3 = Math.floor(delay3);
            loopTs3 = drumsTs3 ; 
            dur3 = loopTs3*size[3];
        break ;
    }
    polyrhthm_count();
    
}

function setTempo() {
  var newTempo = Number(document.getElementById("bpm").value);
  tempo = newTempo;
  setTime();

}

function armByClick(dis,row,cell) {
    switch (dis){
        case "drum-matrix":
            if (row === 0){ 
                cell.addEventListener("click", function(){ filteredkicks.arming(this.id,this); }); 
            }else{
                cell.addEventListener("click", function(){ filteredsnare.arming(this.id,this); });
            }
        break;
        case "drum-matrix2":
            if (row === 0){ 
                cell.addEventListener("click", function(){ tomone.arming(this.id,this); }); 
            }else{
                cell.addEventListener("click", function(){ tomtwo.arming(this.id,this); });
            }
        break;
        case "drum-matrix3":
            if (row === 0){ 
                cell.addEventListener("click", function(){ closedh.arming(this.id,this); }); 
            }else{
                cell.addEventListener("click", function(){ openh.arming(this.id,this); });
            }
        break;
        default:
    }  
}

Array.prototype.arming = function(index,cell) {
    var isArmed = cell.classList.contains("armed");
    if (!isArmed) {
        cell.classList.remove("notArmed", "notArmedBeginningOfBeat");
        cell.classList.add("armed");
        this[index] = 1;
    }else{
        cell.classList.remove("armed");
        if (cell.classList.contains("beginningOfBeat")) {
            cell.classList.add("notArmedBeginningOfBeat");
        }
        cell.classList.add("notArmed");
        this[index] = 0;
    }
}; 

window.onload = function() {
    setTime();
    setInitialTempo(Number(document.getElementById("bpm").value));
    document.getElementById("bpm").addEventListener("change", setTempo);
    
    changeTS(1);
    changeTS(2);
    changeTS(3);
    
    //document.getElementById("startButton").addEventListener("click", startStop);
    document.getElementById("resetButton").addEventListener("click", function(){ reset(1); });
    //document.getElementById("tsks").addEventListener("change", function(){ changeTS(1); });
     	

    $( "#tsks" ).on( "selectmenuchange", function( event, ui ) {changeTS(1)} );
    $( "#tstoms" ).on( "selectmenuchange", function( event, ui ) {changeTS(2)} );
    $( "#tshats" ).on( "selectmenuchange", function( event, ui ) {changeTS(3)} );


    document.getElementById("resetButton2").addEventListener("click", function(){ reset(2); });
    //document.getElementById("tstoms").addEventListener("change", function(){ changeTS(2); });
    
    
   
    document.getElementById("resetButton3").addEventListener("click", function(){ reset(3); });
    //document.getElementById("tshats").addEventListener("change", function(){ changeTS(3); });
    

};
