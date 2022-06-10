import { mount } from '@vue/test-utils';
import randomIdMixin from '../../../../src/mixins/randomId';
import DlUiCheckbox from '../../../../src/components/atoms/dl-ui-checkbox/index.vue';

describe('dl-ui-checkbox', () => {
  randomIdMixin.methods.createRandomId = () => 'random-id';
  const wrapper = mount(DlUiCheckbox);

  it('Component Name', () => expect(DlUiCheckbox.name).toBe('dl-ui-checkbox'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has input', () => {
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('check icons', () => {
    const wrapperTest = mount(DlUiCheckbox);

    const children = wrapperTest.findAllComponents('.dl-ui-checkbox__icon');
    expect(children.length).toBe(1);
    expect(children[0].props().id).toBe('dl-ids-icon-check-select');
  });

  describe('hasLabelSlot', () => {
    it('with content', () => {
      const wrapperTest = mount(DlUiCheckbox, {
        slots : {
          default : 'fakeContent'
        }
      });
      const value = wrapperTest.vm.hasLabelSlot;
      expect(value).toBeTruthy();
    });

    it('no content', () => {
      const wrapperTest = mount(DlUiCheckbox);
      const value = wrapperTest.vm.hasLabelSlot;
      expect(value).toBeFalsy();
    });
  });
});

describe('computed', () => {

  describe('containerClass', () => {

    it('Computed keys', () => {
      const wrapperTest = mount(DlUiCheckbox);
      const value = wrapperTest.vm.containerClass[0];
      expect(value).toBeInstanceOf(Object);
      expect(Object.keys(value).length).toBe(5);
      expect(Object.keys(value).includes('dl-ui-checkbox--active')).toBeTruthy;
      expect(Object.keys(value).includes('dl-ui-checkbox--focus')).toBeTruthy;
      expect(Object.keys(value).includes('dl-ui-checkbox--indet')).toBeTruthy;
      expect(Object.keys(value).includes('dl-ui-checkbox--disabled')).toBeTruthy;
      expect(Object.keys(value).includes('dl-ui-checkbox--label-left')).toBeTruthy;

    });

  });
});

describe('watch', () => {
  it('icon - no indeterminate', async () => {
    const wrapperTest = mount(DlUiCheckbox);
    wrapperTest.setProps({ indeterminate : false });
    wrapperTest.setProps({ icon : 'fakeIcon' });
    await wrapperTest.vm.$nextTick();
    expect(wrapperTest.vm.$data.iconShown).toBe('fakeIcon');
  });

  it('icon - indeterminate', async () => {
    const wrapperTest = mount(DlUiCheckbox);
    wrapperTest.setProps({ indeterminate : true });
    wrapperTest.setData({ indet : true });
    wrapperTest.setProps({ icon : 'fakeIcon' });
    await wrapperTest.vm.$nextTick();
    expect(wrapperTest.vm.$data.iconShown).not.toBe('fakeIcon');
    expect(wrapperTest.vm.$data.iconShown).toBe('dl-ids-icon-check-indet');
  });

  it('indeterminate', async () => {
    const stub = jest.fn();
    const wrapperTest = mount(DlUiCheckbox);
    wrapperTest.vm.setIndeterminateStatus = stub;
    wrapperTest.setProps({ indeterminate : true });
    await wrapperTest.vm.$nextTick();
    expect(stub).toHaveBeenCalled();
  });
});

describe('methods', () => {
  it('onChangeValue', async () => {
    const wrapperTest = mount(DlUiCheckbox);
    wrapperTest.vm.onChangeValue({ target : { checked : 'fake' } });
    await wrapperTest.vm.$nextTick();
    expect(wrapperTest.emitted()).toHaveProperty('update:modelValue');
    expect(wrapperTest.emitted('update:modelValue')[0][0]).toBe('fake');
  });

  it('onFocus', async () => {
    const wrapperTest = mount(DlUiCheckbox);
    wrapperTest.vm.onFocus('fake');
    await wrapperTest.vm.$nextTick();
    expect(wrapperTest.vm.$data.focused).toBeTruthy();
    expect(wrapperTest.emitted()).toHaveProperty('focus');
    expect(wrapperTest.emitted('focus')[0][0]).toBe('fake');
  });

  it('onBlur', async () => {
    const wrapperTest = mount(DlUiCheckbox);
    wrapperTest.vm.onBlur();
    await wrapperTest.vm.$nextTick();
    expect(wrapperTest.vm.$data.focused).toBeFalsy();
  });

  it('setIndeterminateStatus - indeterminate', async () => {
    const wrapperTest = mount(DlUiCheckbox);
    wrapperTest.setData({ iconShown : 'fakeIcon', indet : false });
    wrapperTest.setProps({ indeterminate : true, indeterminateIcon : 'fakeIcon2' });
    await wrapperTest.vm.$nextTick();
    wrapperTest.vm.setIndeterminateStatus();
    expect(wrapperTest.vm.$data.iconShown).toBe('fakeIcon2');
    expect(wrapperTest.vm.$data.indet).toBeTruthy();
  });

  it('setIndeterminateStatus - no indeterminate', async () => {
    jest.useFakeTimers();
    const wrapperTest = mount(DlUiCheckbox);
    wrapperTest.setData({ iconShown : 'fakeIcon', indet : false });
    wrapperTest.setProps({ indeterminate : false, indeterminateIcon : 'fakeIcon2' });
    await wrapperTest.vm.$nextTick();
    wrapperTest.vm.setIndeterminateStatus();
    jest.runAllTimers();
    expect(wrapperTest.vm.$data.iconShown).toBe('dl-ids-icon-check-select');
    expect(wrapperTest.vm.$data.indet).toBeFalsy();
  });
});

