import express from 'express'; 

    
export function attachPlacesRoutes(app: express.Application) {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
}

