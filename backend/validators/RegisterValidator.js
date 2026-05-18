import { z } from "zod";

const registerValidator = z.object({

    userName: z
        .string()
        .min(5, "Username must be at least 5 characters"),

    email: z
        .string()
        .email("Invalid email format"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
});

export default registerValidator;