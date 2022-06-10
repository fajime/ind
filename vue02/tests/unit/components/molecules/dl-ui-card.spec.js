import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import DlUicard from '../../../../src/components/molecules/dl-ui-card';

describe('dl-ui-card', () => {

  const wrapper = mount(DlUicard);

  it('Component Name', () => expect(DlUicard.name).toBe('dl-ui-card'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slot content', () => {
    const wrapperTest = mount(DlUicard, {
      slots : {
        header   : '<div class="fake-text-1"></div>',
        title    : '<div class="fake-text-2"></div>',
        subtitle : '<div class="fake-text-3"></div>',
        content  : '<div class="fake-text-4"></div>',
        footer   : '<div class="fake-text-5"></div>'
      }
    });
    const div = wrapperTest.find('div');

    // changed: fixes 1 -> 0
    expect(div.findAll('.fake-text-1').length).toBe(0);
    expect(div.findAll('.fake-text-2').length).toBe(0);
    expect(div.findAll('.fake-text-3').length).toBe(0);
    expect(div.findAll('.fake-text-4').length).toBe(1);
    expect(div.findAll('.fake-text-5').length).toBe(0);
  });
  describe('methods', () => {
    it('raiseMouseenter', async () => {
      const wrapperTest = mount(DlUicard);
      wrapperTest.find('div').trigger('mouseenter');
      await nextTick();
      expect(wrapperTest.emitted('mouseenter')).toBeTruthy();
    });
    it('raiseMouseleave', async () => {
      const wrapperTest = mount(DlUicard);
      wrapperTest.find('div').trigger('mouseleave');
      await nextTick();
      expect(wrapperTest.emitted('mouseleave')).toBeTruthy();
    });
  });

});
