import 'next';

declare module 'next' {
    export type PageProps<
        P extends Record<string, string | string[]> = Record<string, string | string[]>,
        S extends Record<string, string | string[]> = Record<string, string | string[]>
    > = {
        params: P;
        searchParams: S;
    };
}