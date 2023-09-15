import { Component } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  userInput: string = '';

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    editable: true,
    selectable: true,
    weekends: true,
  };

  ngOnInit() {
    this.events = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('event-')) {
        const userInput = localStorage.getItem(key);
        if (userInput) {
          const dateStr = key.substring('event-'.length);
          const event = {
            title: userInput,
            start: dateStr
          };

          this.events.push(event);
          
        }
      }
    }
  }

  events: EventInput[] = [];
  

  handleDateClick(arg: any) {
    const userInput = window.prompt('Add an event:');
    if (userInput !== null) {
      const key = 'event-' + arg.dateStr;
      localStorage.setItem(key, userInput);
      const newEvent = {
        title: userInput,
        start: arg.dateStr
      };

      this.events = [...this.events, newEvent];
      console.log(this.events)
    }
  }

  handleEventClick(clickedEvent: any) {
    const confirmDelete = confirm('Are you sure you want to delete this event?');

    if (confirmDelete) {
      clickedEvent.event.remove();

      this.calendarOptions.events = this.events.filter(event => event.id !== clickedEvent.event.id);

      const keyToDelete = 'event-' + clickedEvent.event.id;
      console.log(this.events)
      localStorage.removeItem(keyToDelete);  
    }
  }
}