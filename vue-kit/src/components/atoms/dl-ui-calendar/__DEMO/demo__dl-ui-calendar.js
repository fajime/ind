
import theComponent from '../';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';
import eventSrc from './events';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import enLocale from '@fullcalendar/core/locales/en-gb';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-calendar',
  components : {
    theComponent,
    DlCompKitDemoTemplate
  },
  mixins : [mixinPlayground],

  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        props : [
          {
            label : 'options',
            type  : 'hidden',
            value : {
              plugins       : [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
              firstDay      : 1,
              locales       : [ esLocale, enLocale ],
              locale        : null,
              initialDate   : new Date(),
              initialView   : 'dayGridMonth',
              weekends      : true,
              eventColor    : '#378006',
              headerToolbar : {
                /* left   : 'today', // ids required
                   center : 'prev title next', // ids required
                    right  : 'dayGridWeek dayGridMonth timeGridWeek timeGridDay listWeek list' */
                right : 'dayGridMonth timeGridWeek timeGridDay listWeek'
              },
              editable     : true,
              selectable   : true,
              selectMirror : true,
              dayMaxEvents : true,
              nowIndicator : true
            }
          },
          {
            label : 'eventSrc',
            type  : 'hidden',
            value : eventSrc
          },
          {
            label   : 'locale',
            type    : 'select',
            value   : 'es',
            options : [
              { name : 'es', value : 'es' },
              { name : 'en', value : 'en-GB' }
            ]
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : '',
          options : [
            { name : 'Default', value : '' },
            { name : 'Custom', value : 'custom-calendar' }
          ]
        }
      },
      component : theComponent
    };
  }

};
