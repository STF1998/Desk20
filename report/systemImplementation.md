![Creating great tasting products to lead a healthy lifestyle (2)](https://user-images.githubusercontent.com/69913789/115699052-33b94d00-a35d-11eb-963f-b5cc8d681e3e.gif)

# System Implementation [20%]

## Contents of System Implementation

- [**Stack architecture and system design**](#Stack-architecture-and-system-design)
  - [Class diagrams](#Class-diagrams)
  - [Sequence diagrams](#Sequence-diagrams)
- [**Back End - MongoDB**](#Back-End---MongoDB)
  - [Database implementation](#Database-implementation)
  - [Data model](#Data-model)
- [**Middle Tier**](#Middle-Tier)
  - [Express](#Express)
  - [Node](#Node)
  - [The RESTful API](#The-RESTful-API)
- [**Front End**](#Front-End)
  - [Angular](#Angular)
  - [Details of implementation](#Details-of-implementation)
- [**Additional Elements and Components**](#Additional-elements-and-components)
- [**Deployment Details**](#Deployment-Details)

# Stack architecture and system design

## Class diagrams

## Sequence diagrams

# Back End - MongoDB

The first objective of the back end (middleware) developers was to be able to authenticate a user coming into our application using the Facebook API. At the same time, creating an API request to get the user data and store the data in our database. The data taken from Facebook is the user’s name, Facebook UID, profile picture, and a list of friends who are or have been using the application. 

To help us achieve the objective, we utilised PassportJS. PassportJS is a comprehensive set of strategies that supports authentication using username and password, Facebook, Twitter etc. The steps shown in the PassportJS documentation on authentication through Facebook [x] were then followed, the steps include:
1.	Installing the packages required by PassportJS
2.	Create an application at Facebook Devs (Facebook for Developers)
3.	Assigning the unique application ID and application secret acquired from Facebook Devs site to the code which is provided in PassportJS documentation
4.	Modify the skeleton code provided in the documentation to be able to function as needed

Then, the second objective would be to create a get requests that could return a specific data wanted by the front-end developers. For instance, as shown in Figure 1 and Figure 2.

<p align="center">
<img src="../report/Images/get_request.png" width=100%>
</p>
<b><p align= "center">Figure 1: GET request to get each of the user's friends UID</p></b>

<p align="center">
<img src="../report/Images/get_request2.png" width=100%>
</p>
<b><p align= "center">Figure 2: GET request to get each of the user's friends name</p></b>


## Database implementation

## Data model

# Middle Tier

## Express

## Node

## The Restful-API

# Front End

## Angular 

## Details of implementation

# Additional Elements and Components

# Deployment Details


