//variables:
var numCorrect = 0;
var numFalse = 0;
var numUnanswered = 0;
var concreteSuggestions = [];
var clockRunning = false;
var time = 90;
//function start screen
function buildEntrance() {
    $("#main-view").empty();
    var btn = $("<button>");
    btn.addClass("start");
    btn.text("Start")
    $("#main-view").append(btn);
}
//function timer
function buildTimer() {
    var timerSetUp = $("<h2>Time Remaining: <span id='timer'></span></h2>");
    $("#main-view").append(timerSetUp);
    $("#timer").text("00:00");  
    $("#main-view").append($("<br><br>"));
}

function startStopwatch() {
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }
    buildQuestions();
}
function count() {
    time--;
    if (time === 0) {
        addStats();
    }
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
        question.text(questions[i]);
        $("#main-view").append(question);
        $("#main-view").append($("<br><br>"));
        buildButtons(i);
    }
}

//function buttons
function buildButtons(i) {
    //console.log("inside buildButtons");
    var answers = [["food supplement", "dye", "all-purpose cleaner", "explosive"],
    ["yellow solid", "white powder", "transparent oil", "smoke"],
    ["oxygen-oxygen bonds", "nitro groups", "nitrogen-nitrogen bonds", "heavy metal"],
    ["contact explosives", "medicine", "chemistry lab","controlled demolitions"],
    ["contact with water", "physical pressure", "detonator", "when melted"],
    ["TNT", "nitroglycerin", "TATP", "C-4"],
    ["strongest explosivions", "contains liquid", "explodes spontaneously", "may not explode when necessary"],
    ["smokeless detonation", "easy to produce", "comparibly cheap", "easy to handle"],
    ["oxygen-oxygen bonds", "nitro groups", "nitrogen-nitrogen bonds", "heavy metal"]];

    var question = "#question"+i;
    $(question).append($("<br>"));

    for (var j = 0; j < 4; j++) {
        var label = $("<label>");
        label.addClass("answer-label");
        label.attr("for", "radio-" + j);
        label.text(answers[i][j]);
        var input = $("<input>");
        input.addClass("answer-choice");
        input.attr("type", "radio");
        input.attr("name", "radio-" + i);
        input.attr("id", "radio-" + i+j);
        input.attr('value', answers[i][j]);
        $(question).append(input, label);
    }
}
//function wins and losses
function addStats() {
    var correctAnswers = ["dye", "yellow solid", "nitro groups", "controlled demolitions", "detonator", 
                            "nitroglycerin", "explodes spontaneously", "smokeless detonation", "nitro groups"];
    var chosen = [];
    chosen[0] = $("input[name=radio-0]:checked").val();
    chosen[1] = $("input[name=radio-1]:checked").val();
    chosen[2] = $("input[name=radio-2]:checked").val();
    chosen[3] = $("input[name=radio-3]:checked").val();
    chosen[4] = $("input[name=radio-4]:checked").val();
    chosen[5] = $("input[name=radio-5]:checked").val();
    chosen[6] = $("input[name=radio-6]:checked").val();
    chosen[7] = $("input[name=radio-7]:checked").val();
    chosen[8] = $("input[name=radio-8]:checked").val();

    var allSuggestions = ["The history of TNT", "The apperance of TNT", "The molecular compound of TNT", "The application of TNT", "The explosive character of TNT",
                        "The explosive substance in dynamite", "The dangers of dynamite", "The reason why dynamite is still used", "The molecular compound of dynamite", ];
    concreteSuggestions = [];
    for (var i = 0; i < chosen.length; i ++)
        if (chosen[i] === undefined) {
            numUnanswered++;
            concreteSuggestions.push(allSuggestions[i]);
        } else if (chosen[i] !== correctAnswers[i]) {
            numFalse++;
            concreteSuggestions.push(allSuggestions[i]);
        } else {
            numCorrect++;
        }
    
    buildStats();
}

//function end screen
function buildStats() {
    $("#main-view").empty();
    var end = $("<h2 id='end'>");
    end.text("All Done!");
    var correct = $("<h3 id='correct'>");
    correct.text("Correct Answers: " + numCorrect);
    var falseAns = $("<h3 id='false'>");
    falseAns.text("Incorrect Answers: " + numFalse);
    var unanswered = $("<h3 id='unanswered'>");
    unanswered.text("Unanswered: " + numUnanswered);
    $("#main-view").append(end, $("<br>"), correct, $("<br>"), falseAns, $("<br>"), unanswered, $("<br>"), $("<br>"), $("<br>"));
    if (concreteSuggestions.length > 0) {
        var suggestions = $("<h2 id='suggestions'>");
        suggestions.text("Go to the modules and check out the sections about: ");
        suggestions.attr("id", "suggestions-title");
        var list = $("<ul>");
        for (var i=0; i < concreteSuggestions.length; i++) {
            var listElement = $("<li>");
            listElement.text(concreteSuggestions[i]);
            list.addClass("suggestions");
            list.append(listElement);
        }
        $("#main-view").append(suggestions, $("<br>"), list);
    } else {
        var congratulations = $("<h2>");
        congratulations.text("You know the material well. Great work!");
        $("#main-view").append(congratulations);
    }
};

$(document).ready(function() {
    buildEntrance();
    $(document).on("click", ".start", startStopwatch);
});
