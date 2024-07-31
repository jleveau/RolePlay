import * as Express from "express";

const attachRouter =  (app: Express.Application) => {

    /**
     * @swagger
     * /health:
     *   get:
     *     summary: Health Check
     *     description: Returns the status of the service.
     *     responses:
     *       200:
     *         description: Service is up and running.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: ok
     */
    app.get("/health", (req, res) => {
        res.json({
            status: "ok"
        })
    })
}

export default attachRouter;