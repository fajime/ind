import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import DlUiProgressBar from '../../../../src/components/atoms/dl-ui-progress-bar/index.vue';

describe('dl-ui-progress-bar', () => {
  const wrapper = mount(DlUiProgressBar);

  it('Component Name', () => expect(DlUiProgressBar.name).toBe('dl-ui-progress-bar'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('percentValue', () => {
    it('value', async () => {
      const wrapperTest = mount(DlUiProgressBar,
        {
          propsData : {
            min   : 0,
            max   : 50,
            value : 0
          }
        });
      await wrapperTest.setProps({ value : 25 });
      await nextTick();

      expect(wrapperTest.vm.percentValue).toBe(50);
      await wrapperTest.setProps({ value : 50 });

      await nextTick();
      expect(wrapperTest.vm.percentValue).toBe(100);
    });
  });

  it('over max', async () => {
    const wrapperTest = mount(DlUiProgressBar,
      {
        propsData : {
          min   : 0,
          max   : 10,
          value : 0
        }
      });
    await wrapperTest.setProps({ value : 11 });
    await nextTick();
    expect(wrapperTest.vm.percentValue).toBe(100);
  });

  it('sub min max', async () => {
    const wrapperTest = mount(DlUiProgressBar,
      {
        propsData : {
          min   : 5,
          max   : 10,
          value : 0
        }
      });
    await wrapperTest.setProps({ value : 4 });
    await nextTick();
    expect(wrapperTest.vm.percentValue).toBe(0);
  });
});
