const server = require('./app');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
    path: './config.env'
});

const DB_ADDRESS = process.env.DB_LINK;

const PORT_ADDRESS = process.env.SERVER_ADDRESS || 3000;

const serverObject = server.listen(3000, async (error) => {
    if(!error) {
        console.log('Server available at port:', PORT_ADDRESS);
        await mongoose.connect(DB_ADDRESS, (error, connect) => {
            if(!error) {
                console.log('Database Connection successful...');
            }else {
                console.log('Error Encountered ', error)
            }
         });
        
    } else {
        console.log(error);
    }
});

