import { Issue } from '../models/Issue'

// router.get("/", async (req, res) => {
//     const users = await User.query();
//     res.json(users);
//   });



export async function findAll(): Promise<Issue[]>{
    const issues = await Issue.query()
    return issues
};

export async function findById(id: number): Promise<Issue> {
    const issue = await Issue.query().findById(id)
    return issue
};

export async function findIdUpdatedBefore(majDate: Date): Promise<Issue[]> {
    const issue = await Issue.query().where("updatedAt", '>=', majDate)
    return issue;
};  