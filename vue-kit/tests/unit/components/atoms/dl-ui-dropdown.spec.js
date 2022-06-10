/* eslint-disable strict-vue/require-jsdoc */
/* eslint-disable max-nested-callbacks */
import { mount, shallowMount } from '@vue/test-utils';
import DlUiDropdown from '@/components/atoms/dl-ui-dropdown';
import { nextTick } from 'vue';

describe('dl-ui-dropdown', () => {

  const wrapper = shallowMount(DlUiDropdown);

  it('Component Name', () => expect(DlUiDropdown.name).toBe('dl-ui-dropdown'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('check icons', () => {
    const wrapperTest = mount(DlUiDropdown);
    const children = wrapperTest.findAllComponents('.dl-ui-dropdown__trigger-icon');
    expect(children.length).toBe(1);
    expect(wrapperTest.vm.$data.overlayVisible).toBeFalsy();
    expect(children[0].props().id).toBe('dl-ids-icon-arrows-down-single-no_circle-outlined');
  });

  it('slot content', () => {
    const wrapperTest = mount(DlUiDropdown, { slots : { default : '<div class="fake-msg"></div>' } });
    const div = wrapperTest.find('.dl-ui-dropdown__box-slot');
    expect(div.findAll('.fake-msg').length).toBe(1);
  });

  describe('watchers', () => {

    it('modelValue', async () => {
      const wrapperTest = mount(DlUiDropdown);
      expect(wrapperTest.vm.$props.modelValue).toBeUndefined();
      wrapperTest.setProps({ modelValue : 'Fake' });
      await nextTick();
      expect(wrapperTest.vm.$props.modelValue).toStrictEqual('Fake');
      expect(wrapperTest.vm.$data.valued).toStrictEqual(['Fake']);

    });
  });

  describe('computed', () => {

    describe('containerClass', () => {
      it('Computed keys', () => {
        const wrapperTest = mount(DlUiDropdown);
        const value = wrapperTest.vm.containerClass[0];
        expect(value).toBeInstanceOf(Object);
        expect(Object.keys(value).length).toBe(3);
        expect(Object.keys(value).includes('dl-ui-dropdown--clearable')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-dropdown--focus')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-dropdown-opened')).toBeTruthy;

      });
      it('Computed clearable', async () => {
        const wrapperTest = mount(DlUiDropdown);
        wrapperTest.setProps({ showClear : true });
        await nextTick();
        const div = wrapperTest.find('.dl-ui-dropdown__container');
        expect(div.classes()).toContain('dl-ui-dropdown--clearable');
      });

      it('Computed focus', async () => {
        const wrapperTest = mount(DlUiDropdown);
        wrapperTest.setData({ focused : true });
        await nextTick();
        const div = wrapperTest.find('.dl-ui-dropdown__container');
        expect(div.classes()).toContain('dl-ui-dropdown--focus');
      });

      it('Computed opened', async () => {
        const wrapperTest = mount(DlUiDropdown);
        wrapperTest.setData({ overlayVisible : true });
        await nextTick();
        const div = wrapperTest.find('.dl-ui-dropdown__container');
        expect(div.classes()).toContain('dl-ui-dropdown-opened');
      });
    });

  });

  describe('methods', () => {

    it('onClick - disabled', async () => {
      const wrapperTest = shallowMount(DlUiDropdown, {
        props : {
          disabled : true
        }
      });

      const spyHide = jest.spyOn(wrapperTest.vm, 'hide');
      const spyShow = jest.spyOn(wrapperTest.vm, 'show');
      await wrapperTest.vm.onClick({ target : { } });
      expect(spyHide).not.toHaveBeenCalled();
      expect(spyShow).not.toHaveBeenCalled();

    });

    it('onClick - enabled + overlay', async () => {
      const wrapperTest = shallowMount(DlUiDropdown, {
        props : {
          disabled : false
        }
      });

      const spyHide = jest.spyOn(wrapperTest.vm, 'hide');
      const spyShow = jest.spyOn(wrapperTest.vm, 'show');
      await wrapperTest.vm.$refs.dropdown.focus();
      await nextTick();
      await wrapperTest.vm.onClick({ target : wrapperTest.vm.$refs.dropdown });
      expect(spyHide).not.toHaveBeenCalled();
      expect(spyShow).toHaveBeenCalled();
    });

    it('onClick - enabled + event + overlayVisible', async () => {
      const stub = jest.fn();
      const stub2 = jest.fn();
      const wrapperTest = shallowMount(DlUiDropdown, {
        props : {
          disabled       : false,
          overlayVisible : true
        }
      });

      await wrapperTest.vm.$refs.dropdown.focus();
      wrapperTest.vm.overlayVisible = true;
      await nextTick();
      wrapperTest.vm.hide = stub;
      wrapperTest.vm.show = stub2;
      await wrapperTest.vm.onClick({ target : wrapperTest.vm.$refs.dropdown });
      expect(stub).toHaveBeenCalled();
      expect(stub2).not.toHaveBeenCalled();
    });

    it('onClick - enabled + event + not overlayVisible', async () => {
      const stub = jest.fn();
      const stub2 = jest.fn();
      const wrapperTest = shallowMount(DlUiDropdown, {
        props : {
          disabled       : false,
          overlayVisible : true
        }
      });

      await wrapperTest.vm.$refs.dropdown.focus();
      wrapperTest.vm.overlayVisible = false;
      await nextTick();
      wrapperTest.vm.hide = stub;
      wrapperTest.vm.show = stub2;
      await wrapperTest.vm.onClick({ target : wrapperTest.vm.$refs.dropdown });
      expect(stub).not.toHaveBeenCalled();
      expect(stub2).toHaveBeenCalled();
    });
    it('handleSpace', async () => {
      const event = { preventDefault : () => {} };
      jest.spyOn(event, 'preventDefault');
      const wrapperTest = mount(DlUiDropdown);
      wrapperTest.vm.handleSpace(event);
      await nextTick();
      expect(event.preventDefault).toBeCalled();
      expect(wrapperTest.vm.$data.overlayVisible).toBeTruthy();
    });

    it('handleChange', async () => {
      const event = { preventDefault : () => {} };
      jest.spyOn(event, 'preventDefault');
      const direction = 3;
      const wrapperTest = mount(DlUiDropdown);
      wrapperTest.vm.handleChange(event, direction);
      await nextTick();
      expect(event.preventDefault).toBeCalled();
      expect(wrapperTest.emitted()).toHaveProperty('change');
      expect(wrapperTest.emitted('change')).toEqual([[3]]);
    });

    it('handleBlur', async () => {
      const wrapperTest = mount(DlUiDropdown);
      jest.useFakeTimers();
      wrapperTest.vm.handleBlur();
      jest.runAllTimers();
      await nextTick();
      await wrapperTest.setData({ overlayVisible : true });
      wrapperTest.vm.handleBlur();
      jest.runAllTimers();
      await nextTick();
      expect(wrapperTest.vm.$data.overlayVisible).toBeTruthy();
      expect(wrapperTest.emitted()).toHaveProperty('blur');
    });

    it('show - hide', async () => {
      const wrapperTest = mount(DlUiDropdown);
      const stub = jest.fn();
      wrapperTest.vm.bindOutsideClickListener = stub;
      wrapperTest.vm.unbindOutsideClickListener = stub;
      wrapperTest.vm.show();
      await nextTick();
      expect(wrapperTest.emitted()).toHaveProperty('showed');
      expect(stub).toHaveBeenCalled();
      wrapperTest.vm.hide();
      expect(wrapperTest.vm.overlayVisible).toBe(false);
      await nextTick();
      expect(wrapperTest.emitted()).toHaveProperty('hide');
      expect(stub).toHaveBeenCalled();
    });

    it('focus', async () => {
      const wrapperTest = mount(DlUiDropdown);
      wrapperTest.vm.focus();
      await nextTick();
      expect(wrapperTest.find('div.dl-ui-dropdown').exists()).toBe(true);
      expect(wrapperTest.vm.$refs.dropdown).not.toBeUndefined();
    });

    it('updateModel', async () => {
      const event = { target : {} };
      const value = 3;
      const wrapperTest = mount(DlUiDropdown);
      wrapperTest.vm.updateModel(event, value);
      await nextTick();
      expect(wrapperTest.emitted()).toHaveProperty('update:modelValue');
      expect(wrapperTest.emitted('update:modelValue')).toEqual([[3]]);
      expect(wrapperTest.emitted()).toHaveProperty('change');
    });

    it('bindOutsideClickListener - not outsideClickListener', () => {
      const stub = jest.fn();
      const wrapperTest = shallowMount(DlUiDropdown);
      document.addEventListener = stub;
      wrapperTest.vm.outsideClickListener = true;
      wrapperTest.vm.bindOutsideClickListener();
      expect(stub).not.toHaveBeenCalled();
    });

    it('bindOutsideClickListener - outsideClickListener', async () => {
      const stub = jest.fn();
      const stub2 = jest.fn();
      const wrapperTest = shallowMount(DlUiDropdown);
      await nextTick();
      document.addEventListener = stub;
      wrapperTest.vm.outsideClickListener = undefined;
      wrapperTest.vm.bindOutsideClickListener();
      expect(stub).toHaveBeenCalled();
      const event = { target : wrapperTest.vm.$refs.dropdown };

      wrapperTest.vm.hide = stub2;

      wrapperTest.vm.outsideClickListener(event);
      expect(stub2).not.toHaveBeenCalled();

      await wrapperTest.setData({ overlayVisible : true });

      wrapperTest.vm.outsideClickListener(event);
      expect(stub2).toHaveBeenCalled();
    });
    it('unbindOutsideClickListener true', () => {
      const event = { target : { value : 'fake ' } };
      const wrapperTest = shallowMount(DlUiDropdown);
      wrapperTest.vm.outsideClickListener = event;
      wrapperTest.vm.unbindOutsideClickListener();
      expect(wrapperTest.vm.outsideClickListener).toBeNull();
    });

    it('unbindOutsideClickListener false', () => {
      const wrapperTest = shallowMount(DlUiDropdown);
      wrapperTest.vm.outsideClickListener = undefined;
      wrapperTest.vm.unbindOutsideClickListener();
      expect(wrapperTest.vm.outsideClickListener).toBeUndefined();

    });
  });

});
