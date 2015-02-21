/**
 * Created by talwa_000 on 21/02/15.
 */
mainApp.controller('completeTheWord',['$scope','$location', function($scope, $location) {

}]);

mainApp.controller('firstLetterCTR',['$scope','$location', function($scope, $location) {
    $(function(){

        var imageList;
        $.get(location.origin+"/animalList", function( data ) {
            imageList = data.images.split(',');
        });

        var $write = $('#write'),
            shift = false,
            capslock = false;

        $('.keyboard li').click(function(event){

            if(event.target.className.split(" ")[0] === "space")
            {

                if($('.animaleImage img').length > 0)
                {
                    $('.animaleImage img').remove();

                    var newimage = $('<img />').attr({
                        src: "/images/animales/"+imageList[_getRandomImage()]
                    }).css({
                            width:448,
                            height:285
                        });

                    $('.animaleImage').append(newimage);


                }
            }
            else{
                var snd = new Audio("./voice/"+event.target.src.split('/')[5].split('.')[0]+".mp3");
                snd.play();
            }

            var $this = $(this),
                character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
            if($('.enlargedLatter img').length > 0)
            {
                $('.enlargedLatter img').remove();
            }
            if(event.target.src)
            {
                var arr = event.target.src.split("/");
            }
            var imageLocation =  "images/letters/"+arr[arr.length-1];
            var div = $('<img src="'+imageLocation+'" style="width:448px;height:285px">');
            $('.enlargedLatter').append(div);


            //compare image and letter
            var tempArr = $('.animaleImage img')[0].src.split('/');
            var imageName = tempArr[tempArr.length-1];
            var letterFromImage = imageName.split('_')[1].split('.')[0];
            var letter = imageLocation.split('/')[2].split('.')[0];
            if(letter === letterFromImage )
            {


                var snd = new Audio("./sounds/success.wav");
                snd.play();
                var score = parseInt($('.smallBox.scoreNumber h1').text());
                $('.smallBox.scoreNumber').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
                score += 1;
                $('.smallBox.scoreNumber').css( "color", "green");
                $('.smallBox.scoreNumber h1').text(score);
                setTimeout(function(){
                    $('.smallBox.scoreNumber').css( "color", "black");

                },4000)

                //clear enlarged letter
                if($('.enlargedLatter img').length > 0)
                {
                    $('.enlargedLatter img').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);

                }
            }
            else{
                var snd = new Audio("./sounds/wrong.wav");
                snd.play();

            }

            // Shift keys
            if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
                $('.letter').toggleClass('uppercase');
                $('.symbol span').toggle();

                shift = (shift === true) ? false : true;
                capslock = false;
                return false;
            }

            // Caps lock
            if ($this.hasClass('capslock')) {
                $('.letter').toggleClass('uppercase');
                capslock = true;
                return false;
            }

            // Delete
            if ($this.hasClass('delete')) {
                var html = $write.html();

                $write.html(html.substr(0, html.length - 1));
                return false;
            }

            // Special characters
            if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
            if ($this.hasClass('space')) character = ' ';
            if ($this.hasClass('tab')) character = "\t";
            if ($this.hasClass('return')) character = "\n";

            // Uppercase letter
            if ($this.hasClass('uppercase')) character = character.toUpperCase();

            // Remove shift once a key is clicked.
            if (shift === true) {
                $('.symbol span').toggle();
                if (capslock === false) $('.letter').toggleClass('uppercase');

                shift = false;
            }

            // Add the character
            $write.html($write.html() + character);
        });


        function _getRandomImage(){
            return Math.floor(Math.random()*imageList.length)+1;
        }

    });
}]);

