// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(".display-3").css("text-align", "center");
$(".lead").css("text-align", "center");

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

function addColor(obj) {  
    var hour = $(obj).data("hour");
    var currHour = dayjs().format('h');
    var am_pm = $(obj).data("am-pm") 
// curr = 1pm hour = 2pm
    if (hour == currHour) {
        $(obj).addClass("present");
    } else if (hour < currHour && am_pm == 0){
        $(obj).addClass("past");
    } else if (hour > currHour && am_pm == 0) {
        $(obj).addClass("past");
    } else {
        $(obj).addClass("future");
    }
}

$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    $('.time-block').each(function(i, obj) {
        deleteColor(obj);
        addColor(obj);
    });


    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
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
});

//   1st 2nd 3rd 4th 5th 6th 7th 8th 9th 10th 11th 12th 20th 21st 22nd 23rd 24th