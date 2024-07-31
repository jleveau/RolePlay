import express from 'express'; 

    
export function attachPlacesRoutes(app: express.Application) {
    /**
     * @openapi
     * /places/hello:
     *   get:
     *     summary: Returns a list of users.
     *     responses:
     *       200:
     *         description: A JSON array of user names
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: string
     */
    app.get("/places/hello", (req, res) => {
        res.json({
            status: "ok"
        })
    })
}

