
//variables:
var numCorrect = 0;
var numFalse = 0;
var numUnanswered = 0;
var clockRunning = false;
var time = 120;
//function start screen
function buildEntrance() {
    console.log("inside buildEntrance")
    $("#main-view").empty();
    var btn = $("<button>");
    btn.addClass("start");
    btn.text("Start")
    $("#main-view").append(btn);
}
//function timer
function buildTimer() {
    console.log("inside buildTimer")
    var timerSetUp = $("<h2>Time Remaining: <span id='timer'></span></h2>");
    console.dir("timerSetUp: " + timerSetUp);
    $("#main-view").append(timerSetUp);
    $("#timer").text("00:00");  
    $("#main-view").append($("<br><br>"));
}

function startStopwatch() {
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
        if (time === 0) {
            buildStats();
        }
    }
}
function count() {
    time--;
    var converted = timeConverter(time);
    $("#timer").text(converted);
}

function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }


//function question screen
function buildQuestions() {
    console.log("inside buildQuestions")
    $("#main-view").empty();
    buildTimer();
    var questions = ["What was TNT first produced as?", "What does TNT look like?", 
                    "What molecular compound causes the explosive behavior?", "Where is TNT most commonly used as an explosive?", 
                    "When does TNT explode?", "What is the explosive substance of dynamite?", "What makes dynamite so dangerous?", 
                    "What is an advantage of dynamite?", "What molecular compound causes the explosive behavior of dynamite?"]
    
    for (var i = 0; i < questions.length; i++) {
        var question = $("<h2>");
        question.addClass("question");
        question.attr("id", "question" + (i));
        console.log(question.attr("id"));
        question.text(questions[i]);
        $("#main-view").append(question);
        $("#main-view").append($("<br><br>"));
        buildButtons(i);
    }
}

//function buttons
function buildButtons(i) {
    console.log("inside buildButtons");
    var answers = [["food supplement", "dye", "all-purpose cleaner", "explosive"],
    ["yellow solid", "white powder", "transparent oil", "smoke"],
    ["oxygen-oxygen bonds", "nitro groups", "nitrogen-nitrogen bonds", "heavy metal"],
    ["contact explosives", "medicine", "chemistry lab","controlled demolitions"],
    ["contact with water", "physical pressure", "detonator", "when melted"],
    ["TNT", "nitroglycerin", "TATP", "C-4"],
    ["strongest explosive of all", "liquid", "explodes spontaneously", "may not explode when necessary"],
    ["easy to handle", "easy to produce", "comparibly cheap", "smokeless detonation"],
    ["oxygen-oxygen bonds", "nitro groups", "nitrogen-nitrogen bonds", "heavy metal"]];

    console.log("answers[0][0]: " + answers[0][0]);
    var question = "#question"+i;
    console.log("question+i: " + question);
    $(question).append($("<br>"));

    for (var j = 0; j < 4; j++) {
        console.log("i, j: " + i, j)
        var label = $("<label>");
        label.addClass("answer-label");
        label.attr("for", "radio-" + j);
        console.log("answer[i][j]: " + answers[i][j]);
        label.text(answers[i][j]);
        var input = $("<input>");
        input.addClass("answer-choice");
        input.attr("type", "radio")
        input.attr("name", "radio-" + i);
        input.attr("id", "radio-" + j)
        $(question).append(input, label);
    }
}
//function wins and losses
function countCorrectAnswers() {

}
function countFalseAnsers() {

}
function countUnanswered() {

}

//function end screen
function buildStats() {
    $("#main-view").empty();
    var end = $("<h2>");
    end.text("All Done!");
    var correct = $("<h3>");
    correct.text("Correct Answers: " + numCorrect);
    var falseAns = $("<h3>");
    falseAns.text("Incorrect Answers: " + numFalse);
    var unanswered = $("<h3>");
    unanswered.text("Unanswered: " + numUnanswered);

}

$(document).ready(function() {
    console.log("inside ready")
    buildEntrance();

    $(document).on("click", ".start", buildQuestions);
    $(document).on("click", ".answer-choice", startStopwatch);
});
