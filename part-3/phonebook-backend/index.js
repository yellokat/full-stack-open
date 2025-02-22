// ======================================================
// import express & initialize app
// ======================================================

// imports
const express = require('express')
const morgan = require('morgan')
const app = express()

// configure middleware
const morganConfig = morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body),
    ].join(' ')
})

// add middleware
app.use(express.json())
app.use(morganConfig)


// hardcoded data
let phoneBookData = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

// helper function to generate unique id
const MAX_RANDOM_INT = 10 ** 3;
const generateId = () => {
    let randomId;
    while (true) {
        randomId = `${Math.floor(Math.random() * MAX_RANDOM_INT)}`;
        let isUnique = phoneBookData.filter(person => person.id === randomId).length === 0;
        if (isUnique) {
            break;
        }
    }
    return randomId;
}

// ======================================================
// endpoints
// ======================================================

// health check
app.get('/', (request, response) => {
    return response.send("OK");
})

// get all persons
app.get('/api/persons', (request, response) => {
    return response.json(phoneBookData);
})

// get info
app.get('/info', (request, response) => {
    let count = phoneBookData.length;
    let dateTime = Date();
    return response.send(`Phonebook has info for ${count} people <br/><br/> ${dateTime}`)

})

// get a single person
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id // -> parameter query 받는 법
    const person = phoneBookData.find(person => person.id === id);

    if (person) {
        response.json(person) // -> application/json 응답 보내기
    } else {
        response.status(404).json({
            error : 'no such resource'
        })
    }
})

// delete a single person
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    if (phoneBookData.filter(person => person.id === request.params.id).length !== 0) {
        phoneBookData = phoneBookData.filter(person => person.id !== id);
        return response.status(204).end()
    } else {
        return response.status(404).json({
            error : 'no such resource'
        })
    }
})

// add a single person
app.post('/api/persons', (request, response) => {
    const body = request.body

    // missing field handling
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    // missing field handling
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    // duplicate name handling
    if (phoneBookData.filter(person => person.name === body.name).length !== 0){
        return response.status(409).json({
            error : 'duplicate name'
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    phoneBookData = phoneBookData.concat(person)
    response.json(person)
})

// ======================================================
// start server
// ======================================================

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})