# 2209-wns-shamir-city-guide-back

1 - From your local repository 'City Guid for example' open vscode.

2 - In vscode open a new terminal (ctrl + j) and run `git clone https://github.com/WildCodeSchool/2209-wns-shamir-city-guide-back.git`

3 - `cd 2209-wns-shamir-city-guide-back && npm i` to download and install all dependencies the project needs.

5 - You have to copy the .template.env content on a src/config/.env (you have to create this .env file because it is in the .gitignore and we don't want to expose our environment variables publicly).

6 - To launch the back application with postgresql we use docker, you don't have to install postgresql on our computer.
In the terminal launch: `docker compose -f docker-compose.dev.yml up --build`
Waiting...and..waiting...and.. after a while, you can use the Graphql application at the url 'http://localhost:4000'. You can connect to Adminer to see your database state at the url 'http://localhost:8080' with userName => 'wilderDB' and password => 'password', select PostgreSQL as Sytem, tape 'database' as Server, 'wilderDB' as User, 'password' as password and 'city_guid' as database.

7 - To build a new feature you need to create a new branch from the main branch and move there. So when you're on the dev branch, in the terminal run `git checkout -b nameNewBranch`


** PGADMIN **
If you want to use the Pgadmin interface with postgresql you have to use the address: http://localhost:4050 and enter 'wilder@wilder.com' as email and 'password' as password.
Next click on 'Add New Server', in General tab add the server name, 'city_guid_server' for instance. Next on the connection tab you have to add Hostname/address, wich is the ip adress of your postgres container. To get it you have to run in a terminal 'docker ps' to see all activated containers, select the postgres container id and run the command 'docker inspect containerId' where containerId is the id you retrieved just before. Then an object with properties appears in the console, you have to select the IPAdress value(you can find it at the end of the object) and insert it without double quotes in the Hostname/address input in pdGadmin each time you restart the container, because the container's IPAddress change at every new run.
Choose 5432(wich is normally set by default) as port, 'city_guid' as database_maintenance, 'wilderDB' as Username and 'password' as password.
Then click on save.
Now pgAdmin is listenning on your postgres container ip address, you can see the database state: on the left panel you can select 'city_guid_server' => 'Databases' => 'city_guid' => 'Schemas' => 'Tables'.

** When you decide to quit your application you can use the command `docker system prune -a` to remove all unused containers an all unused images.

