import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import DlUiRating from '../../../../src/components/molecules/dl-ui-rating';

describe('dl-ui-rating', () => {

  const wrapper = mount(DlUiRating);

  it('Component Name', () => expect(DlUiRating.name).toBe('dl-ui-rating'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('watch', () => {
    it('disable', async () => {
      const wrapperTest = mount(DlUiRating);
      wrapperTest.element.classList.add('fakeClass');
      await wrapperTest.setProps({ disabled : true });
      await nextTick();

      expect(wrapperTest.element.classList.length).toBe(4);
      expect(wrapperTest.element.classList[1]).toEqual('fakeClass');
      expect(wrapperTest.element.classList[3]).toEqual('fakeClass--disabled');
      await wrapperTest.setProps({ disabled : false });
      await nextTick();

      expect(wrapperTest.element.classList.length).toBe(2);
      expect(wrapperTest.element.classList[1]).toEqual('fakeClass');
    });

    it('readOnly', async () => {
      const wrapperTest = mount(DlUiRating);
      wrapperTest.element.classList.add('fakeClass');
      await wrapperTest.setProps({ readOnly : true });
      await nextTick();

      expect(wrapperTest.element.classList.length).toBe(4);
      expect(wrapperTest.element.classList[1]).toEqual('fakeClass');
      expect(wrapperTest.element.classList[3]).toEqual('fakeClass--readOnly');
      await wrapperTest.setProps({ readOnly : false });
      await nextTick();

      expect(wrapperTest.element.classList.length).toBe(2);
      expect(wrapperTest.element.classList[1]).toEqual('fakeClass');
    });
  });

  describe('methods', () => {
    describe('onStarClick', () => {
      it('readOnly : true, disabled : true', async () => {
        const stub = jest.fn();
        const wrapperTest = mount(DlUiRating);
        await wrapperTest.setProps({ readOnly : true, disabled : true });
        await nextTick();

        wrapperTest.vm.updateModel = stub;
        wrapperTest.vm.onStarClick(undefined, 1);
        expect(stub).not.toHaveBeenCalled();
      });
      it('readOnly : true, disabled : false', async () => {
        const stub = jest.fn();
        const wrapperTest = mount(DlUiRating);
        await wrapperTest.setProps({ readOnly : true, disabled : false });
        await nextTick();

        wrapperTest.vm.updateModel = stub;
        wrapperTest.vm.onStarClick(undefined, 2);
        expect(stub).not.toHaveBeenCalled();
      });
      it('readOnly : false, disabled : true', async () => {
        const stub = jest.fn();
        const wrapperTest = mount(DlUiRating);
        await wrapperTest.setProps({ readOnly : false, disabled : true });
        await nextTick();

        wrapperTest.vm.updateModel = stub;
        wrapperTest.vm.onStarClick(undefined, 3);
        expect(stub).not.toHaveBeenCalled();
      });
      it('readOnly : false, disabled : false', async () => {
        const stub = jest.fn();
        const wrapperTest = mount(DlUiRating);
        await wrapperTest.setProps({ readOnly : false, disabled : false });
        await nextTick();

        wrapperTest.vm.updateModel = stub;
        wrapperTest.vm.onStarClick(undefined, 4);
        expect(stub).toHaveBeenCalled();
      });
    });

    describe('onCancelClick', () => {
      it('readOnly : true, disabled : true', async () => {
        const stub = jest.fn();
        const wrapperTest = mount(DlUiRating);
        await wrapperTest.setProps({ readOnly : true, disabled : true });
        await nextTick();

        wrapperTest.vm.updateModel = stub;
        wrapperTest.vm.onCancelClick(undefined);
        expect(stub).not.toHaveBeenCalled();
      });
      it('readOnly : true, disabled : false', async () => {
        const stub = jest.fn();
        const wrapperTest = mount(DlUiRating);
        await wrapperTest.setProps({ readOnly : true, disabled : false });
        await nextTick();

        wrapperTest.vm.updateModel = stub;
        wrapperTest.vm.onCancelClick(undefined);
        expect(stub).not.toHaveBeenCalled();
      });
      it('readOnly : false, disabled : true', async () => {
        const stub = jest.fn();
        const wrapperTest = mount(DlUiRating);
        await wrapperTest.setProps({ readOnly : false, disabled : true });
        await nextTick();

        wrapperTest.vm.updateModel = stub;
        wrapperTest.vm.onCancelClick(undefined);
        expect(stub).not.toHaveBeenCalled();
      });
      it('readOnly : false, disabled : false', async () => {
        const stub = jest.fn();
        const wrapperTest = mount(DlUiRating);
        await wrapperTest.setProps({ readOnly : false, disabled : false });
        await nextTick();

        wrapperTest.vm.updateModel = stub;
        wrapperTest.vm.onCancelClick(undefined);
        expect(stub).toHaveBeenCalled();
      });
    });

    it('updateModel', () => {
      const wrapperTest = mount(DlUiRating);
      wrapperTest.vm.updateModel();
      expect(wrapperTest.emitted('update:modelValue')).toBeTruthy();
    });
  });
});
