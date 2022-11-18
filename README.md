# 2209-wns-shamir-city-guide-back

1 - From your local repository 'City Guid for example' open vscode.

2 - In vscode open a new terminal (ctrl + j) and run `git clone https://github.com/WildCodeSchool/2209-wns-shamir-city-guide-back.git`

3 - `cd 2209-wns-shamir-city-guide-back && npm i` to download and install all dependencies the project needs.

5 - You have to copy the .template.env content on a src/config/.env (you have to create this .env file because it is in the .gitignore because we don't want to expose our environment variables publicly).

6 - To launch the back application with postgresql we use docker, you don't have to install postgresql on your computer.
In the terminal launch: `docker compose -f docker-compose.yml up`

7 - To build a new feature you need to create a new branch from the main branch and move there. So when you're on the dev branch, in the terminal run `git checkout -b nameNewBranch`
