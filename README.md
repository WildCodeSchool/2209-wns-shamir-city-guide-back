# 2209-wns-shamir-city-guide-back

1 - From your local repository 'City Guid for example' open vscode.

2 - In vscode open a new terminal (ctrl + j) and run `git clone https://github.com/WildCodeSchool/2209-wns-shamir-city-guide-back.git`

3 - `cd 2209-wns-shamir-city-guide-back && npm i` to download and install all dependencies the project needs.

5 - You have to copy the .template.env content to a .env at the root of the project (you have to create this .env file because it is in the .gitignore and we don't want to expose our environment variables publicly).

6 - To launch the back application with postgresql we use docker, you don't have to install postgresql on our computer.
In the terminal launch: `docker compose -f docker-compose.dev.yml up --build` or `docker compose -f docker-compose.dev.yml up`

Waiting...and.. after a while, you can use the Graphql application at the url 'http://localhost:4000'. You can connect to Adminer to see your database state at the url 'http://localhost:8080' with userName => 'wilder_dev' and password => 'password_dev', select PostgreSQL as Sytem, tape 'database_dev' as Server, 'wilder_dev' as User, 'password_dev' as password and 'city_guid_dev' as database.

7 - To build a new feature you need to create a new branch from the main branch and move there. So when you're on the dev branch, in the terminal run `git checkout -b nameNewBranch`


** PGADMIN **
If you want to use the Pgadmin interface with postgresql you have to use the address: http://localhost:4050 and enter 'dev@dev.com' as email and 'password' as password.
Next click on 'Add New Server', in General tab add the server name, 'city_guid_server' for instance. Next on the connection tab you have to add Hostname/address, wich is the ip adress of your postgres container. To get it you have to run in a terminal 'docker ps' to see all activated containers, select the postgres container id and run the command 'docker inspect containerId' where containerId is the id you retrieved just before. Then an object with properties appears in the console, you have to select the IPAdress value(you can find it at the end of the object) and insert it without double quotes in the Hostname/address input in pdGadmin each time you restart the container, because the container's IPAddress change at every new run.
Choose 5432(wich is normally set by default) as port, 'city_guid_dev' as database_maintenance, 'wilder_dev_' as Username and 'password_dev' as password.
Then click on save.
Now pgAdmin is listenning on your postgres container ip address, you can see the database state: on the left panel you can select 'city_guid_server' => 'Databases' => 'city_guid' => 'Schemas' => 'Tables'.

** When you decide to quit your application you can use the command `docker system prune -a` to remove all unused containers an all unused images.


** TESTS **
To run tests with jest we can use the command `docker compose -f docker-compose.test.yml up`, which create a new database a new volume db_test to save your manipulations. If some authorization problems are raised you have to change the folder's owner to root : `sudo chown root 2209-wns-shamir-city-guide-back`,  and you can run the above command again.
To choose wich kind of test you want to launch you can modify at the line 14 of the docker-compose.test.yml the 'command' instruction, you can choose between `npm run test:unit` for unit tests, `npm run test:integration` for integration tests and `npm run test:functionnal` for functionnal tests.

