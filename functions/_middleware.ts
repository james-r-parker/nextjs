const cookies: PagesFunction<{}> = async ({ request, next }) => {
    const response = await next();

    const cookies = request.headers.get("Cookie") || '';

    if (!cookies.includes("P2G.Id=")) {
        const d = new Date();
        d.setFullYear(d.getFullYear() + 1);
        response.headers.set('Set-Cookie', `P2G.Id=${Math.random().toString(16).substring(2, 32)}; Secure; HttpOnly; Expires=${d.toUTCString()}`);
    }

    if (!cookies.includes("P2G.Session.Id=")) {
        response.headers.set('Set-Cookie', `P2G.Session.Id=${Math.random().toString(16).substring(2, 32)}; Secure;`);
    }

    return response;
};

export const onRequest = [cookies];