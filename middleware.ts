import {withAuth} from 'next-auth/middleware';

export default withAuth({
    pages : {
        signIn : '/'
    }
});

export const config = {
    matcher : [
        `/users/:path*`,
        `/conversations/:path*`
    ]
};

// we don't need to import this file anywhere. create this middleware and leave it as it is .
