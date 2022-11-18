import loaders from "./loaders";

const startServer = async (): Promise<void> => {
  await loaders();
};

void startServer();
