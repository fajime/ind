import { notification } from '../../ant-modules';
import * as actions from '../../models';
import { getData } from '../../utils/http';

export const login = (name: string, remember: boolean): actions.LOGIN_ACTION => ({
  type: actions.LOGIN,
  payload: {
    name,
    remember
  }
});

export const logout = (): actions.LOGOUT_ACTION => ({
  type: actions.LOGOUT
});

export const addUsers = (users: any): actions.ADD_USERS_ACTION => ({
  type: actions.ADD_USERS,
  payload: users
});

export const loadUsers = (): any => (dispatch: any) => {
  getData('https://jsonplaceholder.typicode.com/users')
    .then((data: any) => {
      const users = data.map((user: any) => {
        const { email, id, name, phone, username, website } = user;
        return {
          id,
          name,
          email,
          phone,
          username,
          website
        };
      });
      dispatch(addUsers(users));
    })
    .catch((error: any) => {
      notification.open({
        message: `Ha ocurrido el siguiente error durante la petición: ${error}`,
        description: 'Inténtelo de nuevo...',
        onClick: () => {
          console.log('Notification Clicked!');
        }
      });
    });
};
export const addPosts = (posts: any): actions.ADD_POSTS_ACTION => ({
  type: actions.ADD_POSTS,
  payload: posts
});
export const loadPosts = (): any => (dispatch: any) => {
  getData('https://jsonplaceholder.typicode.com/posts')
    .then((data: any) => {
      const posts = data.map((post: any) => {
        const { userId, id, title, body } = post;
        return {
          userId,
          id,
          title: body.slice(0, title.length / 2),
          body: body.slice(0, body.length / 4)
        };
      });
      dispatch(addPosts(posts));
    })
    .catch((error: any) => {
      notification.open({
        message: `Ha ocurrido el siguiente error durante la petición: ${error}`,
        description: 'Inténtelo de nuevo...',
        onClick: () => {
          console.log('Notification Clicked!');
        }
      });
    });
};
