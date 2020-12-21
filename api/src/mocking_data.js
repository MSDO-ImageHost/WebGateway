const jwt = require("jwt-simple");
const JWT_SECRET = "secret";

const TEST_USERS = [];
const TEST_COMMENTS = [];
const TEST_POSTS = [];
const TEST_IMAGES = [];

const JWT_ENCODE = (payload) => {
    payload.iat = Math.floor(Date.now() / 1000);
    payload.exp = Date.UTC(2021, 0, 23) / 1000;
    return jwt.encode(payload, JWT_SECRET);
};

const JWT_DECODE = (token) => {
    //TODO Check the JWT is actually valid
    return jwt.decode(token, JWT_SECRET)
};


const ADD_POST = (newPostData) => {
    newPost = {
        post_id: TEST_POSTS.length,
        author_id: newPostData.author_id,
        created_at: Date.now(),
        header: {
            author_id: newPostData.author_id,
            created_at: Date.now(),
            data: newPostData.header,
        },
        body: {
            author_id: newPostData.author_id,
            created_at: Date.now(),
            data: newPostData.body,
        },
        tags: newPostData.tags,
        image_url: newPostData.image_data,
    }
    TEST_POSTS.push(newPost)
    return newPost
}

module.exports = {TEST_POSTS, TEST_COMMENTS, JWT_ENCODE, JWT_DECODE, ADD_POST, JWT_SECRET, TEST_USERS, TEST_IMAGES};