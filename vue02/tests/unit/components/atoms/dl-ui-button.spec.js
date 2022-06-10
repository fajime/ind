import { mount } from '@vue/test-utils';
import DlUiButton from '../../../../src/components/atoms/dl-ui-button/index.vue';

describe('dl-ui-button', () => {

  const wrapper = mount(DlUiButton);

  it('Component Name', () => expect(DlUiButton.name).toBe('dl-ui-button'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a button', () => {
    expect(wrapper.find('button').exists).toBeTruthy();
  });

  it('slot content', () => {
    const wrapperTest = mount(DlUiButton, { slots : { default : '<div class="fake-msg"></div>' } });
    const div = wrapperTest.find('div');
    expect(div.findAll('.fake-msg').length).toBe(1);
  });

  it('check icons', async () => {
    const wrapperTest = mount(DlUiButton);
    await wrapperTest.setProps({ loading : true });
    const children = wrapperTest.findAllComponents('.dl-ui-button--icon');
    expect(children.length).toBe(1);
    expect(children[0].props().id).toBe('dl-ids-icon-loading-filled');
    await wrapperTest.setProps({ loading : false });
    await wrapperTest.setProps({ leftIcon : 'fake-id' });
    await wrapperTest.setProps({ rightIcon : 'fake-id2' });
    const children2 = wrapperTest.findAllComponents('.dl-ui-button--icon');
    expect(children2.length).toBe(2);
    expect(children2[0].props().id).toBe('fake-id');
    expect(children2[1].props().id).toBe('fake-id2');
    await wrapperTest.setProps({ leftIcon : undefined });
    await wrapperTest.setProps({ rightIcon : undefined });
    const children3 = wrapperTest.findAllComponents('.dl-ui-button--icon');
    expect(children3[0]).toBeUndefined();
    expect(children3[1]).toBeUndefined();
  });

  describe('watch', () => {
    it('disable', async () => {
      const stub = jest.fn();
      const wrapperTest = mount(DlUiButton);
      wrapperTest.vm.setDisabledClass = stub;
      await wrapperTest.setProps({ disabled : true });
      expect(stub).toHaveBeenCalled();
    });

    it('loading', async () => {
      const stub = jest.fn();
      const wrapperTest = mount(DlUiButton);
      wrapperTest.vm.setLoadingClass = stub;
      await wrapperTest.setProps({ loading : true });
      expect(stub).toHaveBeenCalled();
    });
  });

  describe('methods', () => {

    it('init', () => {
      const stub = jest.fn();
      const stub2 = jest.fn();
      const wrapperTest = mount(DlUiButton);
      wrapperTest.vm.setDisabledClass = stub;
      wrapperTest.vm.setLoadingClass = stub2;
      wrapperTest.vm.init();
      expect(stub).toHaveBeenCalled();
      expect(stub2).toHaveBeenCalled();
    });

    it('setDisableClass', async () => {
      const wrapperTest = mount(DlUiButton);
      expect(wrapperTest.classes().length).toBe(1);
      await wrapperTest.setProps({ disabled : true });
      expect(wrapperTest.classes().length).toBe(2);
      expect(wrapperTest.classes()).toContain('dl-ui-button');
      expect(wrapperTest.classes()).toContain('dl-ui-button--disabled');
      await wrapperTest.setProps({ disabled : false });
      expect(wrapperTest.classes().length).toBe(1);
      expect(wrapperTest.classes()).not.toContain('dl-ui-button--disabled');
      expect(wrapperTest.classes()).toContain('dl-ui-button');
    });

    it('setLoadingClass', async () => {
      const wrapperTest = mount(DlUiButton);
      expect(wrapperTest.classes().length).toBe(1);
      await wrapperTest.setProps({ loading : true });
      expect(wrapperTest.classes().length).toBe(2);
      expect(wrapperTest.classes()).toContain('dl-ui-button');
      expect(wrapperTest.classes()).toContain('dl-ui-button--loading');
      await wrapperTest.setProps({ loading : false });
      expect(wrapperTest.classes().length).toBe(1);
      expect(wrapperTest.classes()).not.toContain('dl-ui-button--loading');
      expect(wrapperTest.classes()).toContain('dl-ui-button');
    });

    describe('onClick', () => {
      it('button emit "clicked"', () => {
        const event = {};
        const wrapperTest = mount(DlUiButton);
        expect(wrapperTest.props.once).toBeFalsy();
        wrapperTest.vm.onClick(event);
        expect(wrapperTest.emitted()).toHaveProperty('clicked');
      });

      jest.useFakeTimers();

      it('button raise event after timeout if onceTime is active', () => {
        const event = {};
        const wrapperTest = mount(DlUiButton, {
          props : {
            once     : true,
            onceTime : 2000
          }
        });
        expect(wrapperTest.vm.onceInProcess).toBeFalsy();
        wrapperTest.vm.onClick(event);
        expect(wrapperTest.emitted()).toHaveProperty('clicked');
        expect(wrapperTest.vm.onceInProcess).toBeTruthy();
        jest.runAllTimers();
      });

      it('button not raise event before timeout not ends if onceTime is active', () => {
        const event = {};
        const wrapperTest = mount(DlUiButton, {
          props : {
            once     : true,
            onceTime : 5000
          }
        });
        wrapperTest.vm.onceInProcess = true;
        wrapperTest.vm.onClick(event);
        expect(wrapperTest.emitted()).not.toHaveProperty('clicked');
      });
    });
  });
});
