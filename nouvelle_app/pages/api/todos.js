import fs from 'fs';
import path from 'path';

const todosFilePath = (email) => {
  const fileName = `${email.replace(/[@.]/g, '_')}.json`;
  return path.join(process.cwd(), 'todos', fileName);
};

export default async function handler(req, res) {
  const { email } = req.query;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  if (req.method === 'GET') {
    if (!fs.existsSync(todosFilePath(email))) {
      res.status(200).json([]);
      return;
    }

    const todosData = fs.readFileSync(todosFilePath(email), 'utf-8');
    const todos = JSON.parse(todosData);
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    const todos = req.body;
    fs.writeFileSync(todosFilePath(email), JSON.stringify(todos, null, 2));
    res.status(200).json({ message: 'Todos saved successfully' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}