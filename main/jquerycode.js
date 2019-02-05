$(function() {
    $( ".timesig" ).selectmenu({
        width: 100
    });
    
    
    $(".startstop").button();
    
    $( "#slider" ).slider({
        min: 30,
        max: 200,
        step: 1,
        value: 80
    });
    
    $( "input[type='radio']" ).checkboxradio();
    
    
    $(".learnbutton").button();
    
    $("#learn").click(function() {
        $( this ).toggleClass( "ui-state-active" );
        $( this ).empty();
        var selection = $('input[name=radio-1]:checked').val();
        
        if ($( this ).hasClass( "ui-state-active" )) {
            $( "input[name=radio-1]" ).checkboxradio( "disable" );
            $( this ).text(" ");
            $( this ).append( "<span class='ui-icon ui-icon-stop'></span>");
            $( this ).append(" Stop learning");
            switch (selection){
            case "1":
                learnks();
                break;
            case "2":
                learnduo();
                break;
            case "3":
                learntre();
                break;                
            }
        }else{
            $( "input[name=radio-1]" ).checkboxradio( "enable" );
            $( this ).text(" ");
            $( this ).append( "<span class='ui-icon ui-icon-play'></span>");
            $( this ).append(" Start learning");
            switch (selection){
            case "1":
                stopks();
                break;
            case "2":
                stoptoms();
                break;
            case "3":
                stoplearnhats();
                break;                
            }   
        }
    });
    
    $( "#dialog1" ).dialog({ autoOpen: false });
    $( "#dialog2" ).dialog({ autoOpen: false });
    $( "#dialog3" ).dialog({ autoOpen: false });
    
    $( "#opener" ).click(function() {
        var selection = $('input[name=radio-1]:checked').val();
        switch (selection){
            case "1":
                $( "#dialog1" ).dialog( "open" );
                break;
            case "2":
                $( "#dialog2" ).dialog( "open" );
                break;
            case "3":
                $( "#dialog3" ).dialog( "open" );
                break;                
        }
    });
    
    
});