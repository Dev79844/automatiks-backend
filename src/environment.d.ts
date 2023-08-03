declare global {
    namespace NodeJS{
        interface ProcessEnv{
            PORT: number,
            DB: string,
            JWT_SECRET: string,
            JWT_EXPIRY:string,
            COOKIE_TIME:number,
            MAIL_USER:string,
            MAIL_PASS:string,
            MAIL_HOST: string,
            MAIL_PORT:number
        }
    }
}

export{}