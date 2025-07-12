export interface SendMailOptions {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}
export declare function sendMail(options: SendMailOptions): Promise<void>;
