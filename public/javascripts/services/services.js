/**
 * Created by Tal Waserman on 21/02/15.
 */
angular.module('mainApp').factory('sounds',['$state' ,function($state){

    var success_snd = new Audio("./sounds/success.wav"),
        wrong_snd = new Audio("./sounds/wrong.wav"),
        swipe_snd = new Audio("./sounds/swipe.mp3"),
        letter_snd;

    return {
        success: function(){
            success_snd.play();
        },
        wrong: function(){
            wrong_snd.play();
        },
        swipe: function(){
            swipe_snd.play();
        },
        letter: function(letter_voice_file){
            letter_snd = new Audio(letter_voice_file);
            letter_snd.play();
        }
    };
}]);


angular.module('mainApp').factory('util',['$http', function util($http){
    var allWords, imageList;

    $http.get('javascripts/controllers/words.json').success(function(data) {
        allWords = data;
    });

    $http.get(location.origin+"/animalList").success(function(data) {
        imageList = data.images.split(',');
    });

    return {
        getAllWords: function(){
            return allWords;
        },
        getImageList: function(){
            return imageList;
        },
        getRandomNumber: function(){
            return Math.floor(Math.random()*imageList.length)+1;
        },
        changeImage: function(){
            var newimage;
            if(document.getElementsByClassName('animaleImage')[0].getElementsByTagName("img").length > 0)
            {
                document.getElementsByClassName('animaleImage')[0].getElementsByTagName("img")[0].remove();

                newimage = document.createElement("img");
                newimage.src = "/images/animales/"+imageList[this.getRandomNumber()];
                newimage.style.width = "448px" ;
                newimage.style.height = "285px" ;
                document.getElementsByClassName('animaleImage')[0].appendChild(newimage);
            }
        },
        fadeInOut: function(){
            document.getElementsByClassName('scoreNumber')[0].style.color = "green";
            setTimeout(function(){
                document.getElementsByClassName('scoreNumber')[0].style.color = "black";
            },500)
            setTimeout(function(){
                document.getElementsByClassName('scoreNumber')[0].style.color = "green";
            },1000)
            setTimeout(function(){
                document.getElementsByClassName('scoreNumber')[0].style.color = "black";
            },1500)
        },
        fadeInOutCompleteWord: function(){
            debugger;
            document.getElementsByClassName('completeWord ')[0].style.background  = "green";
            setTimeout(function(){
                document.getElementsByClassName('completeWord ')[0].style.background  = "white";
            },500)
            setTimeout(function(){
                document.getElementsByClassName('completeWord ')[0].style.background  = "green";
            },1000)
            setTimeout(function(){
                document.getElementsByClassName('completeWord ')[0].style.background  = "white";
            },1500)
            setTimeout(function(){
                document.getElementsByClassName('completeWord ')[0].style.background  = "";
            },2000)
        }



    }

}]);