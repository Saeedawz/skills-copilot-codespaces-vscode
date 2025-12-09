class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.today = new Date();
        this.monthYearElement = document.getElementById('monthYear');
        this.calendarDaysElement = document.getElementById('calendarDays');
        
        this.initEventListeners();
        this.renderCalendar();
    }

    initEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.changeMonth(-1);
        });
        
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.changeMonth(1);
        });
    }

    changeMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.renderCalendar();
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update header
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.monthYearElement.textContent = `${monthNames[month]} ${year}`;
        
        // Clear previous days
        this.calendarDaysElement.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Add days from previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayElement = this.createDayElement(daysInPrevMonth - i, true);
            this.calendarDaysElement.appendChild(dayElement);
        }
        
        // Add days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = this.isToday(year, month, day);
            const dayElement = this.createDayElement(day, false, isToday);
            this.calendarDaysElement.appendChild(dayElement);
        }
        
        // Add days from next month
        const totalCells = this.calendarDaysElement.children.length;
        const remainingCells = 42 - totalCells; // 6 rows * 7 days
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = this.createDayElement(day, true);
            this.calendarDaysElement.appendChild(dayElement);
        }
    }

    createDayElement(day, isOtherMonth = false, isToday = false) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        
        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        }
        
        if (isToday) {
            dayElement.classList.add('current');
        }
        
        dayElement.textContent = day;
        return dayElement;
    }

    isToday(year, month, day) {
        return year === this.today.getFullYear() &&
               month === this.today.getMonth() &&
               day === this.today.getDate();
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});
