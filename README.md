# MyDirectedStudyProject

## Two Projects 
This Applications contains two components: 
 - A Dotnet HTTP Backend
 - A React Frontend
 
## Running the Projects

### Run the HTTP Back-end 
You can run these projects locally on your computer but you need to set up the database first.
Our back-end utilizes postgresql as its dbms and thus you need to install and run it on your local machine. 
Once you clone or download the code, Go to the content directory of `HR_ClientManagement_WebAPI` and run `dotnet restore` to fetch the dependencies for our project.
You can also install the `dotent ef` tool to help with running `migrations` and updating the db by running `dotnet ef databae update`. 

You need to insert the `username`, `password`, `role` and `email` in the database. `username` and `password` are compulsory.  

Once Your database is setup you can run the http endpoint by running `dotnet run`.


### Run the React Front-end
You can run the react front end from the same server that is serving your HTTP backend but that requires you to build the react-app for production and transfer the files to `wwwroot` folder. This functionality is already setup once you run `npm run build`. 
You can independently run the `react-app` code by going into the   `react-app` folder and running `npm run start` and use the dotnet server to act as just a backend to the app.

