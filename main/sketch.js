
var microBit;
microBit = new uBit();

microBit.onConnect(function() {
  console.log("connected");

  document.getElementById("connected").innerHTML="true";
  document.getElementById("properties").classList.toggle('inactive');

  } );

microBit.onDisconnect(function(){
  console.log("disconnected");
  document.getElementById("connected").innerHTML="false";
});

function searchDevice() { microBit.searchDevice(); }

                        //**                            // FUNCTIONS AFTER CONNECTION   **// 
var ax, ay, az, value,  pitch, roll;
var filteredax = 0;
var filtereday = 0;
var filteredaz = 0;
var gateks = 0 ;
var gatesnare = 0 ;
var gatetoms = 0 ;
var onkick = 0;
var onsnare = 0;
var tomon = 0 ;

var Ts = 50;


microBit.onBleNotify( function(){

    var weight=0.5;
    ax = ((microBit.getAccelerometer().x ) / 1024);
    filteredax = ( ( 1-weight ) * filteredax + weight*ax ).toFixed(2);
    ay = ((microBit.getAccelerometer().y ) / 1024);
    filtereday = ( ( 1-weight ) * filtereday + weight*ay ).toFixed(2);
    az = ((microBit.getAccelerometer().z ) / 1024);
    filteredaz = (( ( 1-weight ) * filteredaz + weight*az )).toFixed(2);

})

function data(){
    setTimeout(read,10);
};

var treshk = 1 ;            // accel beat treshold set !!
var treshs = 1.04 ;


function read(){
    
    pitch = ((Math.atan2( -filtereday,-filteredaz ) ) * 180 / 3.14).toFixed(2);
    roll  = ((Math.atan2(filteredax, Math.sqrt( ( filtereday*filtereday ) + (filteredaz*filteredaz)))) * 180 / 3.14 ).toFixed(2) ; 
    document.getElementById("roll").innerHTML=roll;
    document.getElementById("pitch").innerHTML=pitch;  
//    document.getElementById("acc_X").innerHTML=filteredax;
//    document.getElementById("acc_Y").innerHTML=filtereday;
//    document.getElementById("acc_Z").innerHTML=filteredaz;
    tempo = Number(document.getElementById("bpm").value);
    
    switch ( gateks ) {
        case 1 :     
            if ( filteredaz > treshk )  
            { onkick = 1;  
             onsnare = 0 ;  
            }
            else if ( filteredax > treshs )  
            { onsnare = 1; 
             onkick = 0;
            }
            else { onsnare = 0; 
                 onkick = 0;  }
            break ;
        case 0 :  
            onkick = 0;
            onsnare = 0 ; 
            break ;
    }
    
    switch ( gatetoms ) {
        case 1 : 
             if (roll < -30){ tomon = 1; }
             else if (roll > 30) { tomon = 2; }
             else { tomon = 0 ; }
             break ;
        case 0 : 
            tomon = 0; 
            break ;
    }
    switch ( gatehats ) {
        case 1 : 
            if (filteredaz > 0.8 ) { 
                switch (true) {
                    case pitch<0 :
                         haton = 1;
                         //console.log('closed');
                     break;
                    case pitch >0 :
                         //console.log('open');
                         haton = 2 ;
                    break;
                }  
            } 
            else { haton = 0 }
             break ;
        case 0 : 
            { haton = 0 ; }
            break ;
    }
    
    setTimeout(read,Ts);
};
