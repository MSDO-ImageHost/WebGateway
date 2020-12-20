const jwt = require("jwt-simple");
const JWT_SECRET = "secret";


const TEST_USERS = [];
const TEST_COMMENTS = [];
const TEST_POSTS = [];

const _TEST_POSTS = [
    {
        post_id: "1",
        author_id: "Jake",
        created_at: "bigbang",
        updated_at: "tomorrow",
        header: {
            author_id: "Jake",
            created_at: "bigbang",
            data: "Adventure Time",
        },
        body: {
            author_id: "Jake",
            created_at: "bigbang",
            data: "This is fine",
        },
        tags: ["fire", "no problem", "it is fine"],
        image_url: "/images/thisisfine.gif",
    },
    {
        post_id: "2",
        author_id: "John",
        created_at: "bigbang",
        updated_at: "tomorrow",
        header: {
            author_id: "John",
            created_at: "bigbang",
            data: "This is a title",
        },
        body: {
            author_id: "John",
            created_at: "bigbang",
            data: "This is fine",
        },
        tags: ["fire", "no problem", "it is fine"],
        image_url: "/images/thisisfine.gif",
    }
];

const JWT_ENCODE = (payload) => {
    payload.iat = Date.now();
    payload.exp = Date.UTC(2021, 0, 23);
    return jwt.encode(payload, JWT_SECRET);
};

const JWT_DECODE = (token) => {
    //TODO Check the JWT is actually valid
    return jwt.decode(token, JWT_SECRET)
};


const ADD_POST = (newPostData) => {
    TEST_POSTS.push({
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
    })
}

module.exports = {TEST_POSTS, TEST_COMMENTS, JWT_ENCODE, JWT_DECODE, ADD_POST, JWT_SECRET, TEST_USERS};