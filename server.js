const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./firebase');


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
            employees.push({ databaseid: doc.id, ...doc.data() });
        });
        res.status(200).send({ status: 'OK', data: employees });
    } catch (error) {
        res.status(500).send({ status: 'Error', data: 'Error to fetch data!', error: error });
    }
});

app.post('/employees/add', async (req, res) => {
    try {
        const employee = req.body;
        const docRef = await db.collection('employees').add(employee);
        res.status(200).send({ status: 'OK', data: 'Employee data added successfully!' });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).send({ status: 'Error', data: 'Error in the adding employee data!', error: error });
    }
});

app.put('/employees/update', async (req, res) => {
    try {
        //const { id } = req.params;
        const { databaseid } = req.body;
        const { name, designation, experience, salary, age } = req.body;
        await db.collection('employees').doc(databaseid).update({ name, designation, experience, salary, age });
        res.status(200).send({ status: 'OK', data: 'Employee data updated successfully!' });
    } catch (error) {
        res.status(500).send({ status: 'Error', data: 'Error in the updating employee data!', error: error });
    }
});

app.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('employees').doc(id).delete();
        res.status(200).send({ status: 'OK', data: 'Employee data deleted successfully!' });
    } catch (error) {
        res.status(200).send({ status: 'Error', data: 'Error in the deleting employee data!', error: error });
    }
});


// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

  