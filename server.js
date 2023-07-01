

//import libs
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");

//connection to db
const dbConnection = require('./db/mongoose');
dotenv.config({ path: "config.env" });
let msg="https://github.com/yassinht/municipalite-back-end"



//import routes
const AdminApi = require('./routes/adminRoutes');
const agentBRoutesApi = require('./routes/agentBRoutes');
const agentMRoutesApi = require('./routes/agentMRoutes');
const catRecRuotesApi = require('./routes/catRecRuotes');
const categpryRoutesApi = require('./routes/categpryRoutes');
const citoyenRoutesApi = require('./routes/citoyenRoutes');
const reclamationRoutesApi = require('./routes/reclamationRoutes');
const asseignRoutesApi = require('./routes/assignReclamationRoutes');
const opinionRoutesApi = require('./routes/opinionRoutes');
const confirmRoutesApi = require('./routes/confirmRoutes');
const annonceRoutesApi = require('./routes/annonceRoutes');



//create app
const app = express();


//server port
const port = process.env.PORT || 3000



//connect db
dbConnection();

//cors , json and files config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });





//route
app.use('/admin', AdminApi);
app.use('/agentB', agentBRoutesApi);
app.use('/agentM', agentMRoutesApi);
app.use('/catRec', catRecRuotesApi);
app.use('/category', categpryRoutesApi);
app.use('/citoyen', citoyenRoutesApi);
app.use('/reclamation', reclamationRoutesApi);
app.use('/asseign', asseignRoutesApi);
app.use('/opinion', opinionRoutesApi);
app.use('/confirm', confirmRoutesApi);
app.use('/annonce', annonceRoutesApi);





//TEST API 
app.get('/', (req, res) => res.status(200).send({ message: "Welcome to the server" }))

app.get('/rules', (req, res) => res.status(200).send({ msg}))

//RUNNING SERVER
app.listen(port, () => console.log(`server works on port ${port}`));