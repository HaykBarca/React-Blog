import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    const posts = getState().posts;
    const userIds = [];
    posts.map(post => {
        if (!userIds.includes(post.userId)) {
            return userIds.push(post.userId);
        }
        return false;
    });

    userIds.map(id => {
        return dispatch(fetchUser(id));
    });
}

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data });
}

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
}