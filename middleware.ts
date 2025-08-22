import { NextResponse, type NextRequest  } from "next/server";

export function middleware(req: NextRequest) {
    // Retreive token...

    // Check if token is valid ...
    /* If invalid */ return NextResponse.redirect(new URL("/login", req.url));

    // Else
    // return NextResponse.next();
}

export const config = {
    matcher: ["/home"]
}