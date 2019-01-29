var starthit, filtlen ,stoplearnks ;
var kicks = [];
var snares = [];
var filteredsnare =[];
var filteredkicks =[];
var indexk = 0 ;
var indexs = 0 ;
var drumsTs1;
var loopTs1  ; 
var stoploop1 = 0 ; 
var loop1index = 0 ; 

var tomone = [];
var tomtwo = [];
var tempo2 ; 
var drumsTs2 ;
var loopTs2 , stoploop2 ;
var stoplearningtoms = 0 ; 
var tomsindex = 100 ;
var loopindex2 = 0 ;

var gatehats = 0 ;
var drumsTs3 = 200 ;
var haton, closedon, openon, loopindex3, stoploop3;
var loopTs3 = 200;
var stoplearninghat = 0; 
var hatsindex;
var closedh = [];
var openh = [];

var ohat = new Audio('sounds/openhat.wav');
var chat = new Audio('sounds/closedhat.wav');
var tom1 = new Audio('sounds/tom1.wav');
var tom2 = new Audio('sounds/tom2.wav');
var kicksound = new Audio('sounds/kick.wav');
var snaresound = new Audio('sounds/snare.wav');
var clicksound = new Audio('sounds/click.wav');
clicksound.volume = 0.3 ; 

var polycycle;
var polyindex;

function openkick(){ gatekick = 1; }
function closekick(){ gatekick = 0; }
function opensnare(){ gatesnare = 1; }
function closesnare(){ gatesnare = 0 ; }

function learnks() {
    gateks = 1;
    gatesnare = 1;
    stoplearnks = 0;
    setTimeout(learnkick,1000);
    setTimeout(learnsnare,1000);  
};

function stopks() {
    stoplearnks = 1 ;
    gatesnare = 0;
    gatekick = 0;
}

function openks(){ gateks = 1; }

function closeks(){ gateks = 0; }

function learnkick() {

    dur(clicksound);
    if ( (indexk % 4) == 0 ) { clicksound.play(); };
    var onset = onkick;
    dur(kicksound);
    if ( onset ) { 
        closeks();
        setTimeout(openks,(drumsTs1-100));
        kicksound.play(); }
    
    indexk += 1 ;  
    
    if(stoplearnks) {closeks() ;
                    return;}
    else {  setTimeout(learnkick,drumsTs1);  }
    
};

function learnsnare() {
    var onsets = onsnare;
    dur(snaresound);
    if ( onsets ) {   
        snaresound.play(); 
        closeks();
        setTimeout(openks,(drumsTs1/2)); }

     if(stoplearnks) { 
         closeks();
         return; }
    else { setTimeout(learnsnare,drumsTs1); } 
};

function kick() {
    reset(1) ;
    kicks = [];
    snares = [];
    gateks = 1;
    gatesnare = 1;
    stoploop = 1 ;
    indexk = 0;
    indexs = 0;
    setTimeout(kickhit,1000);
    setTimeout(snarehit,1000);  
};

function dur(audio) { 
    audio.pause();
    audio.currentTime = 0 ; 
}

function kickhit() {
    
    if (indexk > 0) {removeHighlight(1); };
    dur(clicksound);
    if ( (indexk % (size[1]/4)) == 0 ) { clicksound.play(); };
    highlightActive( indexk , 1 );
    
    var onset = onkick;
    dur(kicksound);
    if ( onset ) { 
        closeks();
        setTimeout(openks,(drumsTs1*3/4));
        kicksound.play();
        kicks.push(1);

        var activek = document.getElementsByClassName(indexk);
        activek[0].classList.remove("notArmed", "notArmedBeginningOfBeat");
        activek[0].classList.add("armed");
    }
 
    else { kicks.push(0); };
    
    if ( indexk == (size[1]-1) ) { 
        setTimeout(closeks,drumsTs1/2);
        removeHighlight(1);
        indexk = 0;
        setTimeout(loopuno,drumsTs1/2);
        return ;
    }
    else { setTimeout(kickhit,drumsTs1); 
           indexk += 1 ; } ;
};

function snarehit() {
    var onsets = onsnare;
    dur(snaresound);
    if ( onsets ) {   
        snaresound.play(); 
        closeks();
        setTimeout(openks,(drumsTs1*3/4));
        snares.push(1);
        
        var actives = document.getElementsByClassName(indexs);

        actives[1].classList.remove("notArmed", "notArmedBeginningOfBeat");
        actives[1].classList.add("armed");}
    else { snares.push(0); } 

    if ( indexs == (size[1]-1) ) { 
        indexs = 0;
        setTimeout(closeks,drumsTs1/2);
        filteredkicks = kicks;
        filteredsnare = snares; 
        return ;
    }
    else 
    { setTimeout(snarehit,drumsTs1); 
     indexs += 1 ; } ;
};
                                // LOOPER 1
