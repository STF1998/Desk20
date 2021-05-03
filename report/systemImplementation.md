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

# Stack Architecture

Our team decided to use MEAN stack for developing this project. MEAN stands for MongoDB, Express, Angular, and Node.js. Even though the stack consists of multiple technologies, all of them are based on one coding language, which is JavaScript. The roles of each technology are:

-	MongoDB: database solution
-	Express: NodeJS framework to simplify http request and response
-	Angular: Front-end browser-side framework
-	Node.js: Runtime server-side code

Below is a diagram on how the each of the technologies interacts with one another within the stack.

<p align="center">
<img src="../report/Images/pathwayStack.png" width=75%>
</p>
<b><p align= "center">Figure 1: Stack diagram.</p></b>

MEAN stack was chosen due to its advantages, including:
-	It has a large and helpful online community. There are several tutorials, lectures, and problem-solving articles or videos about MEAN stack on the web. 
-	Single programming language – this helps to create an easy working environment for full stack development.
-	Supports automated testing – ensures readily available quality checks.
-	Isomorphic coding – allows developers to switch to another framework without altering much of the original code.
-	Support from the faculty, as the lectures and support provided was focused on MEAN stack.

As a ateam we also did a bit of research on different stacks, including MEVN and MERN:

<table>
<tr>
  <th>MEVN</th>
  <th>MERN</th>
</tr>
<tr>
  <td>
    <ul>
      <li> MongoDB </li>
      <li> Express </li>
      <li> Vue </li>
      <li> Node.js </li>
    </ul>
  </td>
  <td>
    <ul>
      <li> MongoDB </li>
      <li> Express </li>
      <li> React </li>
      <li> Node.js</li>
    </ul>
  </td>
</table>

The only difference between these stacks is the front-end framework. For this project, Angular was selected. In terms of the front-end, Sam and Hugh have really enjoyed developing a strong understanding of how the front-end works. Angular has defintely ensured we have a strong grasp of various areas, including typescript.

