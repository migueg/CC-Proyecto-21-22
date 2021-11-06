
export declare module cvSchemas{
    export type education = {
        name: string;
        location: string;
        institution: string;
        initialDate: Date;
        endDate: Date;
    }

    export type languages = {
        language: string;
        writing: string;
        speaking: string;
        listening: string;
    }

    export type competences = {
        technical: Array<string>;
        personal: Array<string>;
    }

    export type experience = {
        job: string;
        company: string;
        place: string;
        startDate: Date;
        endDate: Date;
        description: string;
    }
    export type cvSchema = {
        name?: string;
        age?: number;
        birth?: Date;
        address?: string;
        description?: string;
        job?: string;
        education?: Array<education>;
        competences?: Array<competences>;
        experience?: Array<experience>;
        image?: string;
    }
}
