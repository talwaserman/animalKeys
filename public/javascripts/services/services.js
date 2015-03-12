/**
 * Created by Tal Waserman on 21/02/15.
 */
angular.module('mainApp').factory('sounds',['$state' ,function($state){

    var success_snd = new Audio("./sounds/success.wav"),
        wrong_snd = new Audio("./sounds/wrong.wav"),
        swipe_snd = new Audio("./sounds/swipe.mp3"),
        letter_snd =
            {
               Alef:  new Audio('./voice/Alef.mp3'),
               Ayin:  new Audio('./voice/Ayin.mp3'),
               Bet:  new Audio('./voice/Bet.mp3'),
               Chet:  new Audio('./voice/Chet.mp3'),
               Dalet:  new Audio('./voice/Dalet.mp3'),
               Gimel:  new Audio('./voice/Gimel.mp3'),
               Hey:  new Audio('./voice/Hey.mp3'),
               Kaf:  new Audio('./voice/Kaf.mp3'),
               Kaf1:  new Audio('./voice/Kaf1.mp3'),
               Kuf:  new Audio('./voice/Kuf.mp3'),
               Lamed:  new Audio('./voice/Lamed.mp3'),
               Mem:  new Audio('./voice/Mem.mp3'),
               Mem1:  new Audio('./voice/Mem1.mp3'),
               Nun:  new Audio('./voice/Nun.mp3'),
               Nun1:  new Audio('./voice/Nun1.mp3'),
               Pe:  new Audio('./voice/pe.mp3'),
               Pe1:  new Audio('./voice/pe1.mp3'),
               Reish:  new Audio('./voice/Reish.mp3'),
               Samech:  new Audio('./voice/Samech.mp3'),
               Shin:  new Audio('./voice/Shin.mp3'),
               Taf:  new Audio('./voice/Taf.mp3'),
               Tet:  new Audio('./voice/Tet.mp3'),
               Vav:  new Audio('./voice/Vav.mp3'),
               Yud:  new Audio('./voice/Yud.mp3'),
               Zadik:  new Audio('./voice/Zadik.mp3'),
               Zadik1:  new Audio('./voice/Zadik1.mp3'),
               Zain:  new Audio('./voice/Zain.mp3')

            };

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
        letter: function(letter){
            letter_snd[letter].play();
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
        },
        fadeInOutLetter: function(){
            document.getElementsByClassName('enlargedLatter ')[0].style.background  = "green";
            setTimeout(function(){
                document.getElementsByClassName('enlargedLatter ')[0].style.background  = "transparent";
            },500)
            setTimeout(function(){
                document.getElementsByClassName('enlargedLatter ')[0].style.background  = "green";
            },1000)
            setTimeout(function(){
                document.getElementsByClassName('enlargedLatter ')[0].style.background  = "transparent";
            },1500)
            setTimeout(function(){
                document.getElementsByClassName('enlargedLatter ')[0].style.background  = "";
            },2000)
        }



    }

}]);