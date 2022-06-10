import { mount } from '@vue/test-utils';
import DlUiIconsSet from '../../../../src/components/atoms/dl-ui-icons-set/index.vue';

describe('dl-ui-icon', () => {

  const wrapper = mount(DlUiIconsSet);

  it('Component Name', () => expect(DlUiIconsSet.name).toBe('dl-ui-icons-set'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
