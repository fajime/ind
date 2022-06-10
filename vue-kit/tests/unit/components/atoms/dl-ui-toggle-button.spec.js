/* eslint-disable no-console */
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import randomIdMixin from '../../../../src/mixins/randomId';
import DlUiToggleButton from '../../../../src/components/atoms/dl-ui-toggle-button/index.vue';

describe('dl-ui-toggle-button', () => {
  randomIdMixin.methods.createRandomId = () => 'random-id';

  const wrapper = mount(DlUiToggleButton);

  it('Component Name', () => expect(DlUiToggleButton.name).toBe('dl-ui-toggle-button'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('methods', () => {
    it('init', () => {
      const stub1 = jest.fn();
      const stub2 = jest.fn();
      const wrapperTest = mount(DlUiToggleButton);

      wrapperTest.vm.setDisabledClass = stub1;
      wrapperTest.vm.setActiveClass = stub2;
      wrapperTest.vm.init();
      expect(stub1).toHaveBeenCalled();
      expect(stub2).toHaveBeenCalled();
    });

    it('setDisableClass', async () => {
      const wrapperTest = mount(DlUiToggleButton);
      wrapperTest.element.classList.add('fakeClass');
      await wrapperTest.setProps({ disabled : true });

      // changed: toBe(2) -> toBe(4)
      expect(wrapperTest.element.classList.length).toBe(4);

      expect(wrapperTest.element.classList[0]).toEqual('dl-ui-toggle-button');
      expect(wrapperTest.element.classList[1]).toEqual('fakeClass');
      expect(wrapperTest.element.classList[2]).toEqual('dl-ui-toggle-button--disabled');
      expect(wrapperTest.element.classList[3]).toEqual('fakeClass--disabled');

      wrapperTest.setProps({ disabled : false });
      // find by class (add `.`)
      const fakeClassElement = wrapperTest.find('.fakeClass');
      fakeClassElement.trigger('click');
      await nextTick();

      // changed: toBe(1) -> toBe(2) - class `dl-ui-toggle-button` add to root
      expect(wrapperTest.element.classList.length).toBe(2);
      expect(wrapperTest.element.classList[1]).toEqual('fakeClass');

    });

    it('setActiveClass', async () => {
      const wrapperTest = mount(DlUiToggleButton);
      wrapperTest.element.classList.add('fakeClass');

      console.log(wrapperTest.element.outerHTML);

      // changed: value -> modelValue
      await wrapperTest.setProps({ modelValue : true });
      await nextTick();

      console.log(wrapperTest.element.outerHTML);
      console.log(wrapperTest.element.classList.toString() );

      expect(wrapperTest.element.classList.length).toBe(2);
      expect(wrapperTest.element.classList[0]).toEqual('fakeClass');
      expect(wrapperTest.element.classList[1]).toEqual('fakeClass--active');
      wrapperTest.setProps({ value : false });

    });

    it('raiseEvent', async () => {
      const wrapperTest = mount(DlUiToggleButton,
        {
          propsData : {
            disabled : false,
            value    : false
          }
        });
      wrapperTest.find('input').trigger('input');
      await nextTick();
      expect(wrapperTest.emitted('input')).toBeTruthy();
    });

  });

});

