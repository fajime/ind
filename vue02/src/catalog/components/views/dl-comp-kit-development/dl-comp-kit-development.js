/**
 *IMPORTA AQUI TU COMPONENTE
 */
import { DlUiTree } from '@/components/index.js';
import DlUiCalendar from '@/components/atoms/dl-ui-calendar';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import enLocale from '@fullcalendar/core/locales/en-gb';

export default {
  name       : 'dl-comp-kit-development',
  components : {
    /** INSERTA AQUÍ TU COMPONENTE */

    'dl-ui-calendar' : DlUiCalendar,
    DlUiTree
  },
  /**
    * override
    * @override
    */
  data() {
    return {
      // mapping locales calendar app
      mapLang : {
        'es-ES' : 'es',
        'en-GB' : 'en-gb'
      },
      calEvents :

        // your event source
        {
          events : [
            {
              title      : 'Event 1',
              date       : '2022-04-01',
              classNames : 'todoeldia'
            },
            {
              title      : 'Event 2',
              date       : '2022-04-02',
              classNames : 'todoeldia'
            },
            {
              title : 'Event 3',
              start : '2022-04-01 19:00:30',
              end   : '2022-04-01 19:40:30'
            },
            {
              title : 'Event 4',
              start : '2022-04-19T14:10:10+00:00',
              end   : '2022-04-19T14:13:30+00:00'
            },
            {
              title      : 'Event 5 AD',
              start      : '2022-04-19',
              classNames : 'todoeldia'
            }
          ],
          color     : 'black',
          textColor : 'yellow'
        },
      calLocale  : null,
      calOptions : {
        plugins       : [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        firstDay      : 1,
        locales       : [ esLocale, enLocale ],
        locale        : null,
        initialDate   : new Date(),
        initialView   : 'dayGridMonth',
        weekends      : true,
        eventColor    : '#378006',
        headerToolbar : {
          right : 'dayGridMonth timeGridWeek timeGridDay listWeek'
        },
        editable     : true,
        selectable   : true,
        selectMirror : true,
        dayMaxEvents : true,
        nowIndicator : true
      },
      menu1 : [
        {
          label  : 'Carpeta 1',
          icon   : 'dl-ids-icon-folder-outlined',
          opened : true,
          fn     : () => {
            // eslint-disable-next-line no-console
            console.log('Trace "Fichero 1"');
          },
          children : [
            {
              label : 'Fichero 1 - 1',
              icon  : 'dl-ids-icon-document-default-outlined',
              fn    : () => {
              // eslint-disable-next-line no-console
                console.log('Trace "Fichero 1 - 1"');
              }
            },
            {
              label : 'Fichero 1 - 2',
              icon  : 'dl-ids-icon-document-default-outlined',
              fn    : () => {
              // eslint-disable-next-line no-console
                console.log('Trace "Fichero 1 - 2"');
              }
            }
          ]
        },
        {
          label    : 'Carpeta 2',
          icon     : 'dl-ids-icon-folder-outlined',
          children : [
            {
              label : 'Fichero 2 - 1',
              icon  : 'dl-ids-icon-document-default-outlined',
              fn    : () => {
              // eslint-disable-next-line no-console
                console.log('Trace "Fichero 2 - 1"');
              }
            },
            {
              label : 'Fichero 2 - 2',
              icon  : 'dl-ids-icon-document-default-outlined',
              fn    : () => {
              // eslint-disable-next-line no-console
                console.log('Trace "Fichero 2 - 2"');
              }
            },
            {
              label : 'Fichero 2 - 3',
              icon  : 'dl-ids-icon-document-default-outlined',
              fn    : () => {
              // eslint-disable-next-line no-console
                console.log('Trace "Fichero 2 - 3"');
              }
            }
          ]
        },
        {
          label : 'Fichero 1',
          icon  : 'dl-ids-icon-document-default-outlined',
          fn    : () => {
          // eslint-disable-next-line no-console
            console.log('Trace "Fichero 1"');
          }
        },
        {
          label    : 'Carpeta 3',
          icon     : 'dl-ids-icon-folder-outlined',
          children : [
            {
              label : 'Fichero 3 - 1',
              icon  : 'dl-ids-icon-document-default-outlined',
              fn    : () => {
              // eslint-disable-next-line no-console
                console.log('Trace "Fichero 3 - 1"');
              }
            },
            {
              label    : 'Carpeta 4',
              icon     : 'dl-ids-icon-folder-outlined',
              children : [
                {
                  label : 'Fichero 4 - 1',
                  icon  : 'dl-ids-icon-document-default-outlined',
                  fn    : () => {
                  // eslint-disable-next-line no-console
                    console.log('Trace "Fichero 4 - 1"');
                  }
                },
                {
                  label : 'Fichero 4 - 2',
                  icon  : 'dl-ids-icon-document-default-outlined',
                  fn    : () => {
                  // eslint-disable-next-line no-console
                    console.log('Trace "Fichero 4 - 2"');
                  }
                },
                {
                  label : 'Fichero 4 - 3',
                  icon  : 'dl-ids-icon-document-default-outlined',
                  fn    : () => {
                  // eslint-disable-next-line no-console
                    console.log('Trace "Fichero 4 - 3"');
                  }
                }
              ]
            },
            {
              label : 'Fichero 3 - 2',
              icon  : 'dl-ids-icon-document-default-outlined',
              fn    : () => {
              // eslint-disable-next-line no-console
                console.log('Trace "Fichero 3 - 2"');
              }
            },
            {
              label : 'Fichero 3 - 3',
              icon  : 'dl-ids-icon-document-default-outlined',
              fn    : () => {
              // eslint-disable-next-line no-console
                console.log('Trace "Fichero 3 - 3"');
              }
            }
          ]
        }
      ]
    };
  },
  computed : {
    // eslint-disable-next-line require-jsdoc
    appLanguage() {
      return this.$store.getters.getAppLang;
    }
  },
  watch : {
    // eslint-disable-next-line require-jsdoc
    appLanguage(newLang) {
      this.calLocale = this.mapLang[newLang];
    }
  },
  // eslint-disable-next-line require-jsdoc
  beforeMount() {
    this.calOptions.locale = this.mapLang[this.appLanguage];
    this.calLocale = this.mapLang[this.appLanguage];
  },
  methods : {
    /**
     * Calendar Dates selection
     * @param {*} calEvnt Evento del calendario
     */
    handleDateSelect(calEvnt) {
      // eslint-disable-next-line no-console
      console.log('handleDateSelect', calEvnt);
      const cal = calEvnt.view.calendar;
      const eventsDay = cal.getEvents().filter(cevnt => cevnt.start.toDateString() === calEvnt.start.toDateString());

      calEvnt.title = `Evento Manual ${eventsDay.length}`;
      calEvnt.backgroundColor = 'red';
      calEvnt.borderColor = 'darkred';
      calEvnt.textColor = 'white';

      this.calEvents.events.push(calEvnt);
    },
    /**
     * Calendar Date selection. siempre detras del dateSelect, `por lo que quiza es innecesario
     * @param {*} calEvnt Evento del calendario
     */
    handleDateClick(calEvnt) {
      // eslint-disable-next-line no-console
      console.log('handleDateClick', calEvnt);
    },
    /**
     * Evento de calendario seleccionado.
     * @param {Object} calEvnt calendar Event
     */
    handleEventClick(calEvnt) {
      // eslint-disable-next-line no-console
      console.log('handleEventClick', calEvnt);
    },
    /**
     * Calendar emit on buttons
     * @param {Array} calEvnts Eventos del calendario
     */
    handleEvents(calEvnts) {
      // eslint-disable-next-line no-console
      console.log('handleEvents', calEvnts);
    },
    // eslint-disable-next-line require-jsdoc
    handleEventMounted(info) {
      // eslint-disable-next-line no-console
      console.log(`handleEventMounted for event ${info.event.title}`);
    }
  }
};

