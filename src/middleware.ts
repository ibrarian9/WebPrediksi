import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export function middleware(req: NextRequest) {

    const token = cookies().get("token")?.value

    if (token) {
        if (req.nextUrl.pathname === "/login") {
            return NextResponse.redirect(new URL("/", req.url))
        }
    } else {
        if (req.nextUrl.pathname !== "/login") {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/data", "/laporan", "/forecasting", "/laporan", "/akun", "/about"]
}