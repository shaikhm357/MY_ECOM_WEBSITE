import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Elon Musk",
    email: "elon@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "sundar pichai",
    email: "sundar@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
