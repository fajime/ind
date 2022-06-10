import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import DlUiInput from '../../../../src/components/atoms/dl-ui-input/index.vue';

describe('dl-ui-input', () => {

  const wrapper = mount(DlUiInput);

  it('Component Name', () => expect(DlUiInput.name).toBe('dl-ui-input'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a container', () => {
    expect(wrapper.vm.$refs.container).not.toBeUndefined();
  });

  it('has input', () => {
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('check icons', async () => {
    const wrapperTest = mount(DlUiInput);
    await wrapperTest.setProps({ leftIcon : 'dl-ui-icon-user' });
    await wrapperTest.setProps({ rightIcon : 'dl-ui-icon-lab' });
    await nextTick();

    /* changed:
       wrapperTest.vm.$children[0].$options.propsData.id
       replace to: */
    const inputGroup = wrapperTest.find('.dl-ui-input__group');
    let children = inputGroup.findAllComponents('.dl-ui-input__icon');

    expect(inputGroup.wrapperElement.childNodes.length).toBe(3);

    expect(children[0].props().id).toBe('dl-ui-icon-user');
    expect(children[1].props().id).toBe('dl-ui-icon-lab');

    await wrapperTest.setProps({ leftIcon : undefined });
    await wrapperTest.setProps({ rightIcon : undefined });
    await nextTick();

    /* expect(children[0]).toBeUndefined();
       expect(children[1]).toBeUndefined(); */

    // changed:
    children = inputGroup.findAllComponents('.dl-ui-input__icon');
    expect(children.length).toBe(0);

  });

  describe('methods', () => {

    it('onInput', async () => {
      const wrapperTest = mount(DlUiInput);
      wrapperTest.vm.onInput({ target : { value : 'fake' } });
      await nextTick();

      expect(wrapperTest.emitted('update:modelValue')).toBeTruthy();
      expect(wrapperTest.emitted('update:modelValue')[0][0]).toBe('fake');

    });

    it('onFocus', async () => {
      const wrapperTest = mount(DlUiInput);
      wrapperTest.setData({ focused : false });
      wrapperTest.vm.onFocus();
      await nextTick();
      expect(wrapperTest.vm.focused).toBeTruthy();
      expect(wrapperTest.emitted('focus')).toBeTruthy();
    });

    it('onBlur', async () => {
      const wrapperTest = mount(DlUiInput);
      wrapperTest.vm.onBlur();
      await nextTick();
      expect(wrapperTest.vm.focused).toBeFalsy();
      expect(wrapperTest.emitted('blur')).toBeTruthy();
    });

  });

  describe('computed', () => {

    describe('containerClass', () => {

      it('Computed keys', () => {
        const wrapperTest = mount(DlUiInput);
        const value = wrapperTest.vm.containerClass[0];
        expect(value).toBeInstanceOf(Object);
        expect(Object.keys(value).length).toBe(5);
        expect(Object.keys(value).includes('dl-ui-input--left-icon')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-input--right-icon')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-input--disabled')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-input--focus')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-input--error')).toBeTruthy;

      });

      it('Computed leftIcon', async () => {
        const wrapperTest = mount(DlUiInput);
        expect(wrapperTest.vm.$props.leftIcon).toBeUndefined();
        await wrapperTest.setProps({ leftIcon : 'fake' });
        await nextTick();
        const value = wrapperTest.vm.containerClass[0];
        expect(value['dl-ui-input--left-icon']).toBe('fake');
      });

      it('Computed rightIcon', async () => {
        const wrapperTest = mount(DlUiInput);
        expect(wrapperTest.vm.$props.rightIcon).toBeUndefined();
        await wrapperTest.setProps({ rightIcon : 'fake1' });
        await nextTick();
        const value = wrapperTest.vm.containerClass[0];
        expect(value['dl-ui-input--right-icon']).toBe('fake1');
      });

      it('Computed disabled', async () => {
        const wrapperTest = mount(DlUiInput);
        expect(wrapperTest.vm.$props.disabled).toBeFalsy();
        await wrapperTest.setProps({ disabled : true });
        await nextTick();
        const value = wrapperTest.vm.containerClass[0];
        expect(value['dl-ui-input--disabled']).toBeTruthy();
      });

      it('Computed focused', async () => {
        const wrapperTest = mount(DlUiInput);
        expect(wrapperTest.vm.focused).toBeFalsy();
        wrapperTest.setData({ focused : true });
        await nextTick();
        const value = wrapperTest.vm.containerClass[0];
        expect(value['dl-ui-input--focus']).toBeTruthy();
      });

      it('Computed error', async () => {
        const wrapperTest = mount(DlUiInput);
        expect(wrapperTest.vm.$props.error).toBeFalsy();
        await wrapperTest.setProps({ error : true });
        await nextTick();
        const value = wrapperTest.vm.containerClass[0];
        expect(value['dl-ui-input--error']).toBeTruthy();
      });

    });
  });
});
