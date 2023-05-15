import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        name,
        password
    } = body;

    if (!email || !name || !password) {
        return new NextResponse('Missing info', { status: 400 });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user) return new NextResponse('This email has already been taken', { status: 400 })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json(newUser);
    } catch (error: any) {
        return new NextResponse(`Internal Error`, { status: 500 })

    }
}