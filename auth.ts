import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import User from "./app/models/user.model";
import connectDb from "./app/lib/db";
import bcrypt from "bcryptjs";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
            email: { label: "email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials,request) {

                await connectDb();
                const email=credentials.email;
                const password=credentials.password as string;
                const user=await User.findOne({email});
                if (!user){
                    throw new Error("No user found with this email");
                }
                const isMatched=await bcrypt.compare(password,user.password);
                if (!isMatched){
                    throw new Error("Incorrect password");
                }
                return {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
            
    }}

            
    })
  ],
});