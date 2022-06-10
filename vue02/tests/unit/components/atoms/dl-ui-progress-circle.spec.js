import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import DlUiProgressCircle from '../../../../src/components/atoms/dl-ui-progress-circle/index.vue';

describe('dl-ui-progress-circle', () => {

  const wrapper = mount(DlUiProgressCircle);

  it('Component Name', () => expect(DlUiProgressCircle.name).toBe('dl-ui-progress-circle'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slot content', () => {
    const wrapperTest = mount(DlUiProgressCircle, { slots : { default : '<div class="fake-msg"></div>' } });
    const div = wrapperTest.find('div');
    expect(div.findAll('.fake-msg').length).toBe(1);
  });

  describe('percentValue', () => {
    it('value', async () => {
      const wrapperTest = mount(DlUiProgressCircle,
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
    const wrapperTest = mount(DlUiProgressCircle,
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
    const wrapperTest = mount(DlUiProgressCircle,
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
