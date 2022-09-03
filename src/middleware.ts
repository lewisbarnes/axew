import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const slug = request.nextUrl.pathname.split('/').pop();

	const shortLink = await fetch(`${request.nextUrl.origin}/api/url/get/${slug}`);

	if(shortLink.status === 404) {
		return NextResponse.redirect(request.nextUrl.origin);
	}
	const data = await shortLink.json();

	if(data?.url) {
		return NextResponse.redirect(data.url);
	}
}

export const config = {
	matcher: ["/s/:slug*"],
}