import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventMountArg, ViewApi } from '@fullcalendar/core';
import { ViewContainer } from '@fullcalendar/core/internal';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [RouterOutlet, FullCalendarModule, CommonModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent {
  constructor(@Inject(DOCUMENT) private document: Document) { }
  title = 'calendar';
  initialDate: string = '2024-05-10';
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    direction: 'ltr',
    dateClick: this.onDateClick.bind(this),
    headerToolbar: {
      start: 'prev',
      center: 'title',
      end: 'next'
    },
    initialDate: this.initialDate,
    viewDidMount: this.didMount.bind(this)
  };
  ngOnInit(): void {
    console.log('this.calendarOptions.initialDate: ', this.calendarOptions.initialDate);
    }






  onDateClick(arg: DateClickArg) {
    console.log('arg.dateStr: ', arg.dateStr);

    const prevClickedDate = this.document.querySelector('.active');
    if (prevClickedDate) {
      prevClickedDate.classList.remove('active');
      prevClickedDate.removeAttribute('style')
    }
    const parentDiv = arg.dayEl.querySelector('.fc-daygrid-day-frame.fc-scrollgrid-sync-inner');
    if (parentDiv) {
      parentDiv.classList.add('active');
      parentDiv.setAttribute('style', 'background-color: yellow;')
    }
  }

  didMount(info: any) {
    const initialDate = this.calendarOptions.initialDate;

    info.view.calendar.setOption('dayCellClassNames', (args: { date: Date, dayEl: HTMLElement }) => {
      const cellDate = args.date.toISOString().split('T')[0];
      if (cellDate === initialDate) {
        // Add the 'active' class to the day cell
        return ['active'];
      }
      return [];
    });
  }
}