function loopuno(){

    filtlen = filteredkicks.length;
    stoploop1 = 0;
    loop1index = 0 ;
    setTimeout(readloop,500);
}   

function readloop() {
    
    if ( stoploop1 ){ 
        removeHighlight(1);
        loop1index = 0 ;
        return ;
    } 
         
    if ( loop1index == size[1] ) { 
        removeHighlight(1);
        loop1index = 0 ; 
    }
    if (loop1index > 0) {
        removeHighlight(1); 
        //console.log("sono qui",loop1index);
    };
    
    highlightActive(loop1index,1);
    
    dur(snaresound) ;
    dur(kicksound) ;
    
    switch (filteredkicks[loop1index]) {
        case 1:
            kicksound.play();
            break;
        case 0:
            break;
        };
    switch (filteredsnare[loop1index]) {     
        case 0:
        break;
        case 1:
            snaresound.play();
        break;
        }
    
    loop1index += 1; 
    
    setTimeout(readloop,loopTs1); 
}; 

function loopunostop() { stoploop1 = 1 ; }

function learnduo() {
    gatetoms = 1;
    setTimeout(learntoms,1000);
}

function opentoms(){ gatetoms = 1; }

function learntoms() { 
    switch ( tomon ) {
        case 2 : 
            tom2.play();
            break ;
        case 1 : 
             tom1.play();
             break ;
        case 0 : 
            dur(tom1);
            dur(tom2);
            break ;
    }
    if (stoplearningtoms) {
        gatetoms = 0;
        return;}
    setTimeout(learntoms,drumsTs2);
}

function stoptoms() { stoplearningtoms = 1 ; }
                     
function toms()  {  
    reset(2);
    stoploop2 = 1 ; 
    gatetoms = 1;
    tomone = [];
    tomtwo = [];
    tomsindex=100;
    setTimeout(tomshit,500);
}

function tomshit() {
        
    if (tomsindex > 100) {removeHighlight( 2 ); };
    dur(clicksound);
    if ( (tomsindex % (size[2]/beat[2])) == 0 ) { clicksound.play(); };
    highlightActive( tomsindex-100 , 2);
    
    switch (tomon) {
        case 2 : 
            dur(tom2);
            tom2.play();
            tomtwo.push(1);
            tomone.push(0);
            var activetom = document.getElementsByClassName(tomsindex);
            activetom[1].classList.remove("notArmed", "notArmedBeginningOfBeat");
            activetom[1].classList.add("armed");
        break ;
        case 1 : 
            dur(tom1);
            tom1.play();
            tomone.push(1);
            tomtwo.push(0);
            var activetom = document.getElementsByClassName(tomsindex);
            activetom[0].classList.remove("notArmed", "notArmedBeginningOfBeat");
            activetom[0].classList.add("armed");
        break ;
        case 0 : 
            tomone.push(0);
            tomtwo.push(0);
        break ; }
    
    if (tomsindex == 100+size[2]-1) {
        gatetoms = 0;
        removeHighlight(2);
        tomsindex = 100 ;
        setTimeout(loopdue,drumsTs2);
        return; }
    
    else { tomsindex +=1 ;
           setTimeout(tomshit,drumsTs2); }
}

function loopdue() {
   // tomone = tomone.concat(tomone);
   //tomtwo = tomtwo.concat(tomtwo);
    stoploop2 = 0;
    indexreset(2);
    polyreset();
    
    
    setTimeout(readloopdue,500);
}

function readloopdue() {
    if (polyindex===polycycle+1){
        polyindex=1;
    }
    if (flag[2]===1){
        document.getElementById("polyinfo2").innerHTML = polyindex + " / " + polycycle;
    }else{
        document.getElementById("polyinfo2").innerHTML = "";
    }
    
    if ( stoploop2 ) { 
        removeHighlight(2);
        loopindex2 = 0;
        return ; 
    } 
    if ( loopindex2 == size[2]) { 
        removeHighlight(2);
        loopindex2 = 0 ;
        if (polyindex>0){ 
            polyindex++;
        }
    };
    if (loopindex2 > 0) { 
        removeHighlight(2); 
    };
    
    highlightActive(loopindex2,2);
    
    switch (tomone[loopindex2]) {       
        case 0:
            break;
        case 1:
            dur(tom1) ;
            tom1.play();
            break;
        }
    switch (tomtwo[loopindex2]) {     
        case 0:
            break;
        case 1:
            dur(tom2) ;
            tom2.play();
            break;
        }
    loopindex2 += 1; 

    setTimeout(readloopdue,loopTs2);
}

function loopduostop() { stoploop2 = 1; }

function openhats(){ gatehats = 1; }

function learntre() {
    openhats();
    stoplearninghat = 0;
    setTimeout(learnhats,1000);
}

