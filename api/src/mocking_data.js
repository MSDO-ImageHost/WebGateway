
const jwt = require("jwt-simple");
const JWT_SECRET = "testSecret";


const TEST_COMMENTS = [
    {
        comment_id: 1,
        post_id: 5,
        created_at: "2020-12-16 19:35:55",
        content: "im another one"
    },
    {
        comment_id: 2,
        post_id: 5,
        created_at: "2020-12-16 19:35:59",
        content: "im another one"
    },
    {
        comment_id: 3,
        post_id: 5,
        created_at: "2020-12-16 19:36:14",
        content: "imma fking yeet"
    },
    {
        comment_id: 4,
        post_id: 5,
        created_at: "2020-12-16 19:38:54",
        content: "imma fking yeet"
    }
];

const TEST_POSTS = [
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
    return jwt.decode(token, JWT_SECRET)
};


const ADD_POST = (newPostData) => {
    TEST_POSTS.push({
        post_id: Date.now(),
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

module.exports = {TEST_POSTS, TEST_COMMENTS, JWT_ENCODE, JWT_DECODE, ADD_POST};