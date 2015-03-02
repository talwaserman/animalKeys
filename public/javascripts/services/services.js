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

angular.module('mainApp').factory('score',['$state' ,function($state){

    var myscore=0;

    return {
        addPoints: function(){
            myscore++;
            /*var score = parseInt($('.smallBox.scoreNumber h1').text());
            $('.smallBox.scoreNumber').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
            score += 1;
            $('.smallBox.scoreNumber').css( "color", "green");
            $('.smallBox.scoreNumber h1').text(score);
            setTimeout(function(){
                $('.smallBox.scoreNumber').css( "color", "black");

            },4000)*/
        }

    };
}]);

angular.module('mainApp').service('auth',['$http','API_URL','authToken','$state', function auth($http,API_URL,authToken,$state){
    function authSuccessful(res){
        authToken.setToken(res.token);
        $state.go('home');
    };
    this.login = function(email,password){
        return $http.post(API_URL + '/loginUser', {name: email, password: password})
            .success(authSuccessful);
    };
    this.register = function(email,password){
        return $http.post(API_URL + '/registerUser', {name: email, password: password})
            .success(authSuccessful);

    };
}]);