function learnhats() { 
    dur(chat);
    dur(ohat);
    
    switch ( haton ){
        case 1 : 
            chat.play();
            break;
        case 2 : 
            ohat.play();
            break;
        case 0 :
            break ; 
    }

    if (stoplearninghat) {
        gatehats = 0;
        console.log('no');
        return;}
    else {setTimeout(learnhats,drumsTs3);}
    
}

function stoplearnhats() { stoplearninghat = 1 ; }

function hats()  {  
    reset(3);
    stoploop3 = 1 ; 
    gatehats = 1;
    closedh = [];
    openh = [];
    hatsindex=200;
    setTimeout(hatshit,500);
}

function hatshit() {
        
    if (hatsindex > 200) {removeHighlight( 3 ); }
    dur(clicksound);
    if ( (hatsindex % (size[3]/beat[3])) == 0 ) { clicksound.play(); };
    highlightActive( hatsindex-200 , 3 );

    switch ( haton ){
        case 1 : 
             dur(chat);
            chat.play();
            closedh.push(1);
            openh.push(0);
            var activetom = document.getElementsByClassName(hatsindex);
            activetom[0].classList.remove("notArmed", "notArmedBeginningOfBeat");
            activetom[0].classList.add("armed");
            break;
        case 2 : 
            dur(ohat);
            ohat.play();
            openh.push(1);
            closedh.push(0);
            var activetom = document.getElementsByClassName(hatsindex);
            activetom[1].classList.remove("notArmed", "notArmedBeginningOfBeat");
            activetom[1].classList.add("armed");
            break;
        case 0 :
            closedh.push(0);
            openh.push(0);
            break ; 
    }

    if (hatsindex == 200+size[3]-1) {
        gatetoms = 0;
        removeHighlight(3);
        hatsindex = 200 ;
        setTimeout(looptre,drumsTs3);
        return; }
    
    else { hatsindex +=1 ;
           setTimeout(hatshit,drumsTs3); }
}

function looptre() {
    
    stoploop3 = 0;
    loopindex3 = 0; 
    setTimeout(readlooptre,500);
}

function readlooptre() {
    if ( stoploop3 ) { 
        removeHighlight(3);
        loopindex3 = 0;
        return ; 
    } 
    if ( loopindex3 == size[3]) { 
        removeHighlight(3);
        loopindex3 = 0 ;
    };
    if (loopindex3 > 0) { 
        removeHighlight(3); 
    };
        highlightActive(loopindex3,3);
    
    switch (closedh[loopindex3]) {       
        case 0:
            break;
        case 1:
            dur(chat) ;
            chat.play();
            break;
        }
    switch (openh[loopindex3]) {     
        case 0:
            break;
        case 1:
            dur(ohat) ;
            ohat.play();
            break;
        }
    loopindex3 += 1; 

    setTimeout(readlooptre,loopTs3);
}

function looptrestop() { stoploop3 = 1; }


function startmainloop() {
    stoploop1 = 0;
    stoploop2 = 0;
    stoploop3 = 0;
    indexreset(0);
    loopuno();
    loopdue();
    looptre();
//    setTimeout(readloop,500);
//    setTimeout(readloopdue,490);
//    setTimeout(readlooptre,480);
    
}

function stopmainloop() {
    stoploop1 = 1;
    stoploop2 = 1;
    stoploop3 = 1;
}

function indexreset(value){
    switch(value){
        case 0:
            loop1index = 0;
            loopindex2 = 0;
            loopindex3 = 0;
        break;
        case 1:
            loop1index = 0;
        break;
        case 2:
            loopindex2 = 0;
        break;
        case 3:
            loopindex3 = 0;
        break;
    }    
}

function lcm( First_number,  Second_number) {
    var x,max,min,lcm;
    if(First_number>Second_number){
        max=First_number;
        min=Second_number;
    }
    else
    {
        max=Second_number;
        min=First_number;
    }
    for(var i = 1; i <= min; i++){
        x = max * i; 
        if(x%min==0) {
            lcm = x; 
            break; 
        }
    }
    return lcm;
}

function polyreset(){
    if (flag[2]===1){
        polycycle=lcm(size[1],size[2]);
        polycycle=polycycle/size[2];
        polyindex=1;
    }else{
        polyindex=0;
    }
}

var syn2,syn3;
var count2,count3;

function polyrhthm_count(){
    
    
    if(Math.abs(dur1-dur2)>200){
        syn2 = lcm(dur1,dur2);
        count2 = syn2/dur2; }
    else { count2 = 1 ;}
    
    if(Math.abs(dur1-dur3)>200){
        syn3 = lcm(dur1,dur3);
        count3 = syn3/dur3; }
    else { count3 = 1 ;}
    
    
    document.getElementById("turn2").innerHTML = count2;  
    document.getElementById("turn3").innerHTML = count3; 
    return;
    
}

