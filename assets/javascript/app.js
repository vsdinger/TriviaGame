// array of questions
// array of correct answers
// array of all answers
$(document).ready(function () {
    var options = [
        {
            question: "1977 Best Album Cover, was won by?",
            choice: ["Led Zeplin", "Soul Train", "Beatles", "Peter Frampton"],
            answer: 3,
            photo: "assets/images/Peter_Frampton.jpg"
        },

        {
            question: "What would you win if you are competing on Best Original Song?",
            choice: ["Noble Prize", "Pulitzer", "Academy Award", "C.V. Raman"],
            answer: 2,
            photo: "assets/images/academy_awards.jpg"
        },

        {
            question: "1980 Billboard # 8, Single song hit?",
            choice: ["Starting Over by John Lennon", "Out of Touch By Hall & Oats", "Mickey by Toni Basil", "Crazy Little Thing Call Love by Queen"],
            answer: 3,
            photo: "assets/images/220px-Crazy_little_thing_called_love.jpg"
        },

        {
            question: "Best Female Guitarist?",
            choice: ["Sister Tharpe", "Kristin Hersh", "Liona Boyd", "Bonnie Raitt"],
            answer: 0,
            photo: "assets/images/Sister_Tharpe.jpeg"
        },

        {
            question: "1975 Best Female Singer of All Time?",
            choice: ["Joan Jett", "Francesca Caccini", "Whitney Houston", "Suzi Quartra"],
            answer: 3,
            photo: "assets/images/Whitney_Houston.jpg"
        },

        {
            question: "Alanis Morissette First Album?",
            choice: ["The Cross Road", "Dance Pop", "Too Hot", "Macarena"],
            answer: 2,
            photo: "assets/images/to_hot_by_Morissette.jpg"
        }];
    

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];


    $("#reset").hide();
    //click start function start game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer function
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown function
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if 0
        if (timer === 0) {
        unanswerCount++;
        stop();
        $("#correctAnswer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        hidepicture();
        }	
    }
    
    //function stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //function randomly pick question & Display?
    function displayQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];

    //		displayQuestion();
    //		console.log(pick.question);
            $("#musicQuestion").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#correctAnswer").append(userChoice);
    }
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
        //correct guess or wrong guess what now
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#correctAnswer").html("<p>Correct!</p>");
            hidepicture();
        } 
        else {
            stop();
            wrongCount++;
            userGuess="";
            $("#correctAnswer").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }

    function hidepicture () {
        $("#correctAnswer").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#correctAnswer").empty();
            timer= 20;
    
        //questions answered need to post
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#musicQuestion").empty();
		    $("#musicQuestion").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#correctAnswer").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#correctAnswer").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#correctAnswer").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } 
        else {
            runTimer();
            displayQuestion();
        }
        }, 3000);
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#correctAnswer").empty();
        $("#musicQuestion").empty();
        
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
})