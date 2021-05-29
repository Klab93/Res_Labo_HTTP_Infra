$(function() {
    function loadAddress() {
        $.getJSON("/api/address/", function( address ){
           let msg = "Nothing is here";
           if (address.length > 0){
              msg = address[0].street + ", " + address[0].areaCode + " " + address[0].city; 
           }
        $(".team-member h4").text(msg);
        });
    }
    loadAddress();
    setInterval(loadAddress, 2000);
});