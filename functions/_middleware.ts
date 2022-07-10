const cookies: PagesFunction<{}> = async ({ request, next }) => {
    const response = await next();
    response.headers.set('X-Hello', 'Hello from functions Middleware!');
    return response;
};

export const onRequest = [cookies];