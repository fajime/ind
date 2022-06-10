/* eslint-disable max-nested-callbacks */
import { mount, shallowMount } from '@vue/test-utils';
import DlUiSelect from '@/components/atoms/dl-ui-select';
import { nextTick } from 'vue';

describe('dl-ui-select', () => {

  const wrapper = shallowMount(DlUiSelect);

  it('Component Name', () => expect(DlUiSelect.name).toBe('dl-ui-select'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has dropdown component', () => {
    const children = wrapper.findAllComponents('.dl-ui-dropdown');
    expect(children.length).toBe(1);
  });

  it('has listbox component', () => {
    const wrapperTest = shallowMount(DlUiSelect, {
      props : {
        options : [
          { name : 'Australia', value : 'AU' },
          { name : 'Brazil', value : 'BR' }
        ]
      }
    });
    expect(wrapperTest.findComponent('.dl-ui-listbox').exists).toBeTruthy();
  });

  it('check icons', async () => {
    const wrapperTest = mount(DlUiSelect, {
      props : {
        options : [
          {
            name     : 'Australia',
            value    : 'AU',
            leftIcon : 'dl-ids-icon-user-single-outlined'
          },
          {
            name      : 'Brazil',
            value     : 'BR',
            rightIcon : 'dl-ids-icon-user-single-outlined'
          }
        ]
      }
    });
    wrapperTest.setProps({ modelValue : 'AU' });
    await nextTick();
    const children = wrapperTest.findComponent({ ref : 'dropdown' });
    expect(children.html()).toContain('<div class="dl-ui-select__box">');
    expect(wrapperTest.vm.optionSelected).toBe('Australia');
    expect(wrapperTest.vm.iconLeftSelected).toBe('dl-ids-icon-user-single-outlined');
    await wrapperTest.setProps({ modelValue : 'BR' });
    expect(wrapperTest.vm.optionSelected).toBe('Brazil');
    expect(wrapperTest.vm.iconRightSelected).toBe('dl-ids-icon-user-single-outlined');
  });

  describe('watchers', () => {

    it('modelValue', async () => {
      const wrapperTest = mount(DlUiSelect);
      expect(wrapperTest.vm.$props.modelValue).toBeUndefined();
      wrapperTest.setProps({ modelValue : 'Fake' });
      await nextTick();
      expect(wrapperTest.vm.$props.modelValue).toStrictEqual('Fake');
      expect(wrapperTest.vm.$data.valued).toStrictEqual(['Fake']);

    });
  });

  describe('methods', () => {

    it('onClassChange', async () => {
      const stub = jest.fn();
      const wrapperTest = mount(DlUiSelect);
      wrapperTest.vm.setClasses = stub;
      await wrapperTest.vm.onClassChange();
      expect(stub).toHaveBeenCalled();
    });

    it('setClasses', async () => {
      const wrapperTest = mount(DlUiSelect);
      await wrapperTest.setProps({ error : true });
      await wrapperTest.setProps({ disabled : false });
      await wrapperTest.vm.setClasses();
      expect(wrapperTest.vm.$data.classSize.dropdown).toContain('dl-ui-dropdown--error');
      await wrapperTest.setProps({ error : false });
      await wrapperTest.setProps({ disabled : true });
      await wrapperTest.vm.setClasses();
      expect(wrapperTest.vm.$data.classSize.dropdown).toContain('dl-ui-dropdown--disabled');
    });

    it('handleInput', () => {
      const event = { preventDefault : () => {} };
      jest.spyOn(event, 'preventDefault');
      const wrapperTest = mount(DlUiSelect);
      jest.useFakeTimers();
      wrapperTest.vm.handleInput(event);
      jest.runAllTimers();
      expect(wrapperTest.emitted()).toHaveProperty('update:modelValue');
      expect(clearInterval).toHaveBeenLastCalledWith(expect.any(Number));
    });

    it('handleClear', async () => {
      const event = { stopPropagation : jest.fn() };
      jest.spyOn(event, 'stopPropagation');
      const wrapperTest = mount(DlUiSelect);
      wrapperTest.vm.handleClear(event);
      await nextTick();
      expect(event.stopPropagation).toBeCalled();
      expect(wrapperTest.emitted()).toHaveProperty('update:modelValue');
      expect(wrapperTest.emitted('update:modelValue')).toEqual([[undefined]]);
    });

    it('handleBlur', () => {
      const wrapperTest = mount(DlUiSelect);
      jest.useFakeTimers();
      wrapperTest.vm.handleBlur();
      jest.runAllTimers();
      expect(clearInterval).toHaveBeenLastCalledWith(expect.any(Number));

    });

    it('handleChange', async () => {
      let direction = 1;
      const wrapperTest = mount(DlUiSelect, {
        props : {
          options : [
            { name : 'Australia', value : 'AU' },
            { name : 'Brazil', value : 'BR', disabled : false }
          ],
          modelValue : 'AU'
        }
      });
      wrapperTest.vm.handleChange(direction);
      await nextTick();
      expect(wrapperTest.emitted()).toHaveProperty('update:modelValue');
      expect(wrapperTest.emitted('update:modelValue')).toEqual([['BR']]);
      wrapperTest.vm.$props.options[1].disabled = true;
      await nextTick();
      wrapperTest.vm.handleChange(direction);
      await nextTick();
      direction = 2;
      await nextTick();
      wrapperTest.vm.handleChange(direction);
      await nextTick();
      direction = -3;
      await nextTick();
      wrapperTest.vm.handleChange(direction);
      direction = -5;
      await nextTick();
      await wrapperTest.setProps({ modelValue : null });
      wrapperTest.vm.handleChange(direction);

    });

    it('getSelectedOption', async () => {
      const wrapperTest = mount(DlUiSelect, {
        props : {
          options : [
            { name : 'Australia', value : 'AU' },
            { name : 'Brazil', value : 'BR' }
          ]
        }
      });

      await wrapperTest.setData({ overlayVisible : true });
      await wrapperTest.setProps({ modelValue : 'AU' });
      const result = wrapperTest.vm.getSelectedOption();
      result;
      await wrapperTest.setProps({ modelValue : null });
      await wrapperTest.setProps({ options : null });
      result;
      expect(result.value).toBe('AU');
    });

    it('getSelectedOptionIndex', async () => {
      const wrapperTest = mount(DlUiSelect, {
        props : {
          options : [
            { name : 'Australia', value : 'AU' },
            { name : 'Brazil', value : 'BR' }
          ],
          modelValue : 'JP'
        }
      });
      const result = wrapperTest.vm.getSelectedOptionIndex();
      expect(result).toEqual(-1);
      await wrapperTest.setData({ overlayVisible : true });
      await wrapperTest.setProps({ modelValue : null });
      const result2 = wrapperTest.vm.getSelectedOptionIndex();
      expect(result2).toEqual(-1);
      await wrapperTest.setProps({ modelValue : 'AU' });
      const result3 = wrapperTest.vm.getSelectedOptionIndex();
      expect(result3).toEqual(0);
    });

    it('onClearClick', () => {
      const wrapperTest = mount(DlUiSelect);
      const event = { };
      const stub = jest.fn();
      wrapperTest.vm.updateModel = stub;
      wrapperTest.vm.onClearClick(event);
      expect(stub).toHaveBeenCalled();

    });

    it('updateModel', async () => {
      const event = { target : {} };
      const value = 3;
      const wrapperTest = mount(DlUiSelect);
      wrapperTest.vm.updateModel(event, value);
      await nextTick();
      expect(wrapperTest.emitted()).toHaveProperty('update:modelValue');
      expect(wrapperTest.emitted('update:modelValue')).toEqual([[3]]);
      expect(wrapperTest.emitted()).toHaveProperty('change');

    });

    it('listboxMounted', () => {
      const wrapperTest = mount(DlUiSelect);
      jest.useFakeTimers();
      wrapperTest.vm.listboxMounted();
      jest.runAllTimers();
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);

    });

  });

  describe('computed', () => {
    describe('containerClass', () => {

      it('Computed keys', () => {
        const wrapperTest = mount(DlUiSelect);
        const value = wrapperTest.vm.containerClass[0];
        expect(value).toBeInstanceOf(Object);
        expect(Object.keys(value).length).toBe(5);
        expect(Object.keys(value).includes('dl-ui-select--disabled')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-select--clearable')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-select--focus')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-select--error')).toBeTruthy;
        expect(Object.keys(value).includes('dl-ui-select--opened')).toBeTruthy;

      });

      it('Computed disabled', async () => {
        const wrapperTest = mount(DlUiSelect);
        wrapperTest.setProps({ disabled : true });
        await nextTick();
        const div = wrapperTest.find('.dl-ui-select');
        expect(div.classes()).toContain('dl-ui-select--disabled');
      });

      it('Computed clearable', async () => {
        const wrapperTest = mount(DlUiSelect);
        wrapperTest.setProps({ showClear : true });
        wrapperTest.setProps({ disabled : false });
        await nextTick();
        const div = wrapperTest.find('.dl-ui-select');
        expect(div.classes()).toContain('dl-ui-select--clearable');
      });

      it('Computed focus', async () => {
        const wrapperTest = mount(DlUiSelect);
        wrapperTest.setData({ focused : true });
        await nextTick();
        const div = wrapperTest.find('.dl-ui-select');
        expect(div.classes()).toContain('dl-ui-select--focus');
      });

      it('Computed error', async () => {
        const wrapperTest = mount(DlUiSelect);
        wrapperTest.setProps({ error : true });
        await nextTick();
        const div = wrapperTest.find('.dl-ui-select');
        expect(div.classes()).toContain('dl-ui-select--error');
      });

      it('Computed opened', async () => {
        const wrapperTest = mount(DlUiSelect);
        wrapperTest.setData({ overlayVisible : true });
        await nextTick();
        const div = wrapperTest.find('.dl-ui-select');
        expect(div.classes()).toContain('dl-ui-select-opened');
      });

      it('Computed iconLeftSelected', async () => {
        const wrapperTest = shallowMount(DlUiSelect, {
          props : {
            options : [
              { name : 'Australia', value : 'AU', leftIcon : 'dl-ids-icon-user-single-outlined' }
            ]
          }
        });
        await wrapperTest.setProps({ modelValue : 'AU' });

        const salida = wrapperTest.vm.iconLeftSelected;
        expect(salida).toBe('dl-ids-icon-user-single-outlined');
      });

      it('Computed iconRightSelected', async () => {
        const wrapperTest = shallowMount(DlUiSelect, {
          props : {
            options : [
              { name : 'Australia', value : 'AU', rightIcon : 'dl-ids-icon-user-single-outlined' }
            ]
          }
        });
        await wrapperTest.setProps({ modelValue : 'AU' });

        const salida = wrapperTest.vm.iconRightSelected;
        expect(salida).toBe('dl-ids-icon-user-single-outlined');
      });

      it('Computed optionSelected', async () => {
        const wrapperTest = mount(DlUiSelect, {
          props : {
            options : [
              { name : 'Australia', value : 'AU', leftIcon : 'dl-ids-icon-user-single-outlined' }
            ]
          }
        });
        await wrapperTest.setProps({ modelValue : 'AU' });
        const salida = wrapperTest.vm.optionSelected;
        expect(salida).toBe('Australia');
      });
    });

  });
});
