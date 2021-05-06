import { config } from "dotenv";
import knex from '../config/knex';

//const db = knex();

interface Issue {
    id: number;
    nom: string;
    url: number;
    // Ajout des deux champs dates
    created_at: Date;
    updated_at: Date;
};

export async function findAll(): Promise<Array<Issue>>{ // Select renvoie toujours un tableau
    const issues = await  knex('issues').select(); // Resolves to any
    return issues;
};

export async function findById(id: number): Promise<Array<Issue>> {
    const issue = await  knex('issues').select().where("id", id);
    return issue;
};

export async function findIdUpdatedBefore(updated_at: Date): Promise<Array<Issue>> {
    const issue = await  knex('issues').select().where("updated_at", '>=', updated_at);
    return issue;
};