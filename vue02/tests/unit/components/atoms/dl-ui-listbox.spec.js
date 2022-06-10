import { mount } from '@vue/test-utils';
import DlUiListbox from '../../../../src/components/atoms/dl-ui-listbox/index.vue';

describe('dl-ui-listbox', () => {

  const wrapper = mount(DlUiListbox);

  it('Component Name', () => expect(DlUiListbox.name).toBe('dl-ui-listbox'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a container', () => {
    expect(wrapper.vm.$refs.container).not.toBeUndefined();
  });

  it('has listbox', () => {
    expect(wrapper.find({ ref : 'list' }));
  });

  it('has an option', () => {
    expect(wrapper.find({ ref : 'option' }));
  });

  it('has a checkbox', async () => {
    wrapper.setProps({ multiple : true });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('dl-ui-checkbox')).toBeTruthy();

  });

  it('check icons', async () => {
    const wrapperTest = mount(DlUiListbox, {
      propsData : {
        options : [
          { name : 'Australia', value : 'AU', leftIcon : '' },
          { name : 'Brazil', value : 'BR' }
        ]
      }
    });
    wrapperTest.setProps({ leftIcon : 'dl-ui-icon-user' });
    wrapperTest.setProps({ rightIcon : 'dl-ui-icon-lab' });
    await wrapperTest.vm.$nextTick();
    expect(wrapper.find('dl-ui-listbox__option-left-icon')).toBeTruthy();
    expect(wrapper.find('dl-ui-listbox__option-right-icon')).toBeTruthy();
    wrapperTest.setProps({ leftIcon : undefined });
    wrapperTest.setProps({ rightIcon : undefined });
    await wrapperTest.vm.$nextTick();
    expect(wrapperTest.vm.$children[0]).toBeUndefined();
    expect(wrapperTest.vm.$children[1]).toBeUndefined();
  });

  describe('methods', () => {
    it('isSelected', () => {
      const wrapperTest = mount(DlUiListbox, {
        propsData : {
          options : [
            { name : 'Australia', value : 'AU', leftIcon : '' },
            { name : 'Brazil', value : 'BR' }
          ],
          value    : ['AU'],
          multiple : true
        }
      });
      const firstOption = wrapperTest.vm.$options.propsData.options[0];
      expect(wrapperTest.vm.isSelected(firstOption)).toBeTruthy();
    });

    it('onOptionSelect', async () => {
      const event = { target : { value : 'fake ' } };
      const wrapperTest = mount(DlUiListbox, {
        propsData : {
          options : [
            { name : 'Australia', value : 'AU', leftIcon : '' },
            { name : 'Brazil', value : 'BR' }
          ],
          multiple : true
        }
      });
      const firstOption = wrapperTest.vm.$options.propsData.options[0];
      wrapperTest.vm.onOptionSelect(event, firstOption);
      wrapperTest.setProps({ value : ['AU'] });
      await wrapperTest.vm.$nextTick();
      expect(wrapperTest.emitted('input')).toBeTruthy();
      wrapperTest.vm.onOptionSelect(event, firstOption);
      wrapperTest.setProps({ multiple : false });
      await wrapperTest.vm.$nextTick();
      wrapperTest.vm.onOptionSelect(event, firstOption);
    });
  });

  describe('computed', () => {

    it('scrollHeight - not mounted', async () => {
      const wrapperTest = mount(DlUiListbox);
      wrapperTest.setData({ isMounted : false });
      await wrapperTest.vm.$nextTick();
      expect(wrapperTest.vm.scrollHeight).toBe('');
    });

    it('scrollHeight - is mounted && no elements', async () => {
      const fn = window.getComputedStyle;
      const stub = jest.fn(() => ({ getPropertyValue : () => 100 }));
      window.getComputedStyle = stub;
      const wrapperTest = mount(DlUiListbox);
      wrapperTest.setData({ isMounted : true });
      await wrapperTest.vm.$nextTick();
      expect(wrapperTest.vm.scrollHeight).toBe('360px');
      window.getComputedStyle = fn;
    });

  });
});
