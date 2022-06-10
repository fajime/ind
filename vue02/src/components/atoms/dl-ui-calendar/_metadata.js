// DEMO META DATA
export default {
  titleName            : 'Calendar',
  nameJS               : 'DlUiCalendar',
  type                 : 'atom',
  nameScssDefaultClass : 'dl-ui-calendar',
  nameScssMixin        : 'calendar-style-config',
  nameScssMixinFile    : 'calendar',
  description          : `<p>Es un wrapper sobre <a href="https://fullcalendar.io/">Full Calendar</a></p>
  <p>El componente Calendar, permite a los usuarios mostrar (<a href="https://fullcalendar.io/docs/event-model">eventos</a>) en el día y hora correspondiente </p>
  `,
  events : [
    {
      name      : 'eventDidMount',
      condition : 'Event Render Hook. Called right after the element has been added to the DOM.',
      payload   : 'Event, el, view, <a href="https://fullcalendar.io/docs/event-render-hooks">Ver más</a>'
    },
    {
      name      : 'dateSelect',
      condition : 'Triggered when a date/time selection is made.',
      payload   : 'start, end, allDay, jsEvent, view, resource, <a href="https://fullcalendar.io/docs/select-callback">Ver más</a>'
    },
    {
      name      : 'dateClick',
      condition : 'Triggered when the user clicks on a date or a time.',
      payload   : 'dateClickInfo. ver <a href="https://fullcalendar.io/docs/dateClick">Ver más</a>'
    },
    {
      name      : 'eventClick',
      condition : 'Triggered when the user clicks an event.',
      payload   : 'clickInfo. event, el, jsEvent, view. <a href="https://fullcalendar.io/docs/eventClick">Ver más</a>'
    },
    {
      name      : 'eventsSet',
      condition : 'Called after event data is initialized OR changed in any way.',
      payload   : 'events. ver <a href="https://fullcalendar.io/docs/eventsSet">Ver más</a>'
    }
  ],
  scss : [
    {
      name    : 'button::color',
      default : '$color-action-primary-contrast',
      desc    : 'Color texto botones'
    },
    {
      name    : 'button::background-color',
      default : '$color-action-primary-default',
      desc    : 'Color fondo botones'
    },
    {
      name    : 'button::background-color::hover',
      default : '$color-action-primary-hover',
      desc    : 'Color fondo botones hover'
    },
    {
      name    : 'button::background-color::active',
      default : '$color-action-primary-active',
      desc    : 'Color fondo botone activo'
    },
    {
      name    : 'now-indicator-color',
      default : 'red',
      desc    : 'Color señal hora actual en las vistas pertinentes'
    }
  ],
  notes : `
  La libreria Full Calendar es muy completa. Aqui proporcionamos una configuración basica, tanto de plugins (vistas) como de opciones o eventos/hooks.
  De igual forma, los estilos se ha intentado acercar al los temas de Digital Lab, y para ello tb ha sido necesario fijar cierta configuracion, como:
  <div class="dl-comp-kit-demo-use__code">
    <pre>
      <code class="javascript">
        headerToolbar.left   : 'today',
        headerToolbar.center : 'prev title next'
      </code>
    </pre>
  </div>

  La localizacion tb es a demanda del proyecto.

  <div class="dl-comp-kit-demo-use__subtitle">Ejemplo de configuración</div>
  <div class="dl-comp-kit-demo-use__code">
      <pre>
          <code class="javascript">
          import dayGridPlugin from '@fullcalendar/daygrid';
          import timeGridPlugin from '@fullcalendar/timegrid';
          import listPlugin from '@fullcalendar/list';
          import interactionPlugin from '@fullcalendar/interaction';
          import enLocale from '@fullcalendar/core/locales/en-gb';
          ...

          eventSrc :
          // your events source
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
          ...
          options : {
            plugins       : [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
            firstDay      : 1,
            locales       : [ enLocale ],
            locale        : 'en-gb',
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
          ...
          </code>
      </pre>
  </div>
  `
};

