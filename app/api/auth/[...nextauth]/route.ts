import NextAuth, { Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database"
import User from '@models/user'

export interface UserSession extends Session {
    user?: {
        id?: string | null
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

function generateUniqueUsername(name: string | undefined): string {
    if (!name) {
        throw new Error('Name is required to generate a username')
    }

    // Remove spaces and convert to lowercase
    let username = name?.replace(/\s+/g, '').toLowerCase();

    // Append a random number to ensure uniqueness
    username += Math.floor(Math.random() * 1000);

    return username;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    callbacks: {
        async signIn({ profile }) {
            try {
                await connectToDB();

                if (!profile) {
                    throw new Error('Profile data is missing!');
                }

                // Check if the user already exists
                const existingUser = await User.findOne({
                    email: profile.email
                })

                console.log("existing user: ", existingUser);

                if (!existingUser) {
                    // If the user does not exist, create a new one
                    const username = generateUniqueUsername(profile.name)
                    await User.create({
                        email: profile.email,
                        username,
                        image: profile.image
                    })
                    console.log('New user created!')
                }

                return true
            } catch (error: any) {
                console.error('Error during sign-in: ', error?.message, '\n', error);
                return false
            }
        },

        async session({ session }: { session: UserSession }) {
            if (!session.user) {
                throw new Error('Session user data missing')
            }

            const sessionUser = await User.findOne({
                email: session.user?.email
            })

            if (!sessionUser) {
                throw new Error('Session user missing!')
            }

            session.user.id = sessionUser._id.toString()

            return session
        }
    }
})

export { handler as GET, handler as POST }