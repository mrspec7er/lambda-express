import { User } from "./user.model";

const userService = {
  register: async function (
    email: string,
    password: string,
    role: string,
    name: string,
    status: boolean
  ) {
    return await User.create({
      name,
      email,
      password,
      role,
      status,
      publishedCount: 0,
    });
  },

  getAll: async function () {
    const user = await User.find();
    return user;
  },

  publishedCount: async function (
    status: "PUBLISH" | "TAKE_DOWN",
    userId: string
  ) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Cannot find user");
    }

    if (status === "PUBLISH") {
      await User.updateOne(
        { _id: userId },
        { $set: { publishedCount: user?.publishedCount + 1 } }
      );
    }
  },
};
export default userService;
