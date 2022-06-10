import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import DlUiPassword from '../../../../src/components/atoms/dl-ui-password/index.vue';

describe('dl-ui-password', () => {

  const wrapper = mount(DlUiPassword);

  it('Component Name', () => expect(DlUiPassword.name).toBe('dl-ui-password'));

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
    const wrapperTest = mount(DlUiPassword);
    await wrapperTest.setProps({ showEye : true });

    await nextTick();

    const inputGroup = wrapperTest.find('.dl-ui-password__group');
    let children = inputGroup.findAllComponents('.dl-ui-password__icon');
    expect(wrapperTest.find('button').exists()).toBe(true);
    expect(children[0].props().id).toBe('dl-ids-icon-eye-show-outlined');
    await wrapperTest.setData({ unmasked : true });
    expect(children[0].props().id).toBe('dl-ids-icon-eye-hide-outlined');
    await wrapperTest.setProps({ showEye : false });

    children = inputGroup.findAllComponents('.dl-ui-password__icon');
    expect(children.length).toBe(0);

  });

  describe('methods', () => {

    it('onInput', async () => {
      const wrapperTest = mount(DlUiPassword);
      wrapperTest.vm.onInput({ target : { value : 'fake' } });
      await nextTick();

      expect(wrapperTest.emitted('update:modelValue')).toBeTruthy();
      expect(wrapperTest.emitted('update:modelValue')[0][0]).toBe('fake');

    });

    it('onFocus', async () => {
      const wrapperTest = mount(DlUiPassword);
      wrapperTest.setData({ focused : false });
      wrapperTest.vm.onFocus();
      await nextTick();
      expect(wrapperTest.vm.focused).toBeTruthy();
      expect(wrapperTest.emitted('focus')).toBeTruthy();
    });

    it('onBlur', async () => {
      const wrapperTest = mount(DlUiPassword);
      wrapperTest.vm.onBlur();
      await nextTick();
      expect(wrapperTest.vm.focused).toBeFalsy();
      expect(wrapperTest.emitted('blur')).toBeTruthy();
    });

    it('switchHidden', async () => {
      const wrapperTest = mount(DlUiPassword);
      expect(wrapperTest.vm.unmasked).toBeFalsy();
      wrapperTest.vm.switchHidden();
      await nextTick();
      expect(wrapperTest.vm.unmasked).toBeTruthy();
    });
  });

  describe('computed', () => {

    describe('containerClass', () => {

      it('Computed keys', () => {
        const wrapperTest = mount(DlUiPassword);
        const value = wrapperTest.vm.containerClass[0];
        expect(value).toBeInstanceOf(Object);
        expect(Object.keys(value).length).toBe(4);
        expect(Object.keys(value).includes('dl-ui-password--right-icon')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-password--disabled')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-password--focus')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-password--error')).toBeTruthy;

      });

      it('Computed showEye', async () => {
        const wrapperTest = mount(DlUiPassword);
        expect(wrapperTest.vm.$props.showEye).toBeTruthy();
        await nextTick();
        const value = wrapperTest.vm.containerClass[0];
        expect(value['dl-ui-password--showEye']).toBeTruthy();
      });

      it('Computed disabled', async () => {
        const wrapperTest = mount(DlUiPassword);
        expect(wrapperTest.vm.$props.disabled).toBeFalsy();
        await wrapperTest.setProps({ disabled : true });
        await nextTick();
        const value = wrapperTest.vm.containerClass[0];
        expect(value['dl-ui-password--disabled']).toBeTruthy();
      });

      it('Computed focused', async () => {
        const wrapperTest = mount(DlUiPassword);
        expect(wrapperTest.vm.focused).toBeFalsy();
        wrapperTest.setData({ focused : true });
        await nextTick();
        const value = wrapperTest.vm.containerClass[0];
        expect(value['dl-ui-password--focus']).toBeTruthy();
      });

      it('Computed error', async () => {
        const wrapperTest = mount(DlUiPassword);
        expect(wrapperTest.vm.$props.error).toBeFalsy();
        await wrapperTest.setProps({ error : true });
        await nextTick();
        const value = wrapperTest.vm.containerClass[0];
        expect(value['dl-ui-password--error']).toBeTruthy();
      });

    });

    it('inputType', async () => {
      const wrapperTest = mount(DlUiPassword);
      expect(wrapperTest.vm.inputType).toBe('password');
      await wrapperTest.setData({ unmasked : true });
      expect(wrapperTest.vm.inputType).toBe('text');

    });

  });
});
