import { mount } from '@vue/test-utils';
import DlUiIcon from '../../../../src/components/atoms/dl-ui-icon/index.vue';

describe('dl-ui-icon', () => {

  const wrapper = mount(DlUiIcon);

  it('Component Name', () => expect(DlUiIcon.name).toBe('dl-ui-icon'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('property title an description ', () => {
    const wrapperTest = mount(DlUiIcon, {
      propsData : {
        title       : 'foo',
        description : 'bar'
      }
    });
    expect(wrapperTest.element.textContent.includes('foo')).toBeTruthy();
    expect(wrapperTest.element.textContent.includes('bar')).toBeTruthy();
  });

});
