import { mount } from '@vue/test-utils';
import DlUiActionButton from '../../../../src/components/atoms/dl-ui-action-button/index.vue';

describe('dl-ui-button', () => {

  const wrapper = mount(DlUiActionButton);

  it('Component Name', () => expect(DlUiActionButton.name).toBe('dl-ui-action-button'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a button', () => {
    expect(wrapper.find('button').exists).toBeTruthy();
  });

  it('check icons', async () => {
    const wrapperTest = mount(DlUiActionButton, {
      props : {
        icon : 'dl-ui-icon-user-single-filled'
      }
    });
    await wrapperTest.setProps({ loading : true });
    const children = wrapperTest.findAllComponents('.dl-ui-action-button__icon');
    expect(children.length).toBe(1);
    expect(children[0].props().id).toBe('dl-ids-icon-loading-filled');
    await wrapperTest.setProps({ loading : false });
    await wrapperTest.setProps({ icon : 'dl-ui-icon-user-single-outlined' });
    expect(wrapperTest.vm.iconFilled).toBe('dl-ui-icon-user-single-filled');
    const children2 = wrapperTest.findAllComponents('.dl-ui-action-button__icon');
    expect(children2.length).toBe(1);
    expect(children2[0].props().id).toBe('dl-ui-icon-user-single-outlined');
    await wrapperTest.setProps({ showIconFilled : true });
    const children3 = wrapperTest.findAllComponents('.dl-ui-action-button__icon');
    expect(children3.length).toBe(2);
    expect(children3[0].props().id).toBe('dl-ui-icon-user-single-outlined');
    expect(children3[1].props().id).toBe('dl-ui-icon-user-single-filled');
    await wrapperTest.setProps({ icon : 'dl-ui-icon-user-single-filled' });
    expect(wrapperTest.vm.iconFilled).toBe('dl-ui-icon-user-single-filled');
    await wrapperTest.setProps({ icon : '' });
    await wrapperTest.setProps({ showIconFilled : false });
    const children4 = wrapperTest.findAllComponents('.dl-ui-action-button__icon');
    expect(children4[0].props().id).toBe('');
  });

  describe('watch', () => {
    it('disable', async () => {
      const stub = jest.fn();
      const wrapperTest = mount(DlUiActionButton);
      wrapperTest.vm.setDisabledClass = stub;
      await wrapperTest.setProps({ disabled : true });
      expect(stub).toHaveBeenCalled();
    });

    it('loading', async () => {
      const stub = jest.fn();
      const wrapperTest = mount(DlUiActionButton);
      wrapperTest.vm.setLoadingClass = stub;
      await wrapperTest.setProps({ loading : true });
      expect(stub).toHaveBeenCalled();
    });
  });

  describe('methods', () => {

    it('init', () => {
      const stub = jest.fn();
      const stub2 = jest.fn();
      const wrapperTest = mount(DlUiActionButton);
      wrapperTest.vm.setDisabledClass = stub;
      wrapperTest.vm.setLoadingClass = stub2;
      wrapperTest.vm.init();
      expect(stub).toHaveBeenCalled();
      expect(stub2).toHaveBeenCalled();
    });

    it('setDisableClass', async () => {
      const wrapperTest = mount(DlUiActionButton);
      await wrapperTest.setProps({ disabled : true });
      expect(wrapperTest.element.classList.length).toBe(2);
      expect(wrapperTest.element.classList[0]).toEqual('dl-ui-action-button');
      expect(wrapperTest.element.classList[1]).toEqual('dl-ui-action-button--disabled');
      await wrapperTest.setProps({ disabled : false });
      expect(wrapperTest.element.classList.length).toBe(1);
      expect(wrapperTest.element.classList[0]).toEqual('dl-ui-action-button');
    });

    it('setLoadingClass', async () => {
      const wrapperTest = mount(DlUiActionButton);
      await wrapperTest.setProps({ loading : true });
      expect(wrapperTest.element.classList.length).toBe(2);
      expect(wrapperTest.element.classList[0]).toEqual('dl-ui-action-button');
      expect(wrapperTest.element.classList[1]).toEqual('dl-ui-action-button--loading');
      await wrapperTest.setProps({ loading : false });
      expect(wrapperTest.element.classList.length).toBe(1);
      expect(wrapperTest.element.classList[0]).toEqual('dl-ui-action-button');
    });

    describe('onClick', () => {
      it('button emit "clicked"', () => {
        const event = {};
        const wrapperTest = mount(DlUiActionButton);
        expect(wrapperTest.props.once).toBeFalsy();
        wrapperTest.vm.onClick(event);
        expect(wrapperTest.emitted()).toHaveProperty('clicked');
      });

      jest.useFakeTimers();

      it('button raise event after timeout if onceTime is active', () => {
        const event = {};
        const wrapperTest = mount(DlUiActionButton, {
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
        const wrapperTest = mount(DlUiActionButton, {
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
