/**
 * Created by talwa_000 on 21/02/15.
 */
mainApp.controller('completeTheWordCTR',['$scope','$location','$http', function($scope, $location, $http) {
    $(function(){

        var imageIndex = 0;
        $scope.wordsArr = [], wordEntered = [];
        var imageList;
        $.get(location.origin+"/animalList", function( data ) {
            imageList = data.images.split(',');
        });

        /*var allWords;
        $http.get('javascripts/controllers/words.json').success(function(data) {
            allWords = data;
            //build the initial words;
            var i;
            for(i=0;i<allWords[0].letters.length;i++)
            {
                var div = $('<div class="completeLetter"></div>');
                $('.completeWord').append(div);
            }
        });*/

        $('.keyboard li').on('tap',(function(event){

            if(event.target.className.split(" ")[0] === "space")
            {
                if($('.animaleImage img').length > 0)
                {
                    $('.animaleImage img').remove();

                    var newimage = $('<img />').attr({
                        src: "/images/animales/"+imageList[imageIndex]
                    }).css({width:448,height:285 });

                    $('.animaleImage').append(newimage);

                    if($('.completeWord img').length > 0)
                    {
                        $('.completeWord img').remove();
                    }
                }

                imageIndex++;
                wordEntered = [];


            }
            else if(event.target.className.split(" ")[0] === "backSpace"){
                if($('.completeWord img').length > 0)
                {
                    $('.completeWord img')[$('.completeWord img').length-1].remove();
                    wordEntered.pop();
                }

            }
            else if(event.target.className.split(" ")[0] === "enter"){
                $scope.wordsArr.push(
                    {
                        "image": imageList[imageIndex-1],
                        "letters": wordEntered
                    });
                wordEntered = [];
            }
            else{

                var length = event.target.src.split("/").length;
                var letter = event.target.src.split("/")[length-1];

                var imageLocation =  "images/letters/"+letter;
                var div = $('<img src="'+imageLocation+'" style="float:right;width:60px;height:60px">');
                $('.completeWord').append(div);
                wordEntered.push(letter);
            }
        }));


        function _getRandomImage(){
            return Math.floor(Math.random()*imageList.length)+1;
        }
    });
}]);

mainApp.controller('knowTheLettersCTR',['$scope','$location', function($scope, $location) {
    $(function(){

        $('.keyboard li').on('tap',(function(event){

            if(event.target.className !== "space")
            {
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

                var snd = new Audio("./voice/"+event.target.src.split('/')[5].split('.')[0]+".mp3");
                snd.play();
            }

        }));

    });
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

        $('.keyboard li').on('tap',(function(event){

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

                    var snd = new Audio("./sounds/swipe.mp3");
                    snd.play();

                }
            }
            else{
                var snd = new Audio("./voice/"+event.target.src.split('/')[5].split('.')[0]+".mp3");
                snd.play();
            }

            if(event.target.className !== "space")
            {
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

            }

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

            else if(event.target.className !== "space"){
                var snd = new Audio("./sounds/wrong.wav");
                snd.play();

            }


        }));


        function _getRandomImage(){
            return Math.floor(Math.random()*imageList.length)+1;
        }

    });
}]);


