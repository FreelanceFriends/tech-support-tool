### Technical Support Ticketing Tool

    Technical support ticekting tool is a online based application which helps you to create ticket for technical related issues. Tickets will be assigned to the technician. Technician can follow-up or mark that as resolved once it has been resolved.

### Run application in Dev mode

    1. Clone this repo to your local and navigate to root directory
    2. In root directory run
         ```npm install ```
         and then
         ```npm install --prefix frontend ```
    3. If you want to run in development mode then you have to run backend and frontend seperately (You need secrets to run the backend)
    Starting in dev mode
        Run Backend
            In root directory : ```npm start ```
        Run Frontend:
            ``` cd frontend ```
            ``` npm start ```

### Run application in Production mode

    Follow above steps and After step 2 run below command in root directory
    ``` npm run buil --prefix frontend ```
    ``` npm start ```

### Access Application

    Prod Mode: App will be available on ``` http://localhost:8080 ```
    Dev mode
        Fronend: ``` http://localhost:3000 ```
        Backend: ``` http://localhost:8080 ```
