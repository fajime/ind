import { mount } from '@vue/test-utils';
import randomIdMixin from '../../../../src/mixins/randomId';

import DlUiStepper from '../../../../src/components/molecules/dl-ui-stepper';

describe('dl-ui-stepper', () => {

  randomIdMixin.methods.createRandomId = () => 'random-id';
  const wrapper = mount(DlUiStepper);

  it('Component Name', () => expect(DlUiStepper.name).toBe('dl-ui-stepper'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('props', () => {
    it('stepsToPaint - startPointCompleted == true ', async () => {
      const wrapperTest = mount(DlUiStepper);
      await wrapperTest.setProps( { startPointCompleted : true, modelValue : 2, steps : 5 });
      expect(wrapperTest.vm.stepsToPaint).toEqual(6);
    });

    it('stepsToPaint - startPointCompleted == false ', async () => {
      const wrapperTest = mount(DlUiStepper);
      await wrapperTest.setProps( { startPointCompleted : false, modelValue : 2, steps : 5 });
      expect(wrapperTest.vm.stepsToPaint).toEqual(5);
    });

    it('stepActive - startPointCompleted == true ', async () => {
      const wrapperTest = mount(DlUiStepper);
      await wrapperTest.setProps( { startPointCompleted : true, modelValue : 2, steps : 5 });
      expect(wrapperTest.vm.stepActive).toEqual(3);
    });

    it('stepActive - startPointCompleted == false ', async () => {
      const wrapperTest = mount(DlUiStepper);
      await wrapperTest.setProps( { startPointCompleted : false, modelValue : 2, steps : 5 });
      expect(wrapperTest.vm.stepActive).toEqual(2);
    });
  });
});
