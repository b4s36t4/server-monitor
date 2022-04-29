The purpose of this project is to make the server monitoring a bit easy for the non-tech people.

I have created this project in keeping my mind that a simple bussiness person can able to process and mintor his server so that he don't have to deal with freelancer again and again for small small fixes or so.


This project is being divided in two parts which was backend and other was UI app for iOS, Android and Web.

# Backend TechStack

    * Python
    * FastAPI
    * psutil
    * uvicorn -> ASGI server to support FastAPI.

# UI Tech-stack

    * React native
    * Expo with react-native
    * axios
    * react-navigation
    * node.js

# Installation of the Server.

In order to run the script first we need to build up the server which should be deployed into the server which we wanted to monitor for.

Using the below command you'll able to run the server which will be running on the port `80` and host `0.0.0.0`

## Step 1 - Install ServiceMan

Please follow the instructions mentuond in the below links to installs serviceman in your system.

(serviceman)[https://webinstall.dev/serviceman/]

Once you install please add the service man to your Path by including the path of service which will be available in your console/terminal at the end of the instalaltion of service man.

Once you done adding it into your PATH, please verify that the serviceman is available in your terminal or command prompt by running below commnad

`serveiceman` -> should show list of available commands.

Once the serviceman is installed. we need to start the server using serviceman.



`serviceman add --name "monitoring" uvicorn --reload main:app --port 80 --host 0.0.0.0`


# Running app

To get start with the app first we need to install depenedcies i.e are node.js and yarn (Package manager)

If you're done with the tools needed, firstly run the below command

`yarn install` will install all the packages needed.

Once the packages are done installing it's time to startup the server.

> run `yarn start` which will start expo server for different possibilites such as web, android and ios.

To start ios press `i` on the terminal screen, `a` for android and `w` for web.

That's it it's upto you to use how ever you guys wanted to use.