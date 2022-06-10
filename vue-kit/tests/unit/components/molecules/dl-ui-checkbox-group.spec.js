import { mount } from '@vue/test-utils';
import randomIdMixin from '../../../../src/mixins/randomId';
import DlUiCheckboxGroup from '../../../../src/components/molecules/dl-ui-checkbox-group/index.vue';
import { nextTick } from 'vue';

describe('dl-ui-checkbox-group', () => {
  randomIdMixin.methods.createRandomId = () => 'random-id';
  const wrapper = mount(DlUiCheckboxGroup);

  it('Component Name', () => expect(DlUiCheckboxGroup.name).toBe('dl-ui-checkbox-group'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  describe('watchs', () => {
    it('collapsed', async () => {
      const wrapperTest = mount(DlUiCheckboxGroup);
      await wrapperTest.setProps({ collapsed : true });
      await nextTick();
      expect(wrapperTest.vm.collapsedAux).toBeTruthy();

    });
  });

  describe('methods', () => {
    it('init', () => {
      const stub1 = jest.fn();
      const stub2 = jest.fn();
      const wrapperTest = mount(DlUiCheckboxGroup);
      wrapperTest.vm.setForAttributes = stub1;
      wrapperTest.vm.checkGroupValues = stub2;
      wrapperTest.vm.init();
      expect(stub1).toHaveBeenCalled();
      expect(stub2).toHaveBeenCalled();
    });

    it('setForAttributes - no child', () => {
      const wrapperTest = mount(DlUiCheckboxGroup);
      wrapperTest.vm.setForAttributes();
    });

    it('setForAttributes - child', () => {
      const wrapperTest = mount(DlUiCheckboxGroup, {
        propsData : {
          checkboxes : [
            { name : 'Australia', value : false }
          ]
        }
      });
      wrapperTest.vm.setForAttributes();
    });

    it('changeAllValues - child', () => {
      const wrapperTest = mount(DlUiCheckboxGroup, {
        propsData : {
          checkboxes : [
            { name : 'Australia', value : false }
          ]
        }
      });
      wrapperTest.vm.changeAllValues();
    });

    describe('checkGroupValues', () => {
      it('same value', () => {

        const wrapperTest = mount(DlUiCheckboxGroup, {
          propsData : {
            checkboxes    : [{ value : true }, { value : true }, { value : true }, { value : true }],
            indeterminate : false
          }
        });
        wrapperTest.vm.groupValue = true;
        wrapperTest.vm.checkGroupValues();
        expect(wrapperTest.vm.groupValue).toBeTruthy();
        expect(wrapperTest.vm.indeterminate).toBeFalsy();
        expect(wrapperTest.emitted('group')).toBeTruthy();
      });

      it('different value', () => {
        const wrapperTest = mount(DlUiCheckboxGroup, {
          propsData : {
            checkboxes    : [{ value : true }, { value : true }, { value : false }, { value : false }],
            indeterminate : true
          }
        });
        wrapperTest.vm.groupValue = false;
        wrapperTest.vm.checkGroupValues();
        expect(wrapperTest.vm.groupValue).toBeTruthy();
        expect(wrapperTest.vm.indeterminate).toBeTruthy();
        expect(wrapperTest.emitted('group')).toBeTruthy();
      });
    });

    it('checkboxClicked', () => {
      const wrapperTest = mount(DlUiCheckboxGroup);
      const stub = jest.fn();
      wrapperTest.vm.checkGroupValues = stub;
      wrapperTest.vm.checkboxClicked('a', true);
      expect(stub).toHaveBeenCalled();
      expect(wrapperTest.emitted('input')).toBeTruthy();
    });

  });
});

