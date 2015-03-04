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
        }


    }

}]);