import 'next';

declare module 'next' {
    type PageProps<P = object, S = object> = {
        params: P;
        searchParams: S;
    };
}