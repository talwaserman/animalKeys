/**
 * Created by tal Waserman on 21/02/15.
 */
mainApp.controller('completeTheWordCTR',['$scope','$http','sounds','util', function($scope, $http, sounds, util) {

    var imageIndex = 0, wordEntered = [];

    $scope.keyPressed = function(letter){

        var imageList = util.getImageList(),
            allWords =  util.getAllWords();

        switch(letter) {
            case "space":
                sounds.swipe();
                if($('.animaleImage img').length > 0)
                {
                    $('.animaleImage img').remove();

                    var newimage = $('<img />').attr({
                        src: "/images/animales/"+imageList[util.getRandomNumber()]
                    }).css({width:448,height:285 });

                    $('.animaleImage').append(newimage);

                    if($('.completeWord img').length > 0)
                    {
                        $('.completeWord img').remove();
                    }
                }
                imageIndex++;
                wordEntered = [];
                _cleanContainer();
            break;

            case "backSpace":
                if($('.completeWord img').length > 0)
                {
                    $('.completeWord img')[$('.completeWord img').length-1].remove();
                    wordEntered.pop();
                }
                if($('.completeWord img').length === 0){
                    _cleanContainer();
                }
                else
                {
                    //Get image name;
                    var image = $('.animaleImage img')[0].src.split('/');
                    image = image[image.length-1];

                    tempObject = {
                        "image": image,
                        "letters": wordEntered
                    };

                    if(_checkWord(tempObject))
                    {
                        sounds.success();
                        $('.completeWord').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
                        var score = parseInt($('.smallBox.scoreNumber h1').text());
                        $('.smallBox.scoreNumber').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
                        score += 1;
                        $('.smallBox.scoreNumber').css( "color", "green");
                        $('.smallBox.scoreNumber h1').text(score);
                        setTimeout(function(){
                            $('.smallBox.scoreNumber').css( "color", "black");

                        },4000)
                    }
                }

            break;

            default:
                //Letter pressed
                $('.completeWord').addClass('completeWordContainer');
                sounds.letter("./voice/"+letter.split('.')[0]+".mp3");

                var tempObject;

                //Update word on screen
                var imageLocation =  "images/letters/"+letter;
                var div = $('<img src="'+imageLocation+'" style="float:right;width:60px;height:60px">');
                $('.completeWord').append(div);

                wordEntered.push(letter);

                //Get image name;
                var image = $('.animaleImage img')[0].src.split('/');
                image = image[image.length-1];

                tempObject = {
                    "image": image,
                    "letters": wordEntered
                };

                if(_checkWord(tempObject))
                {
                    sounds.success();
                    $('.completeWord').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
                    var score = parseInt($('.smallBox.scoreNumber h1').text());
                    $('.smallBox.scoreNumber').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
                    score += 1;
                    $('.smallBox.scoreNumber').css( "color", "green");
                    $('.smallBox.scoreNumber h1').text(score);
                    setTimeout(function(){
                        $('.smallBox.scoreNumber').css( "color", "black");

                    },4000)
                }
        }//switch

        function _checkWord(array) {
            var bool;
            for (var i = 0;i<allWords.length  ;i++) {
                if(allWords[i].image === array.image)
                {
                    bool = true;
                    $('.completeWord').addClass('green');
                    $('.completeWord').removeClass('red');
                    for(var j = 0;j<array.letters.length ;j++)
                    {
                        if(allWords[i].letters[j] !== array.letters[j])
                        {
                            bool = false;
                            $('.completeWord').addClass('red');
                            $('.completeWord').removeClass('green');
                        }
                    }
                    if(bool && array.letters.length === allWords[i].letters.length)
                        return bool;
                    else
                        bool = false;
                }
            }
            return false;
        }
        function _cleanContainer(){
            $('.completeWord').removeClass('completeWordContainer');
            $('.completeWord').removeClass('green');
            $('.completeWord').removeClass('red');
        }
    } //keyPress
}]);
mainApp.controller('knowTheLettersCTR',['$scope','sounds', function($scope, sounds) {
    $scope.keyPressed = function(letter){
        var imageLocation, div;
        if(letter !== 'space' && letter !== 'backSpace')
        {
            if(document.getElementsByClassName('enlargedLatter')[0].getElementsByTagName("img").length > 0)
            {
                document.getElementsByClassName('enlargedLatter')[0].getElementsByTagName("img")[0].remove();
            }
            imageLocation =  "images/letters/"+letter;
            div = document.createElement("img");
            div.src = imageLocation;
            div.style.width = "448px" ;
            div.style.height = "285px" ;

            document.getElementsByClassName('enlargedLatter')[0].appendChild(div);
            /*sounds.letter("./voice/"+letter.split('.')[0]+".mp3");*/
        }
    }//keyPressed()
}]);
mainApp.controller('firstLetterCTR',['$scope', 'sounds','util', function($scope, sounds, util) {
    $scope.val = 0;

    $scope.keyPressed = function(letter){

        var imageList = util.getImageList();

        if(letter === 'space')
        {
            if($('.animaleImage img').length > 0)
            {
                $('.animaleImage img').remove();
                var newimage = $('<img />').attr({
                    src: "/images/animales/"+imageList[util.getRandomNumber()]
                }).css({
                        width:448,
                        height:285
                    });
                $('.animaleImage').append(newimage);
                sounds.swipe();
            }
        }
        else if(letter !== 'backSpace'){
            sounds.letter("./voice/"+letter.split('.')[0]+".mp3");

            if($('.enlargedLatter img').length > 0)
                $('.enlargedLatter img').remove();

            var imageLocation =  "images/letters/"+letter;
            var div = $('<img src="'+imageLocation+'" style="width:448px;height:285px">');
            $('.enlargedLatter').append(div);

            if(_compareIMageAndLetter())
            {
                sounds.success();
                $scope.val = parseInt($scope.val) +1;
                $('.smallBox.scoreNumber').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
                $('.smallBox.scoreNumber').css( "color", "green");

                setTimeout(function(){
                    $('.smallBox.scoreNumber').css( "color", "black");

                },4000)
                //clear enlarged letter
                if($('.enlargedLatter img').length > 0)
                {
                    $('.enlargedLatter img').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
                }
            }
            else {
                sounds.wrong();
            }//else
        }//else

        function _compareIMageAndLetter(){
            var tempArr = $('.animaleImage img')[0].src.split('/'),
                imageName = tempArr[tempArr.length-1],
                letterFromImage = imageName.split('_')[1].split('.')[0],
                letter = imageLocation.split('/')[2].split('.')[0];
            return (letter === letterFromImage )
        }
    }//keyPressed()

}]);


