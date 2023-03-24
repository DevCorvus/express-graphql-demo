import { initializeServer } from './core/server';

(async () => {
  const { httpServer, expressServer } = await initializeServer();

  const port = expressServer.get('port');

  httpServer.listen(port, () => {
    console.log(`Server up and running on port ${port}!`);
  });
})();
