import Users from "./Users";

describe("find()", () => {
  it("should return the user if a user with a matching user id exists", () => {
    const user = Users.find("2725");
    expect(user).toEqual({
      id: "2725",
      username: "hermione",
      password: "granger",
    });
  });

  it("should throw an error if no user is found", () => {
    const fn = () => Users.find("1234");
    expect(fn).toThrow();
  });
});

describe("isValidCredentials()", () => {
  it("should return the user that has the matching username and password", () => {
    const user = Users.findByCredentials("harry", "potter");
    expect(user).toEqual({
      id: "5976",
      username: "harry",
      password: "potter",
    });
  });

  it("should return undefined if no user is found", () => {
    const fn = () => Users.findByCredentials("harry", "nogo");
    expect(fn).toThrow();
  });
});
