import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import randomIdMixin from '../../../../src/mixins/randomId';
import DlUiRange from '../../../../src/components/atoms/dl-ui-range/index.vue';

describe('dl-ui-range', () => {
  randomIdMixin.methods.createRandomId = () => 'random-id';
  const wrapper = mount(DlUiRange);

  it('Component Name', () => expect(DlUiRange.name).toBe('dl-ui-range'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('watchers', () => {

    it('value', async () => {
      const stub = jest.fn();
      const wrapperTest = mount(DlUiRange,
        {
          propsData : {
            min        : 1,
            max        : 10,
            step       : 1,
            modelValue : 5
          }
        });
      wrapperTest.vm.calcPosition = stub;

      await nextTick();
      await wrapperTest.setProps({ modelValue : 1 });

      expect(stub).toHaveBeenCalled();

    });
  });

  describe('methods', () => {

    it('init', () => {
      const stub = jest.fn();
      const wrapperTest = mount(DlUiRange,
        {
          propsData : {
            min   : 1,
            max   : 10,
            step  : 1,
            value : 5
          }
        });
      jest.useFakeTimers();
      wrapperTest.vm.calcPosition = stub;
      wrapperTest.vm.init();
      expect(setTimeout).toHaveBeenCalled();
      jest.runOnlyPendingTimers();
      expect(stub).toHaveBeenCalled();
    });

    it('calcPosition', async () => {

      const wrapperTest = mount(DlUiRange,
        {
          propsData : {
            min        : 1,
            max        : 10,
            step       : 1,
            modelValue : 0
          }
        });

      await nextTick();
      wrapperTest.vm.calcPosition();
      await nextTick();

      // return zero negative (-0)
      expect(wrapperTest.vm.position).toBeCloseTo(0, 10);
      expect(wrapperTest.vm.result).toBeCloseTo(0, 10);

    });

    it('raiseEvent', () => {
      const wrapperTest = mount(DlUiRange,
        {
          propsData : {
            min   : 1,
            max   : 10,
            step  : 1,
            value : 0
          }
        });
      wrapperTest.find('input').trigger('input');
      /* no hace falta
         await wrapperTest.vm.$nextTick(); */
      expect(wrapperTest.emitted('input')).toBeTruthy();
    });
  });
});

