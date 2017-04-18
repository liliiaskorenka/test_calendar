function validateCreateCalendar(id, year, month){
    if(!document.getElementById(id)){
        console.log('There is no element with id "' + id + '"');
        return false;
    }
    if(!Number.isInteger(year) || !Number.isInteger(month)){
        console.log('Month and year must be numeric');
        return false;
    }
    if(year > 9999 || year < 1){
        console.log('Year must be 1-9999');
        return false;
    }
    if(month > 12 || month < 1){
        console.log('Month must be 1-12');
        return false;
    }
    return true;
}

function createCalendar(id, year, month){
    //validate input
    if(!validateCreateCalendar(id, year, month)){
        console.log('Invalid params for createCalendar');
        return false;
    }

    var destination = document.getElementById(id);

    //clear destination
    destination.innerHTML = '';

    var tbl = document.createElement('table');
    var tbdy = document.createElement('tbody');

    //generate header with days of week 
    var tr = document.createElement('tr');
    var weekdays = moment.weekdaysShort();
    for (var i = 0; i < weekdays.length ; i++){
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(weekdays[i]));
        tr.appendChild(td)
    }
    tbdy.appendChild(tr);
    
    //generate days
    var firstDayShift = moment([year, (month-1), 1]).day();
    var tr = document.createElement('tr');
    if(firstDayShift != 1){
        for (var i = 0; i < firstDayShift ; i++){
            //empty element just to fill the table
            var td = document.createElement('td');
            tr.appendChild(td)
        }
    }
    var lastDayOfMonth = moment([year, (month-1), 1]).endOf('month').date();
    for (var i = 1; i <= lastDayOfMonth; i++){
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(i));
        td.calendarDay = i;
        td.calendarMonth = month;
        td.calendarYear = year;
        td.onclick = function(e){
            var text_dialog = 'Selected date is '+
                moment([this.calendarYear, (this.calendarMonth-1), this.calendarDay]).format("dddd, MMMM Do YYYY");
            $("<div>" + text_dialog + "</div>").dialog();
        }
        tr.appendChild(td);
        if(tr.childElementCount == 7){
            tbdy.appendChild(tr);
            tr = document.createElement('tr');
        }
    }
    if(tr.childElementCount != 0){
        tbdy.appendChild(tr);
    }
    
    tbl.appendChild(tbdy);
    destination.appendChild(tbl)
}

createCalendar('foo', 2017, 4);