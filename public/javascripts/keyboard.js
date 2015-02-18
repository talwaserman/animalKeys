$(function(){
    var $write = $('#write'),
        shift = false,
        capslock = false;

    $('.keyboard li').click(function(event){
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
            var score = parseInt($('.smallBox.scoreNumber h1').text());
            score += 10;
            $('.smallBox.scoreNumber h1').text(score);

            //clear enlarged letter
            if($('.enlargedLatter img').length > 0)
            {
                $('.enlargedLatter img').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500);
                $('.enlargedLatter img').animate({
                opacity: 0
            }, 1000, function() {
              $('.enlargedLatter img').remove();
            });

            }

            

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




});
function handleCharsClick(){

    this.value = $('.charsButton').text()
    $('.textArea').text('');

    $('.special').addClass('specialChar')
    $('.suffix').addClass('suffixChar')
    $('.regular').addClass('yellowBG')



}

function handleIconsClick() {

    this.value = $('.iconsButton').text();
    $('.textArea').text('');

    $('.special').removeClass('specialChar')
    $('.suffix').removeClass('suffixChar')
    $('.regular').removeClass('yellowBG')

}