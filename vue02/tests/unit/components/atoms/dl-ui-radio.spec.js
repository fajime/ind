import { mount, shallowMount } from '@vue/test-utils';
import randomIdMixin from '../../../../src/mixins/randomId';
import DlUiRadio from '@/components/atoms/dl-ui-radio';

describe('dl-ui-radio', () => {
  randomIdMixin.methods.createRandomId = () => 'random-id';
  const wrapper = mount(DlUiRadio);

  it('Component Name', () => expect(DlUiRadio.name).toBe('dl-ui-radio'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('dom and props', () => {
    it('with main necessary attrs, renders ok and input inherits them', () => {
      const wrapperTest = shallowMount(DlUiRadio, {
        attrs : {
          name : 'bar'
        }
      });
      const input = wrapperTest.find({ ref : 'input' });
      expect(input.exists()).toBe(true);
      expect(input.attributes('id')).toBe('random-id');
      expect(input.attributes('name')).toBe('bar');
    });

    it('disabled attr changes dom and classes', () => {
      const wrapperTest = shallowMount(DlUiRadio, {
        attrs : {
          disabled : 'disabled'
        }
      });
      const mainDiv = wrapperTest.find('div.dl-ui-radio');
      expect(mainDiv.classes()).toContain('dl-ui-radio--disabled');
    });

    it('checked and focus enable corresponding classes', async () => {
      const wrapperTest = shallowMount(DlUiRadio, {
        props : {
          initValue  : 'Casado',
          modelValue : 'Casado'
        }
      });
      const mainDiv = wrapperTest.find('div.dl-ui-radio');
      const secondaryDiv = wrapperTest.find('div.dl-ui-radio__container');
      expect(mainDiv.classes()).toContain('dl-ui-radio--checked');
      await secondaryDiv.trigger('click');
      expect(mainDiv.classes()).toContain('dl-ui-radio--focused');
      expect(mainDiv.classes()).not.toContain('dl-ui-radio--checked');
    });

    it('click triggers events when not disabled', async () => {
      const wrapperTest = shallowMount(DlUiRadio, {
        props : {
          modelValue : 'Divorciado',
          initValue  : 'Casado'
        },
        attrs : {
          disabled : undefined
        }
      });
      const mainDiv = wrapperTest.find('div.dl-ui-radio__container');
      await mainDiv.trigger('click');
      expect(wrapperTest.emitted()).toHaveProperty('click');
      expect(wrapperTest.emitted('update:modelValue')).toEqual([['Casado']]);
      expect(wrapperTest.emitted()).toHaveProperty('change');
    });

    it('click does not trigger events when disabled', async () => {
      const wrapperTest = shallowMount(DlUiRadio, {
        attrs : {
          disabled : 'disabled'
        }
      });
      const mainDiv = wrapperTest.find('div.dl-ui-radio__container');
      await mainDiv.trigger('click');
      expect(wrapperTest.emitted()).not.toHaveProperty('input');
      expect(wrapperTest.emitted()).not.toHaveProperty('click');
    });
  });

  describe('methods', () => {
    it('just onClick, emits from this method checked before', () => {
      const stub = jest.fn();
      const event = {
        target : {}
      };
      const wrapperTest = shallowMount(DlUiRadio);
      wrapperTest.vm.onClick = stub;
      wrapperTest.vm.onClick(event);
      expect(stub).toHaveBeenCalled();
    });

    it('onFocus', () => {
      const event = {
        target : {}
      };
      const wrapperTest = shallowMount(DlUiRadio);
      expect(wrapperTest.vm.focused).toBeFalsy();
      wrapperTest.vm.onFocus(event);
      expect(wrapperTest.vm.focused).toBeTruthy();
      expect(wrapperTest.emitted()).toHaveProperty('focus');

    });
  });

  describe('computed', () => {
    it('checked', () => {

      const wrapperTest = shallowMount(DlUiRadio, {
        props : {
          initValue  : 'Casado',
          modelValue : 'Casado'
        }
      });
      expect(wrapperTest.vm.checked).toBeTruthy();

    });

    it('containerClass', () => {

      const wrapperTest = shallowMount(DlUiRadio);
      const value = wrapperTest.vm.containerClass[0];
      expect(value).toBeInstanceOf(Object);
      expect(Object.keys(value).length).toBe(4);
      expect(Object.keys(value).includes('dl-ui-radio--checked')).toBeTruthy;
      expect(Object.keys(value).includes('dl-ui-radio--disabled')).toBeTruthy;
      expect(Object.keys(value).includes('dl-ui-radio--focused')).toBeTruthy;
      expect(Object.keys(value).includes('dl-ui-radio--label-left')).toBeTruthy;
    });

    it('if hasLabelSlot, slot is loaded', () => {

      const wrapperTest = shallowMount(DlUiRadio, {
        slots : { default : '<div class="fake-msg"></div>' }
      });
      expect(wrapperTest.findAll('.fake-msg').length).toBe(1);
      expect(wrapperTest.vm.hasLabelSlot).toBeTruthy();
    });

  });
});
