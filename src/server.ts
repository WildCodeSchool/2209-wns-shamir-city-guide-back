import loaders from "./loader";

const startServer = async (): Promise<void> => {
  await loaders();
};

void startServer();
