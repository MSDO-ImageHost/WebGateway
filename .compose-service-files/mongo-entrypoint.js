const db = connect("mongodb://root:rootroot@localhost:27017/admin");

db = db.getSiblingDB('admin');

db.createUser(
    {
        user: "root",
        pwd: "root",
        roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
    }
)

//db.createUser(
//    {
//        user: "Per",
//        pwd: "Emil",
//        roles: [ { role: "readWrite", db: "posts"} ],
//        passwordDigestor: "server",
//    }
//)