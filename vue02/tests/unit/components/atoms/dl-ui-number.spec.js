import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import DlUiNumber from '../../../../src/components/atoms/dl-ui-number/index.vue';

describe('dl-ui-number', () => {

  const wrapper = mount(DlUiNumber);

  it('Component Name', () => expect(DlUiNumber.name).toBe('dl-ui-number'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a container', () => {
    expect(wrapper.vm.$refs.container).not.toBeUndefined();
  });

  it('has input', () => {
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('has buttons', () => {
    expect(wrapper.find('button').exists()).toBe(true);
    const children = wrapper.findAll('button');
    expect(children.length).toBe(2);
  });

  it('check icons', () => {
    const wrapperTest = mount(DlUiNumber);

    const children = wrapperTest.findAllComponents('.dl-ui-number__controls-button-icon');
    expect(children.length).toBe(2);
    expect(children[0].props().id).toBe('dl-ids-icon-arrows-up-single-no_circle-outlined');
    expect(children[1].props().id).toBe('dl-ids-icon-arrows-down-single-no_circle-outlined');
  });

  describe('methods', () => {

    it('mouseDown', async () => {
      jest.useFakeTimers();
      Element.prototype.stepUp = () => {};
      Element.prototype.stepDown = () => {};
      const event = { preventDefault : jest.fn() };

      const wrapperTest = mount(DlUiNumber);
      const direction = 'down';
      await wrapperTest.setProps({ disabled : false });
      wrapperTest.vm.mouseDown(direction, event);
      jest.advanceTimersByTime(300);
      await nextTick();
      const direction2 = 'up';
      await wrapperTest.setProps({ disabled : true });
      wrapperTest.vm.mouseDown(direction2, event);
      jest.advanceTimersByTime(300);
      await nextTick();
      await wrapperTest.setProps({ disabled : false });
      await wrapperTest.setData({ timer : null });
      wrapperTest.vm.mouseDown(direction2, event);
      jest.advanceTimersByTime(300);
      await nextTick();

    });

    it('mouseUp', async () => {
      jest.useFakeTimers();
      const wrapperTest = mount(DlUiNumber);
      wrapperTest.vm.mouseUp();
      await nextTick();
      expect(wrapperTest.pressed).toBeFalsy();
      jest.advanceTimersByTime(300);

    });

    it('onInput', async () => {
      const wrapperTest = mount(DlUiNumber);
      wrapperTest.vm.onInput({ target : { value : 3 } });
      await nextTick();
      expect(wrapperTest.emitted('update:modelValue')).toBeTruthy();
      expect(wrapperTest.emitted('update:modelValue')[0][0]).toBe(3);

    });

    it('onFocus', async () => {
      const wrapperTest = mount(DlUiNumber);
      wrapperTest.setData({ focused : false });
      wrapperTest.vm.onFocus();
      await nextTick();
      expect(wrapperTest.vm.focused).toBeTruthy();
    });

    it('onBlur', async () => {
      const wrapperTest = mount(DlUiNumber);
      wrapperTest.vm.onBlur();
      await nextTick();
      expect(wrapperTest.vm.focused).toBeFalsy();
    });

    it('stepUp', async () => {
      const wrapperTest = mount(DlUiNumber);
      Element.prototype.stepUp = () => {};
      await wrapperTest.setProps({ modelValue : 3 });
      await wrapperTest.setProps({ step : 3 });
      wrapperTest.vm.stepUp();
      await nextTick();
      expect(wrapperTest.minReached).toBeFalsy();
      expect(wrapperTest.emitted('update:modelValue')).toBeTruthy();
      await wrapperTest.setData({ pressed : true });
      wrapperTest.vm.stepUp();
    });

    it('stepDown', async () => {
      const wrapperTest = mount(DlUiNumber);
      Element.prototype.stepDown = () => {};
      await wrapperTest.setProps({ modelValue : 3 });
      await wrapperTest.setProps({ step : 3 });
      wrapperTest.vm.stepDown();
      await nextTick();
      expect(wrapperTest.emitted('update:modelValue')).toBeTruthy();
      expect(wrapperTest.maxReached).toBeFalsy();
    });

  });

  describe('computed', () => {

    describe('containerClass', () => {

      it('Computed keys', () => {
        const wrapperTest = mount(DlUiNumber);
        const value = wrapperTest.vm.containerClass[0];
        expect(value).toBeInstanceOf(Object);
        expect(Object.keys(value).length).toBe(3);
        expect(Object.keys(value).includes('dl-ui-number--disabled')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-number--focus')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-number--error')).toBeTruthy;

      });

      it('controlMaxClass ', async () => {
        const wrapperTest = mount(DlUiNumber);
        expect(wrapperTest.maxReached).toBeFalsy();
        wrapperTest.setData({ maxReached : true });
        await nextTick();
        const salida = wrapperTest.vm.controlMaxClass;
        expect(salida).toStrictEqual([{ 'dl-ui-number__controls-button--disabled' : true }]);
      });

      it('controlMinClass ', async () => {
        const wrapperTest = mount(DlUiNumber);
        expect(wrapperTest.minReached).toBeFalsy();
        wrapperTest.setData({ minReached : true });
        await nextTick();
        const salida = wrapperTest.vm.controlMinClass;
        expect(salida).toStrictEqual([{ 'dl-ui-number__controls-button--disabled' : true }]);
      });

    });

  });
});
