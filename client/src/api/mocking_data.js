

const TEST_COMMENTS = [
    {
       comment_id:1,
       post_id:5,
       created_at:"2020-12-16 19:35:55",
       content:"im another one"
    },
    {
       comment_id:2,
       post_id:5,
       created_at:"2020-12-16 19:35:59",
       content:"im another one"
    },
    {
       comment_id:3,
       post_id:5,
       created_at:"2020-12-16 19:36:14",
       content:"imma fking yeet"
    },
    {
       comment_id:4,
       post_id:5,
       created_at:"2020-12-16 19:38:54",
       content:"imma fking yeet"
    }
]

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
]


export { TEST_POSTS, TEST_COMMENTS }