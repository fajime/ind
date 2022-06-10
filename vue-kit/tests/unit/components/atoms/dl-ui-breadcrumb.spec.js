import { mount } from '@vue/test-utils';
import DlUiBreadcrumb from '../../../../src/components/atoms/dl-ui-breadcrumb/index.vue';
import { useRoute } from 'vue-router';

jest.mock('vue-router', () => ({
  useRoute : jest.fn()

}));

describe('dl-ui-breadcrumb', () => {

  useRoute.mockImplementationOnce(() => ({
    params : {
      id : 1
    }
  }));

  const wrapper = mount(DlUiBreadcrumb, {
    global : {
      stubs : ['router-link']
    }
  }
  );

  it('Component Name', () => expect(DlUiBreadcrumb.name).toBe('dl-ui-breadcrumb'));

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a nav', () => {
    expect(wrapper.find('nav').exists()).toBe(true);
  });

  it('has a router-link component', () => {
    expect(wrapper.findComponent({ name : 'router-link' }).exists()).toBe(true);
  });

  describe('methods', () => {
    it('setActiveLink initial', () => {
      const stub = jest.fn();
      const wrapperLink = mount(DlUiBreadcrumb, {
        global : {
          stubs : ['router-link']
        }
      });
      wrapperLink.vm.setActiveLink({ target : { classList : { add : stub } } });
      expect(stub).toHaveBeenCalledWith('dl-ui-breadcrumb__menuitem-text--active');

    });

    it('setActiveLink previus link', () => {
      const wrapperLink = mount(DlUiBreadcrumb, {
        global : {
          stubs : ['router-link']
        }
      });
      const stub = jest.fn();
      const stub2 = jest.fn(() => ({ classList : { remove : stub } }));
      const stub3 = jest.fn();
      const backUp = document.querySelector;
      document.querySelector = stub2;
      wrapper.element.classList.add('dl-ui-breadcrumb__menuitem-text--active');
      wrapperLink.vm.setActiveLink({ target : { classList : { add : stub3 } } });
      expect(stub).toHaveBeenCalledWith('dl-ui-breadcrumb__menuitem-text--active');
      expect(stub3).toHaveBeenCalledWith('dl-ui-breadcrumb__menuitem-text--active');
      document.querySelector = backUp;
    });

    it('isLastItem', () => {
      const wrapperLink = mount(DlUiBreadcrumb, {
        global : {
          stubs : ['router-link']
        },
        props : {
          model : [{ to : 'fakeA', item : 'fakeA' }, { to : 'fakeB', item : 'fakeB' }]
        }
      });
      expect(wrapperLink.vm.isLastItem(0)).toBeFalsy;
      expect(wrapperLink.vm.isLastItem(1)).toBeTruthy;
    });
  });
});
