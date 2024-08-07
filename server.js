const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./firebase');
const http = require('http');


const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/employees', async (req, res) => {
    try {
        const snapshot = await db.collection('employees').get();
        const employees = [];
        snapshot.forEach((doc) => {
            employees.push({ id: doc.id, ...doc.data() });
        });
        res.json(employees);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/employees', async (req, res) => {
    try {
        //const { name, designation, age, experience, salary } = req.body;
        const employee = req.body;
        const docRef = await db.collection('employees').add(employee);
        //res.json({ id: docRef.id, name, designation, age, experience, salary });
        //await db.firestore().collection('employees').add(employee);
        res.status(200).send('Employee added successfully');
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).send('Error in the adding employee');
    }
});

app.put('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address } = req.body;
        await db.collection('employees').doc(id).update({ name, address });
        res.json({ id, name, address });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('employees').doc(id).delete();
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
