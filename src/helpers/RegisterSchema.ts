import * as z from "zod"
export  const schema = z
  .object({
    name: z.string().nonempty("Name is Required"),

    username: z.string().nonempty("Username Is Required"),
    email: z
      .string()
      .nonempty("Email is Required")
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"),

    dateOfBirth: z.string().nonempty("Date Is Required").refine((dobStr) => {
      const dob=new Date(dobStr)
        const now = new Date();
        let age = now.getFullYear() - dob.getFullYear();
        const monthDiff = now.getMonth() - dob.getMonth();
        const dayDiff = now.getDate() - dob.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }
        return age >= 18;
      }, "Registered user must be at least 18 years old")
      .refine((dobStr) => {
        const dob=new Date(dobStr)
        const now = new Date();
        let age = now.getFullYear() - dob.getFullYear();
        const monthDiff = now.getMonth() - dob.getMonth();
        const dayDiff = now.getDate() - dob.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }
        return age <= 75;
      }, "Registered user must be less than 75 years old"),

    gender: z.string().nonempty("Gender is required"),
    password: z
      .string()
      .nonempty("Password Is Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password should contain capital, small, number and special char",
      ),

    rePassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });