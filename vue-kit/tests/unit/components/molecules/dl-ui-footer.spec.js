import { mount } from '@vue/test-utils';

import DlUiFooter from '../../../../src/components/molecules/dl-ui-footer';

describe('dl-ui-footer', () => {

  const wrapper = mount(DlUiFooter);

  it('Component Name', () => expect(DlUiFooter.name).toBe('dl-ui-footer'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slot content', () => {
    const wrapperTest = mount(DlUiFooter, { slots : { default : '<div class="fake-text"></div>' } });
    const div = wrapperTest.find('div');
    expect(div.findAll('.fake-text').length).toBe(1);
  });

});
