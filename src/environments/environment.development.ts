export const environment = {
    baseUrl: "http://localhost:5253",
    buildUrl: (v: string) => (new URL(v, environment.baseUrl)).toString()
};
