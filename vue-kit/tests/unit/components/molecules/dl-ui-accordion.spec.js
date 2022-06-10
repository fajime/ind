import { mount } from '@vue/test-utils';
import randomIdMixin from '../../../../src/mixins/randomId';

import DlUiAccordion from '../../../../src/components/molecules/dl-ui-accordion';
import { nextTick } from 'vue';

describe('dl-ui-accordion', () => {

  randomIdMixin.methods.createRandomId = () => 'random-id';
  const wrapper = mount(DlUiAccordion);

  it('Component Name', () => expect(DlUiAccordion.name).toBe('dl-ui-accordion'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slot content', async () => {
    const wrapperTest = mount(DlUiAccordion, {
      slots :
      {
        title   : '<div class="fake-title"></div>',
        content : '<div class="fake-body"></div>'
      }
    });

    // changed: set data -> innerShow
    await wrapperTest.setData( { innerShow : true });
    await nextTick();

    const div = wrapperTest.find('div');

    // changed: 1 -> 0
    expect(div.findAll('.fake-title').length).toBe(0);
    expect(div.findAll('.fake-body').length).toBe(1);
  });

  describe('watch', () => {
    it('show - true ', async () => {
      // const stub = jest.fn();
      const wrapperTest = mount(DlUiAccordion);
      // wrapperTest.vm.$on('toggle', stub);

      await wrapperTest.setProps( { show : true });
      await nextTick(); // Wait until $emits have been handled
      /* assert event has been emitted
         expect(stub).toHaveBeenCalledWith({ id : 'random-id', value : true }); */

      const emmited = wrapperTest.emitted();

      expect(emmited).toHaveProperty('toggle');
      expect(emmited.toggle[0][0].id).toBe('random-id');
      expect(emmited.toggle[0][0].value).toBe(true);

    });

    it('show - false ', async () => {
      // const stub = jest.fn();
      const wrapperTest = mount(DlUiAccordion);
      // wrapperTest.vm.$on('toggle', stub);
      wrapperTest.setProps( { show : true });
      await nextTick(); // Wait until $emits have been handled

      wrapperTest.setProps( { show : false });
      await nextTick(); // Wait until $emits have been handled
      /* assert event has been emitted
         expect(stub).toHaveBeenCalledWith({ id : 'random-id', value : false }); */

      const emmited = wrapperTest.emitted();

      expect(emmited).toHaveProperty('toggle');
      expect(emmited.toggle[1][0].id).toBe('random-id');
      expect(emmited.toggle[1][0].value).toBe(false);
    });
  });
});
