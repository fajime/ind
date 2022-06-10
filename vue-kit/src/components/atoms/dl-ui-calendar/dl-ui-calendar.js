import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import { Calendar } from '@fullcalendar/core';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-calendar',
  components : {
    FullCalendar // make the <FullCalendar> tag available
  },
  emits : ['eventDidMount', 'dateSelect', 'dateClick', 'eventClick', 'eventsSet'],
  props : {
    /**
     * Events Source
     */
    eventSrc : {
      type    : Object,
      default : {},
      desc    : 'Events source provided by the parent component. <a href="https://fullcalendar.io/docs/event-source">Ver mas</a>'
    },
    /**
     * Calendar options.
     *  headerToolbar.left   : 'today',           // ids required
     *  headerToolbar.center : 'prev title next', // ids required
     */
    options : {
      type    : Object,
      default : () => {},
      desc    : 'Calendar Options. Complex configuration, depending plugins'
    },
    /**
     * Calendar locale.
     */
    locale : {
      type    : String,
      default : 'en',
      desc    : 'Calendar Locale. Extracted from <a href="https://fullcalendar.io/docs/localization">Localization</a> for better showcase integration.'
    }
  },
  calendar : null,
  watch    : {
    /**
     * Watch events
     * @param {*} value Events
     */
    eventSrc : {
      // eslint-disable-next-line require-jsdoc
      handler(value) {
        if (value && this.calendar) {
          this.calendar.removeAllEventSources();
          this.calendar.addEventSource(value);
        }
      },
      deep : true
    },
    /**
     * Watch locale to change in calendar Options
     * @param {*} loc Locale
     */
    locale(loc) {
      this.calendar.setOption('locale', loc);
    }
  },
  // eslint-disable-next-line require-jsdoc
  mounted() {
    if (this.$el.offsetParent) {
      this.initialize();
    }
  },
  // eslint-disable-next-line require-jsdoc
  updated() {
    if (!this.calendar && this.$el.offsetParent) {
      this.initialize();
    }
  },
  // eslint-disable-next-line require-jsdoc
  beforeUnmount() {
    if (this.calendar) {
      this.calendar.destroy();
      this.calendar = null;
    }
  },
  methods : {
    // eslint-disable-next-line require-jsdoc
    initialize() {

      const defaultConfig = {
        themeSystem : 'standard',
        titleFormat : { year : 'numeric', month : 'long', day : 'numeric' },
        views       : {
          dayGridMonth : { // name of view
            titleFormat : { year : 'numeric', month : 'long' }
            // other view-specific options here
          },
          timeGridWeek : {
            // titleFormat : { year : 'numeric', month : 'long', day : 'numeric' }
          },
          timeGridDay : {
            // titleFormat : { year : 'numeric', month : 'long', day : 'numeric' }
          },
          listWeek : {
            // titleFormat : { year : 'numeric', month : 'long', day : 'numeric' }
          }
        }
      };
      const headerToolbar = {
        left   : 'today', // ids required
        center : 'prev title next' // ids required
      };
      const config = { ...this.options, ...defaultConfig };// { ...this.options };
      const header = { ...config?.headerToolbar, ...headerToolbar };
      config.headerToolbar = header;
      config.themeSystem = config.themeSystem ? config.themeSystem : 'standard';
      config.select = this.handleDateSelect;
      config.dateClick = this.handleDateClick;
      config.eventClick = this.handleEventClick;
      config.eventsSet = this.handleEvents;
      config.eventDidMount = this.eventMounted;
      this.calendar = new Calendar(this.$refs.calContainer, config);
      this.calendar.render();
      if (this.eventSrc) {
        this.calendar.removeAllEventSources();
        this.calendar.addEventSource(this.eventSrc);
      }
    },
    /**
     * Customize event render
     * @param {*} info Paraphernalia calendar event renderization.
     *                 DOM element, calendar event, view,...
     */
    eventMounted(info) {
      // console.log(`eventMounted for event ${info.event.title}`);
      this.$emit('eventDidMount', info);
    },
    /**
     * Handle date Select
     * @param {*} info date selected
     */
    handleDateSelect(info) {
      this.$emit('dateSelect', info);
    },
    /**
     * Handle date click
     * @param {*} info date clicked
     */
    handleDateClick(info) {
      this.$emit('dateClick', info);
    },
    /**
     * Handle Event select
     * @param {*} info date selected
     */
    handleEventClick(info) {
      this.$emit('eventClick', info);
    },
    /**
     * Handle Events
     * @param {*} info calendar events
     */
    handleEvents(info) {
      this.$emit('eventsSet', info);
    }
  },
  // DEMO META DATA
  ...metadata
};
