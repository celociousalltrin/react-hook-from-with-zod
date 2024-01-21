import { z } from "zod";
import { mimickAPiCall } from "./common-function";

const genderVar = ["male", "female", "other"] as const;

const idSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
});

const addressSchema = z.object({
  country: idSchema,
  state: idSchema,
  city: idSchema,
  street: idSchema,
});

type IdsType = z.infer<typeof idSchema>;

const transformids = (data: IdsType) => data.value;

const transformArrayids = (data: IdsType[]) => data.map((o) => o.value);

export const transformString = (data: string) =>
  data && data.toLowerCase().replace(/\s+/g, "_");

export const formSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must have atleast 3 characters")
      .max(10, "name must Have atleast 10 characters"),
    user_name: z
      .string()
      .min(4, "UserName must have atleast 4 characters")
      .max(9, "UserName must Have atleast 9 characters")
      .transform(transformString),
    email: z.string().min(1, "Email is required Field").email(),
    // .refine(
    //   (data) => data.endsWith("@celo.com"),
    //   "Email must end wwith @celo.com"
    // ),
    phone_number: z
      .string()
      .min(1, "Phone number is required")
      .refine((value) => value.length > 4, "Invalid phone number format"),
    password: z
      .string()
      .min(6, "Password must be chaaracter of 8")
      .max(14, "Password must be a character of 14"),
    // .refine((value) => {
    //   const passwordRegex =
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    //   return passwordRegex.test(value);
    // }, "Password must have one uppercase letter, one lowercase letter, one number, and one special character"),
    confirm_password: z.string(),
    gender: z.enum(["male", "female", "other"]),

    //   gender: z.enum(genderVar),
    colors: z
      .array(z.string())
      .min(2, "Atleast needs to sleect 2")
      .max(3, "you can't able to sleect more than 3"),

    userId: idSchema.transform(transformids),
    albumId: idSchema.transform(transformids),

    postsId: z
      .array(idSchema)
      .min(2, "Needs atleast two elements")
      .transform(transformArrayids),

    dob: z.date().transform((val) => val.toISOString()),
    address: addressSchema,
    port_name: z
      .string()
      .min(3, "This si required Field")
      .transform(transformString),
    terms: z.literal(true),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "password must match",
    path: ["confirm_password"],
  });

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case "invalid_type":
      return { message: `It is required ` };
    case "invalid_enum_value":
      return { message: "The enum value must be any one in the option" };
    default:
      return { message: "Needs to select" };
  }
};

z.setErrorMap(customErrorMap);
export type formSchemaType = z.infer<typeof formSchema>;
