$(document).ready(function(){
    //set a waypoint for all the page parts on the page
    var ppWaypoint = $('.hideme').waypoint(function(direction) {
        //check the direction
        if(direction == 'down') {
            $(this.element).removeClass('fadeout');
            $(this.element).addClass('fadein');
        } else {
            $(this.element).removeClass('fadein');
            $(this.element).addClass('fadeout');
        }
    }, {offset: '90%'});
});