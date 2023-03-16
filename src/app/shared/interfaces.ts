

export class enqueryusermodel {
    public name: string;
    public lookingfor: string;
    public mobileno: string;
    public emailid: string;
    public city: string;

    constructor(
        name: string,
        lookingfor: string,
        mobileno: string,
        emailid: string,
        city: string
    ) { }
}
export class classyusers {
    constructor(
        public name: string,
        public mobileno: string,
        public emailid: string) { }
}
/* Defines the product entity */
export class SelectItems {
    public Text: string;
    public Value: string;
    public bolean: string;
} 


/* Defines the product entity */
export interface IEmployee {
    empid: number;
    empname: string;
    emppassword: string;
    status: string;
} 