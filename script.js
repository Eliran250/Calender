let currentMonth = new Date().getMonth(); // החודש הנוכחי 0-11
let currentYear = new Date().getFullYear(); // השנה הנוכחית
let currentDay = new Date(); // היום

let events = JSON.parse(localStorage.getItem('events')) || {}; // לוקאל סטוראג' לאירועים

const generateCalendar = (month, year) => {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();


    const calendarBody = document.getElementById('calendar');
    calendarBody.innerHTML = ''; // מחיקת התוכן הקודם של הלוח שנה


    let row = document.createElement('tr');
    let day = 1;


    // הוספת ימים ריקים בשורה הראשונה אם היום הראשון לא מתחיל ביום ראשון
    for (let i = 0; i < firstDay; i++) {
        let cell = document.createElement('td');
        row.appendChild(cell);
    }


    // יצירת שורות נוספות עד סיום כל הימים
    while (day <= daysInMonth) 
    {
        if (row.children.length === 7) 
        {
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }
        let cell = document.createElement('td');
        cell.innerHTML = day; 


        // יצירת תאריך עבור היום הספציפי
        const date = new Date(year, month, day);


        // בדיקה אם היום הוא היום הנוכחי
        if (date.toDateString() === currentDay.toDateString())
        { 
            cell.className = 'today'; 
        }


        // אם יש אירוע ביום זה, מוסיף את שם האירוע
        if (events[date]) {
            cell.className = 'events';
            const eventText = document.createElement('div');
            eventText.innerHTML = events[date]; 
            eventText.className = 'event-text'; 
            cell.appendChild(eventText); 
        }


        // הוספת אירוע ושמירתו בלוקאלסטוראג'
        cell.onclick = () => {
            if (events[date])
            {
                alert("Event is already exists");
                return; 
            }
            const eventTitle = prompt("add event");
            if (eventTitle)
            {
                events[date] = eventTitle; // שומר את האירוע בלוקאסטוראג'
                localStorage.setItem('events', JSON.stringify(events)); // שומר את כל האירועים
                alert("The event added");
                cell.className = 'events'; 


                // הוספת האירוע
                const eventText = document.createElement('div');
                eventText.innerHTML = eventTitle; 
                eventText.className = 'event-text'; 
                cell.appendChild(eventText);  
            }
        };
        row.appendChild(cell);
        day++;
    }


    // הוספת השורה האחרונה אם לא נוספו שורות
    if (row.children.length > 0) {
        calendarBody.appendChild(row);
    }
}

const changeMonth = (direction, e) => {
    e.preventDefault();
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11; 
        currentYear--;
    } else if (currentMonth > 11) { 
        currentMonth = 0; 
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
    document.querySelector('h1').innerHTML = "Year: " + currentYear;
    document.querySelector('h2').innerHTML = "Month: " + (currentMonth + 1); 
};

generateCalendar(currentMonth, currentYear); 

document.querySelector('h1').innerHTML = "Year: " + currentYear; 
document.querySelector('h2').innerHTML = "Month: " + (currentMonth + 1); 
