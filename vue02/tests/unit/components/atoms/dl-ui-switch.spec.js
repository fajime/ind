import { mount } from '@vue/test-utils';
import randomIdMixin from '../../../../src/mixins/randomId';
import DlUiSwitch from '../../../../src/components/atoms/dl-ui-switch/index.vue';

describe('dl-ui-switch', () => {
  randomIdMixin.methods.createRandomId = () => 'random-id';
  const wrapper = mount(DlUiSwitch);

  it('Component Name', () => expect(DlUiSwitch.name).toBe('dl-ui-switch'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has input', () => {
    expect(wrapper.find('input').exists()).toBe(true);
  });

  describe('methods', () => {

    it('raiseEvent', async () => {
      const wrapperTest = mount(DlUiSwitch,
        {
          props : {
            disabled   : false,
            modelValue : false
          }
        });
      wrapperTest.find('input').trigger('input');
      await wrapperTest.vm.$nextTick();
      expect(wrapperTest.emitted()).toHaveProperty('update:modelValue');
    });
  });
});

