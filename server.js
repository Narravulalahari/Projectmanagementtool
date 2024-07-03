const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let projects = [];

app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.post('/api/projects', (req, res) => {
    const { name, description, deadline } = req.body;
    console.log('Received project:', req.body);  
    projects.push({ name, description, deadline, progress: 0 });
    res.json({ message: 'Project added successfully!' });
});
app.put('/api/projects/:index', (req, res) => {
    const { index } = req.params;
    const { progress } = req.body;
    if (index >= 0 && index < projects.length) {
        projects[index].progress = progress;
        res.json({ message: 'Project updated successfully!' });
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

app.delete('/api/projects/:index', (req, res) => {
    const { index } = req.params;
    if (index >= 0 && index < projects.length) {
        projects.splice(index, 1);
        res.json({ message: 'Project deleted successfully!' });
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

