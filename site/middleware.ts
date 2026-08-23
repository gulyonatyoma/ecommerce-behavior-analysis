import { NextRequest, NextResponse } from "next/server";

const unauthorized = () =>
  new NextResponse("Требуется пароль для просмотра сайта.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Kaspi Analytics Lab", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });

export function middleware(request: NextRequest) {
  const expectedUsername = process.env.SITE_USERNAME ?? "guest";
  const expectedPassword = process.env.SITE_PASSWORD;

  if (!expectedPassword) {
    return new NextResponse("Пароль сайта не настроен.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return unauthorized();
  }

  try {
    const credentials = atob(authorization.slice(6));
    const separator = credentials.indexOf(":");
    const username = credentials.slice(0, separator);
    const password = credentials.slice(separator + 1);

    if (
      separator === -1 ||
      username !== expectedUsername ||
      password !== expectedPassword
    ) {
      return unauthorized();
    }
  } catch {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