According to the GitHub stars received on each of the front-end framework (Angular, React, Vue), Angular is the least popular one and it is shown in the graph below ([link](https://www.codeinwp.com/blog/angular-vs-vue-vs-react/)). 

<p align="center">
<img src="../report/Images/2021-star-history.png" width=75%>
</p>
<b><p align= "center">Figure 2: Number of stars on GitHub projects for Angular, React, and Vue</p></b>

However, in terms of job searched on linked in, Angular is at the first place, which shown in the graph below ([link](https://zerotomastery.io/blog/tech-trends-showdown-react-vs-angular-vs-vue/)) the data was taken on (10th December 2018). 

<p align="center">
<img src="../report/Images/angular_vs.png" width=75%>
</p>
<b><p align= "center">Figure </p></b>

In conclusion, MEAN stack was chosen because of its advantages discussed above and its high job-employability. 

## Stack architecture implementation on our app

Other than those four technologies, our application will also be interacting with Facebook’s API. Other than Facebook’s API we will also be using PassportJS which is a Node.js framework that will help us communicate with Facebook.

<p align="center">
<img src="../report/Images/stach_arch.png" width=75%>
</p>
<b><p align= "center">Figure : </p></b>

# System Design

## Authentication design

<p align="center">
<img src="../report/Images/auth.png" width=50%>
</p>
<b><p align= "center">Figure : </p></b>

We decided to make Facebook’s (FB)’s authentication the only sign-in method to access our application. The reasons behind that are:
1.   FB’s API makes it convenient for users to find and connect with their friends on the app. The playful aspect of our application is to enable users to compete for the longest studying time within a week among their friends. FB’s API would automatically connect users with their friends on the app.
2.   FB’s API enables one-click signup and login. It could provide essential user data (e.g. user’s name, user’s FB profile pic) without the user having to manually fill the data when registering/logging back in.
3.   FB’s API is well documented by Facebook. Furthermore, accessing FB’s API is made easy by the framework that we are using in our application called PassportJS.
4. There are also external support provided by people around the world in the form of videos, articles, and QnA.

The downside of using FB’s authentication is:
1.   If our app is in development mode, FB does not allow any real FB user other than the app administrator to login to our application. However, FB provides up to 2000 test users for the purposes of testing our application. Further details are going to be discussed in the unit testing section.
2. To deploy our application, we need to follow FB’s app review process. Only after our application is approved by FB will real users be able to use our app.

The procedure to use FB’s API is as follows:
1. 	Create a FB account and go to FB for developer’s site
2.	Create the application
3.    FB will return the ClientID number and Client Secret number. Enter the numbers into the PassportJS code when requested.
4.	Follow the step-by-step guide on FB authentication using PassportJS on the PassportJS documentation[http://www.passportjs.org/docs/facebook/].

When the login button in our application is clicked, the application will redirect the user to FB and asks the user to authenticate there. Upon successful authentication, FB will ask the user whether the user agrees to share the requested data to the application. The detail of the requested data is shown on the confirmation pop-up (shown in Figure x). If the login is not successful or the user does not agree to share their data, the user will be redirected back to our application’s login page.

The FB permission type in our code determines the type of data that FB’s API will return to our application. Flocus only uses the “user_friends'' permission, which means that FB will return an array consisting of all of the user’s friends that also grants permission to the application. There are also types of data that does not require a permission to be returned, which are user’s name, user’s uid (FB’s user unique id), user’s profile picture (in the form of link), and the authentication token. Amazingly, PassportJS provides a function called “isAuthenticated()”, which returns true if the user is already authenticated and the session is still alive. It will return false if the user is not authenticated or the session is expired. Therefore, in our application we do not have to worry about authentication token because we always ask using the “isAuthenticated()” method before letting the user access data from our database.

After FB returns the user object to our application, we then do a check on our database by checking the uid of the user and comparing it with every uid inside the database. If the user already exists, we only modify the list of friends of the user. If not we then put the user in our database. Details of the user schema and PassportJS will be discussed further on the database and middle tier sections.

Successful or unsuccessful login attempt will redirect us back to the login page. Our login page will check the “isAuthenticated()” method each time it is called, if it is returning a true then the user is redirected to our home page. If it is returning a false then the user is returned to our login page. Our application schema from the home page is shown in the graph below.

<p align="center">
<img src="../report/Images/auth2.png" width=75%>
</p>
<b><p align= "center">Figure : </p></b>

Inside the home page we then provide three sections that a user can access, which are study page, league page, and Asaqua page.

## Study page

Inside the study page, we provide an empty glass and a timer button. When the button is clicked, a study session is created. The timer starts and the glass will start filling up. We decided to set one study session to be 25 minutes. The flowchart of how the timer works is shown in the figure below.

<p align="center">
<img src="../report/Images/studyDesign.png" width=75%>
</p>
<b><p align= "center">Figure : </p></b>

The word ‘record’ on the chart means the session details, such as when does the session happen, whether the session is finished or not, and how long does the user inside the session. On the chart shown above shows that we saved both finished and unfinished sessions to the database.

## League

When the league page is accessed, we do a data processing on our database (given the schema shown in the database section) to be able to show each user and the user’s friends’ total study time and finished session within a week (from Monday to Sunday). Then we sort and show the results based on who has the most time spent or session finished within a week and display the results on a league table. Other than the league table, our sessions progress within the week are also presented in a graph. The league page is shown in Figure x below.

<p align="center">
<img src="../report/Images/league_tab.png" width=75%>
</p>
<b><p align= "center">Figure : </p></b>

<p align="center">
<img src="../report/Images/league_tab2.png" width=75%>
</p>
<b><p align= "center">Figure : </p></b>

<p align="center">
<img src="../report/Images/league_tab3.png" width=75%>
</p>
<b><p align= "center">Figure : </p></b>

## Asaqua

The asaqua page shows the background and motivation on why we decided to go through with this app idea and how to use our application.

## Class diagrams

Shown below is the UML class diagram that demonstrates the making of UserData that then could be accessed by the front-end.

The Facebook’s API returns a user object that is going to be parsed into a chunk of String in the middle tier and then saved on to the database according to the User schema. It is set so that the data saved could only be accessed by one variable per API call (in one API call it only returns userUID only, or userName only).

In terms of record, users could only post one record at a time, but will get all the records within a certain amount of time which will be processed in the front-end to be shown as total study time and total finished session within one week.

<p align="center">
<img src="../report/Images/class.png" width=75%>
</p>
<b><p align= "center">Figure : Class diagram </p></b>

## Sequence diagrams

The figure below represents how our application is used by a user on a daily basis. 

<p align="center">
<img src="../report/Images/sequential.png" width=75%>
</p>
<b><p align= "center">Figure : Sequential diagram for Flocus</p></b>

# Back End - MongoDB

## Database implementation

As the user first logins to our application, our database keeps their details to identify whether the user is an existing user. After authenticating the user, the backend developers would have to create a separate collection, ‘Records’, in the database to persistently store rapidly growing study time records. Our application maintains the data of a study session recorded by the user, namely the timestamp and the time spent during a session. Each record also contains the user's Facebook UID as a key to identify the record ownership. The developers had then created a REST API that handles the GET and POST requests, which are to retrieve a summary of previous records and write new records to the database through calling the corresponding methods in angular data service.

The backend developers decided to normalize the data storage, so the database separately stores the user’s information and the user’s usage data in two collections. Such an approach needs fewer design decisions to make and is of higher flexibility to cope with the unknown data storage demand in future development. However, the drawback is that queries that require joining two collections are more difficult to implement.

<p align="center">
<img src="../report/Images/dbImplement.png" width=75%>
</p>
<b><p align= "center">Figure : Entity relationship diagram of the 2 database collections</p></b>

## Data model

The above entity-relationship diagram shows that our database has a normalized set up despite using a NoSQL database service. When a user is logging in to our application, Facebook’s passport API returns the necessary information to our server, which allows us to save and update the data regarding the user within the User collection. It ensures all data is up-to-date when the user logins every time. This is particularly important for the competitive league feature to retrieve data of the user’s friends, who potentially might have joined our application, or add the user as a friend on Facebook later than the user.

As a team, we agreed to use the UID given by Facebook as the key between the 2 data collections. The Record collection keeps rapidly growing user's record log, which is generated when a user has completed a session or leaving the component in the midway. Such a data model set up keeps as much user data as possible. Therefore, it allows flexible data retrieval query to fulfil demands from different components and potential future extension. When our application needs data from both collections (aka a join query in a SQL model), we perform multi-staged queries to the database. The database will then handle all the computational complex sorting and searching functions instead of solving them in our server.

[ CAN ADD THE CODE SNIPPET OF A MULTI STAGED QUERY HERE]

<p align="center">
<img src="../report/Images/user_data_model.png" width=75%>
</p>
<b><p align= "center">Figure : The user data model</p></b>

<p align="center">
<img src="../report/Images/record_data_model.png" width=75%>
</p>
<b><p align= "center">Figure : The record data model</p></b>

# Middle Tier - Express, Node, the RESTful API

## Introduction

The middle tier chosen for our application as discussed on the stack implementation section is NodeJS with the help of ExpressJS framework. We utilised both NodeJS and ExpressJS to play a role as an API in our application. API stands for Application Programming Interface whose function is to allow our application to talk to other applications such as Facebook or our own database server.  

On this project, RESTful architecture is going to be implemented on our API. RESTful stands for Representational State Transfer. To be called RESTful, an API needs to follow these 6 constraints: 

Client-Server Architecture 

Stateless 

Layered System 

Cacheable 

Uniform Design 

Code on Demand 

Details of those constraints could be found here https://restfulapi.net/rest-architectural-constraints/. 

In RESTful API, CRUD operation will be used to interact with the data that is going to be passed between applications. CRUD stands for Create, Read, Update, and Delete. We will be using those methods to talk to our database and other applications. The HTTP methods to implement CRUD are: 

GET – reading data  

POST – creating data 

PUT – updating data 

DELETE – deleting data 

Those HTTP methods are implemented in our server-side code which is in NodeJS. Those methods are also going to be combined with the functionality of ExpressJS, which makes doing HTTP request, response, and routing much easier. An example of API requests implemented using ExpressJS is shown in Figure x, while API requests without ExpressJS are shown in Figure x. 



By comparing the two figures, it is evident that by using ExpressJS our code is much more robust, simple, and easier to understand/read. Therefore, in our application we are going to implement RESTful API using ExpressJS.
Other than ExpressJS, we are also going to use PassportJS to help the authentication using Facebook process in our application.

## PassportJS

# Front-End System Implementation

## Angular 

Angular offered a number of key advantages in the development of our Single Page Application. Primarily, the component-based structure facilitated efficient code maintenance and update (Decoupled components can be easily replaced with improved implementations). Additionally, during sprint sessions, team members would often work in parallel, accessing the same section of code. Angular enhanced this process by providing an easy-to-understand structure that improved readability. We had a brief discussion regarding Vue and React however, we remained with an Angular framework due to the familiarity of the group and course administrators with its setup. Additionally, our group was eager to utilise Lottie animations for front-end design and, from our preliminary research, Angular offers the easiest implementation of the <lottie-player>.

During our opening sprint, we set up all required components for the project, this is displayed below:

<p align="center">
<img src="../report/Images/sprint_front.png" width=40%>
</p>
<b><p align= "center">Figure : A screenshot of the single page application components.</p></b>

One of the primary objectives of Flocus is to provide a healthy and productive virtual space for students and experienced professionals to use for their studies. We realised the importance of being evidence-led when designing the front-end of our application and as such, conducted a brief literature overview to inform the design process of each component.

## Details of implementation

### Study component - design

The main component in Flocus is the study page where users spend a majority of their time. It was therefore critical for us, as the designers, to produce an environment that encourages productivity whilst minimising the risk of distraction. To achieve these outcomes, we investigated a growing body of research that points to the beneficial effects of nature on health, stress reduction and productivity. Research from the University of Melbourne investigated the impact of exposure to natural scenes on response times, attention deficits and error frequency when conducting menial tasks. The findings offered statistically significant evidence of a negative, causal effect of natural environments on attention deficit and error frequency. Although the effect with the largest magnitude came from immersion in a natural environment, exposure via a screensaver also offered statistically significant results. () Other papers that offer similarly robust evidence include ()()(). As a result, we decided to introduce a natural theme to the study component and, to align with the applications aim of raising awareness for water scarcity, we decided to use a blue colour scheme. This resulted in the following component design:

<p align="center">
<img src="../report/Images/animation.png" width=70%>
</p>
<b><p align= "center">Figure : the front-end study component created using Figma</p></b>

To further emulate a natural scene, CSS transformations were implemented on certain features of the component (e.g. clouds and birds) which, were designed so to avoid fast and distracting movements.  

The introduction of a clock or timer was discussed at length by the group. However, we decided to preclude this from the design as we did not want a traditional timer to distract from the theme and message of the overall component.

### Study component - functionality 

To introduce a glass fill animation, we used typescript which allows the user to start and stop the glass-fill as they please. The animation was implemented via the use of a SVG clip-path which is transformed vertically to reveal the underlying water animation. 

<p align="center">
<img src="../report/Images/animation_newcode.png" width=70%>
</p>
<b><p align= "center">Figure : A screenshot of the HTML code used for the glass-fill animation.</p></b>

Upon completion of a study session (45 Minutes), the glass empties incrementally over the time allocated for a break.

The running tap affect was implemented by accessing a HTML DOM element object via a specified ID value. The animation iteration count was then toggled between 1 and infinite upon button click. This allowed the drip effect to sync with the glass fill whilst additionally completing the current iteration so to avoid sudden pauses. 

### Login component

The Login component is the initial design that greets users and as such, has been created to give an introduction to the theme of the site whilst offering a brief description of Flocus’s mission. To explore the avenue of serious play, we implemented a CSS hover animation on the login button and a Lottie animation.

<p align="center">
<img src="../report/Images/welcome.png" width=80%>
</p>
<b><p align= "center">Figure : A screenshot of welcome and login component in action. </p></b>

### League table component

Tom Cockain, a developer of Flocus, provided the initial inspiration and idea of a league table that would further enhance user experience and reduce procrastination. To ensure that this approach was appropriate given our desired outcomes, we looked to the psychological field of study. Many contemporary studies have found a positive effect of competition on student course outcomes, motivation and effort. For example, (Burguillo, 2010) found that the introduction of competition to the classroom increased final course performance. Additionally, research by (Le Bouc and Pessiglione, 2013) and (Kilduff, 2014) displayed a positive causal effect in student effort over the long- and short-term upon the introduction of a competitor. Despite the potentially positive outcome of increased competition, we were still concerned about individuals falling too far behind their peers and, as a result becoming de-motivated. Equally we were concerned about a minority pulling away with a clear margin of victory for long periods of time. To mitigate these risks, we decided to implement a 1-week competition duration. Additionally, a personal stats section was added to provide motivation for self-improvement. 

<p align="center">
<img src="../report/Images/league_table.png" width=80%>
</p>
<b><p align= "center">Figure : A screenshot of league table in action. </p></b>

For the implementation of the personal stats section titled “Your Week”, we utilised Chartjs. To discourage overuse, we have included colour indicators that provide a subtle prompt to an individual if they are overworking - a bar that displays work over 9.75 hours will turn red. For this, we followed the UK governments advice on the 48-hour working limit and assumed that a student was studying for 5 days per week. The typescript code for the Chartjs bar-chart is attached below:

<p align="center">
<img src="../report/Images/table_code1.png" width=50%>
</p>
<b><p align= "center">Figure : A code snippet of the typescript code used for the personal stats graph. </p></b>

<p align="center">
<img src="../report/Images/table_code2.png" width=50%>
</p>
<b><p align= "center">Figure : A code snippet of the typescript code used for the personal stats graph. </p></b>

TODO - Resizing HTML League table: (Include when developed).

### Asaqua component

In an endeavour to educate users about the great work that Asaqua has been achieving in Uganda, we included the asaqua component. We also wanted to ensure that users fully understand the Flocus project and how to use the site. This component was designed to be as simple as possible, although, we did manage to include Owl Pacino in the bottom right of the screen:

<p align="center">
<img src="../report/Images/Asaqua_Screenshot.png" width=80%>
</p>
<b><p align= "center">Figure : The Asaqua Component</p></b>

### Homepage component

After speaking to prospective end-users in questionnaires, focus groups and informal interviews, we were made aware of the need to maintain a calm environment on the site, absent of stressful and fast-moving animations. As students ourselves, we fully understand the anxiety and tension that students and working professionals can be under during examination periods. As such, we did not want the study component to be the first thing that a user is confronted with when they complete the log-in process. We wanted to form an area in which users can decide, in their own time, when to proceed to the study component to begin their work. Additionally, from a design perspective, a home component facilitates easy navigation whilst removing the need for a permanent nav-bar and allowing front-end developers to use the full size of the screen to implement eye-pleasing animations. However, the front-end design of this component was a difficult one to achieve. We wanted to use calming animations without increasing the risk of distraction and thus compromising on our main objective of reducing procrastination. 

We have attached a screenshot of the home component below, although to get a clearer view of the animation please visit our demo video.

<p align="center">
<img src="../report/Images/Home_Component.png" width=80%>
</p>
<b><p align= "center">Figure : The Home Component</p></b>



To achieve this animation, we created six Scalable Vector Graphics (SVG) circle elements and implemented CSS keyframe animations on three of them. To implement the liquid effect of waterdrops merging, we utilised the FeGaussianBlur and FeColorMatrix to specify the filter. This filter was then used with the FeBlend which merges SVG elements. In effect, this is similar to introducing a blur effect on an SVG and then increasing the contrast.  The HTML for this is displayed in the code snippet below:

<p align="center">
<img src="../report/Images/HomeComp_Code.png" width=50%>
</p>
<b><p align= "center">Figure : A code snippet from the Home Component's main animation</p></b>



We have placed the nav-bar on the right-hand side and have implemented CSS state changes on hover. 


# Additional Elements and Components

## Front-end

### Lottie animations

Lottie is an open-source animation file format that allows creators to easily convert Adobe After-Affects animations for implementation in HTML code. For Flocus, it allowed us to display lightweight, scalable and interactive animations that enhanced the serious play aspect of our application. Initially, we began creating custom made animations for the application in AAE, converting to JSON files via the BodyMovin’ extension. However, this process was far more challenging than initially expected – Lottie files do not currently support certain mattes and effects that make animating in AAE achievable in short periods of time. As a result, we utilised the large and comprehensive Lottie file library where a large number of creators have made their work freely available.

<p align="center">
<img src="../report/Images/lottie_code.png" width=70%>
</p>
<b><p align= "center">Figure : A snippet of the lottie-player bringing animation to life. </p></b>

The Lottie-player is a Web-Component for easily including and playing Lottie animations. It was the fastest implementation of Lottie, allowing us to specify certain parameters such as speed and iteration count. However, it is not absent of drawbacks. From our individual use and user feedback, it was made aware that certain browser would not render or handle the animations as desired. The browser that displayed the most issues was Safari. In an attempt to work around this glitch, we rendered the animation on a canvas rather than SVG. However, Lottie animations do not currently support certain animation effects on canvas and so when rendering, the Lottie animation became distorted and un-useable. Given the lack of sufficient time to address these concerns, we had to accept that the application was not going to operate as well in Safari as other browsers (e.g Chrome). We have passed this information to the Asaqua team for future adjustment. 

The relevant licence information regarding free-for-use Lottie animations is stated below:

“All the public files available in LottieFiles are distributed under Creative Commons (CC) Attribution (BY) unless stated otherwise. This license allows reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use.” (https://lottiefiles.com/page/license)

All files in use by Flocus have been distributed under the Creative Commons license and Asaqua have been informed of the requirement to provide credit to the original creators upon commercial rollout.

URLs for Lottie animations in use:
- winning.json; https://lottiefiles.com/42226-winning-leadership
- Login-guy.json; https://lottiefiles.com/36707-working-man

### Adobe Stock

Unfortunately, Flocus’s development budget did not stretch far enough to cover the subscription or the early cancelation fees of Adobe Photoshop or Illustrator. Luckily however, with the use of a 30-day free trial, a member of the team accessed Adobe Stock, a platform where third-party designs can be fully licensed for commercial use. As such, the Study component has been designed from an illustration licensed under the perpetual and worldwide Adobe licence:

“An Adobe Stock perpetual, worldwide licence allows you to use your licensed asset in all media including print, presentations, broadcasts, websites, and on social media sites.” Additionally, a standard licence allows for the modification of a design. 

We first converted the .ai file to a .svg format for edit in Figma. We then isolated each layer for CSS animations and user interaction. The layering was achieved with the use of the z-index in CSS. 

Adobe licence information: https://stock.adobe.com/uk/license-terms

Original design: https://stock.adobe.com/uk/images/clean-water-vector-illustration-tiny-drinking-fresh-potable-person-concept/269962379

## Back-end

# Deployment Details

# Project report navigation

- [Next page: Sprints and Project Management](https://github.com/STF1998/Desk20/blob/main/report/sprints&ProjectManagement.md)
- [Previous page: UX Design](https://github.com/STF1998/Desk20/blob/main/report/UXDesign.md)
- [Go back to Homepage](https://github.com/STF1998/Desk20)
