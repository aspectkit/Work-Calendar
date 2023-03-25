
// this function removes the tense classes so they can be reassigned in the addColor function
function deleteColor(obj){
    if ($(obj).hasClass("past")){
        $(obj).removeClass("past");
    }

    if ($(obj).hasClass("present")){
        $(obj).removeClass("present");
    }

    if ($(obj).hasClass("future")){
        $(obj).removeClass("future");
    }
}

// this function compares the current time to the time block time to see if its in the past, present, or future and sets the color accordingly
function addColor(obj) {  
    // am = 0 pm = 1
    var loopHour = $(obj).data("hour");
    var currHour = dayjs().format('H');
    var am_pm = $(obj).data("am-pm") 
    
    if (am_pm == 1){
        loopHour = loopHour + 12;
    }

    if (loopHour < currHour) {
        $(obj).addClass("past");
    } else if (loopHour == currHour){
        $(obj).addClass("present");
    } else {
        $(obj).addClass("future");
    }

}
// this function saves the text in each time block to local storage
function saveText(){
    $(".saveBtn").click(function (e) { 
        e.preventDefault();
        var parentDiv = $(this).parent()

        var loopHour = parentDiv.data("hour")

        var textToSave = parentDiv.children(".description").val();

        localStorage.setItem(loopHour, textToSave);
        
    });
}

// this function gets the hour data of the time block and uses it as the key to store the text data in local storage
function getText(obj){
    var loopHour = $(obj).data("hour")
    var textToGet = localStorage.getItem(loopHour);
    $(obj).children(".description").val(textToGet);
}

// adds the current date to the top of the page
function setTime(){
    var currDate = $("#currentDay");
    var numDay = dayjs().format('D');
    var ending = "";
    switch(numDay % 10){
        case 1:
            ending = "st";
            break;
        case 2:
            ending = "nd";
            break;
        case 3:
            ending = "rd";
            break;
        default:
            ending = "th";

    }
    currDate.text(dayjs().format('dddd[,] MMMM D') + ending);
}

$(function () {
    // centers the header and subheader text as well as the current date
    $(".display-3").css("text-align", "center");
    $(".lead").css("text-align", "center");

    // calls the saveText function to store the text of the time block to local storage
    saveText();
    
    // calls the functions to add the tense color according to the current time for each time block
    $('.time-block').each(function(i, obj) {
        deleteColor(obj);
        addColor(obj);
    });


    // calls the getText function for every time block in the calendar
    $('.time-block').each(function(i, obj){
        getText(obj);
    });

    // calls the setTime function to put the current date at the top of the page
    setTime();
});



