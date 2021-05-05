import knex from '../config/knex';

//const db = knex();

interface Issue {
    id: number;
    nom: string;
    url: number;
};

export async function findAll(): Promise<Array<Issue>>{
    const issues = await  knex('issues').select(); // Resolves to any
    return issues;
};

export async function findById(id: number): Promise<Issue>{
    const issue = await  knex('issues').select().where("id", id);
    return issue;
};
