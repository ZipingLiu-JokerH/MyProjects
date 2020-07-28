const request = require("supertest");

const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("should signup a new user", async () => {
    const response = await request(app)
        .post("/users")
        .send({
            name: "jokerH",
            email: "jokertest@gmail.com",
            password: "12345678!"
        })
        .expect(201);

    // assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // assert about the response
    expect(response.body).toMatchObject({
        user: {
            name: "jokerH",
            email: "jokertest@gmail.com"
        },
        token: user.tokens[0].token
    });

    // assert the password is hashed and stored in the database
    expect(user.password).not.toBe("12345678!");
});

test("should login existing user", async () => {
    const response = await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);

    // assert a new token was created because of logging in
    const user = await User.findById(userOne._id);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login noneexistent user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: "notexist@example.com",
            password: "123456789"
        })
        .expect(400);
});

test("should get profile for user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test("should not get profile for unauthenticated user", async () => {
    await request(app).get("/users/me").send().expect(401);
});

test("should delete account for user", async () => {
    await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    // assert this user is actually delete from database
    const user = await User.findById(userOne._id);
    expect(user).toBeNull();
});

test("should not delete account for unauthenticated user", async () => {
    await request(app).delete("/users/me").send().expect(401);
});

test("should upload avatar image", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/profile-pic.jpg")
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should updata valid user fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "xixi"
        })
        .expect(200);
    // assert the name actually changed
    const user = await User.findById(userOneId);
    expect(user.name).toBe("xixi");
});

test("should not updata invalid user fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            _id: "1234"
        })
        .expect(400);
});

// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated
