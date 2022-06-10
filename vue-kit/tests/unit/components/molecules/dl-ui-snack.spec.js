import { mount } from '@vue/test-utils';
import randomIdMixin from '../../../../src/mixins/randomId';
import DlUISnack from '../../../../src/components/molecules/dl-ui-snack/index.vue';
import { nextTick } from 'vue';

describe('dl-ui-snack', () => {
  randomIdMixin.methods.createRandomId = () => 'random-id';
  const wrapper = mount(DlUISnack);

  it('Component Name', () => {
    expect(DlUISnack.name).toBe('dl-ui-snack');
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('methods', () => {
    it('close', () => {
      const wrapperTest = mount(DlUISnack,
        {
          propsData : {
            show : true
          }
        });
      wrapperTest.vm.close();
      expect(wrapperTest.emitted('closed')).toBeTruthy();
      expect(wrapperTest.visible).toBeFalsy();
    });
  });

  describe('watcher', () => {
    it('show - visible and timeout', async () => {
      const stub = jest.fn();
      jest.useFakeTimers();
      const wrapperTest = mount(DlUISnack,
        {
          propsData : {
            show    : false,
            timeout : 1000
          }
        });
      wrapperTest.vm.close = stub;
      await wrapperTest.setProps({ show : true });
      await nextTick();
      jest.runOnlyPendingTimers();
      expect(stub).toHaveBeenCalled();
    });
    it('show - not visible and timeout', async () => {
      const stub = jest.fn();
      jest.useFakeTimers();
      const wrapperTest = mount(DlUISnack,
        {
          propsData : {
            show    : true,
            timeout : 1000
          }
        });
      wrapperTest.vm.close = stub;
      await wrapperTest.setProps({ show : false });
      await nextTick();
      jest.runOnlyPendingTimers();
      expect(stub).toHaveBeenCalled();
    });

    it('show - visible and not timeout', async () => {
      const stub = jest.fn();
      jest.useFakeTimers();
      const wrapperTest = mount(DlUISnack,
        {
          propsData : {
            show    : true,
            timeout : 0
          }
        });
      wrapperTest.vm.close = stub;
      await wrapperTest.setProps({ show : false });
      await nextTick();
      jest.runOnlyPendingTimers();
      expect(stub).toHaveBeenCalled();
    });
  });

});

