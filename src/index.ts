import { app, initializeDependencies } from './app';


initializeDependencies(app).then((server) => {
// Start the server if this file is run directly
    if (require.main === module) {
        const port = process.env.PORT || 3111;

        server.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    }
}).catch((err) => {
    console.error('Failed to start Application server with error: ', err);
}).finally(() => {
    //Cleanup
});




