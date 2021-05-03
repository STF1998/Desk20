![Creating great tasting products to lead a healthy lifestyle (3)](https://user-images.githubusercontent.com/69913789/115699266-68c59f80-a35d-11eb-822a-893f2ef8696d.gif)

# Sprints and project management [15%]

## Contents of Sprints and project management
- [**Group working methods**](#Group-working-methods)
  - [Overview](#Overview)
  - [Agile methodology](#Agile-methodology)
  - [Communication channels](#Communication-channels)
- [**Meet the team**](#State-of-the-art-survey)
- [**Sprints documentation*](#Sprints-documentation)
- [**Team use of Git**](#Use-of-Git)

## Group Working Methods

### Overview

When developing a single page application, it is critical to consider development methodology, particularly given the large number of moving parts associated with full-stack development. When discussing the development stage, we discussed the pros and cons of an agile vs waterfall methodology before agreeing on the agile approach. The waterfall approach is focused more on a rigid structure of tasks that lead to a final product whereas an agile approach prioritises a more flexible and iterative process to software development. To learn more about development methodologies, please check out this [link](https://www.wrike.com/project-management-guide/methodologies/) that we found very useful.

Check out the Figure 1 below that helps explain the difference in the methodology approaches (Source: [link](https://saigontechnology.com/blog/agile-vs-waterfall-in-software-development)).

<p align="center">
<img src="../report/Images/agile-scrum-vs-waterfall.png" width=70%>
</p>
<b><p align= "center"> Figure 1: Agile vs Waterfall methodology. </p></b>

### Agile methodology

We focused on an agile methodology that allowed for an iterative and flexible process as well as a greater focus on user interaction. An agile methodology allowed us to effectively and efficiently respond to adversity and challenges throughout the project. One aspect we really enjoyed, as a team, was the iterative aspect and opportunity to provide ideas on improvement from a wide range of perspectives. This led to a better and improved application after each development sprint. 

When approaching the development stage, we were naturally developing a plan around the SCRUM framework. While there are multiple frameworks that come under the agile methodology, the SCRUM framework suited this project because it provided the development team with a flexible and iterative process but gave each individual deadlines and targets to hit, something critical given the current climate of working from home. Each individual in the team had their role and targets but also had a strong understanding of what other team members were doing. This approach allowed us to focus on quality with the flexibility to change priorities as a team when challenges occurred or we wanted to focus on a specific area before moving onto the next.

Initially, as a team we sat down (albeit virtually) and wrote a list of the key features and components that we wanted FLOCUS to include. We finalised our user personas and basic wireframes, which can be seen here (TODO). The below diagram ([link](https://devcom.com/tech-blog/agile-advantages-for-business/)) is a graphical representation of the cycle of agile development we aimed to follow as a group in the design, development and implementation of our product.

<p align="center">
<img src="../report/Images/methodology-agile.png" width=70%>
</p>
<b><p align= "center"> Figure 2: Agile methodology cycle </p></b>

Below, you can see more about the breakdown of our sprints (TODO link here).

### Communication channels

Due to the COVID-19 pandemic, our team has been working from home throughout the project. This meant that our communication and the channels we used were key to ensuring we worked well as a team. The two main channels we used were our Microsoft Teams and Discord. Our Teams group at desk 20 allowed us to organise video calls, share documents and speak to the lecturing team. However, our most commonly used channel was our Discord chat where we regularly had conversations about specific areas of the project as well as organising voice and video calls to discuss specific areas of development. While it was tough initially to bond as a team, these channels did help us get to know each other and become a driving force as we began development sprints.

<p align="center">
<img src="../report/Images/team_Organisation.png" width=20%>
</p>
<b><p align= "center"> Figure 3: Our Discord Chat Setup </p></b>

The above image displays our discord chat set-up. Initially, all project discussion took place in the general chat. However, once we upped the tempo of work and thus the frequency of chatter, important messages quickly became lost amid the daily discussions. After spending longer than needed searching for a previous message, Hugh, Flocus front-end developer, set-up separate chat rooms and the whole group endeavoured to stick to a strict chatroom regime. This also helped us to cut down on procrastinating chat.

## The Sprint Archive

Throughout development, we consulted prospective users so to continuously tailor our design. At the end of each sprint, we received feedback from these individuals on our previous progress and adapted our development in response to their constructive criticisms. For ethical reasons, we cannot provide any personally identifiable information, although we have included their feedback and our subsequent development responses at the end of each section. For reference, we have provided these individuals’ personal choice of nickname: 

<ul>
  <li>User 1 - Cheese</li>
  <li>User 2 - Mr Water</li>
  <li>User 3 - Toast</li>
</ul>

<br>


### Sprint 1 - A Setback and The Ideation Process

[26th February – 5th March]


Once we had fully understood the project specification and met with everyone in our group (albeit virtually), we started the ideation process. We were eager to work with an external partner as we hoped to convert the upcoming project into a real-world application. We had the initial idea of working with Ecosia, the eco-friendly search-engine seeking to tackle deforestation and climate change. However, after being in communication with their team, our hopes of working with them quickly faded as they were unable to designate resources to onboard us with their databases. We organised a meeting at Desk 20 on Monday morning to discuss the matter and revisit the ideation process. We identified some key objectives for that week:

<ul>
  <li>Revisit the idea matrix and consider new ideas</li>
  <li>Speak to friends and family about proposed ideas</li>
  <li>Finalise the ideation process by the end of the week</li>
  <li>Send out questionnaires to gauge market demand</li>
</ul>

With some creative thinking, we eventually came to the idea of Flocus. Gordon proposed the idea to the Asaqua team and fortunately, they were very keen to take on the proposed project with us. We gained some qualitative feedback on our initial proposal from our end-user group. This is displayed below:

<br>
<div align = "center">
  <table>
  <tr>
    <th>User</th>
    <th>Feedback</th>
  </tr>
  <tr>
    <td> Cheese </td>
    <td>
      <ul>
        <li>Found the idea interesting</li>
        <li>Thought that UX will be important</li>
        <li>Cheese has a problem with procrastinating on deadlines and thought this idea would address this issue</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Mr Water</td>
    <td>
      <ul>
        <li>Liked the idea</li>
        <li>Concerned about it being distracting</li>
        <li>Thought that it was important to be raising awarness for water scarcity</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Toast</td>
    <td>
      <ul>
        <li>Unsure if it would be well recieved by the market</li>
        <li>Was interested to give it a couple of weeks trial</li>
      </ul>
    </td>
  </tr>
  </table>
</div>
<br>

Generally, we received enthusiastic responses to the idea with constructive critism often concerning the hurdles of implementation. We noted the feedback regarding UX and distraction and, designed the upcoming study component to address these concerns. 

<br>


### Sprint 2 - Angular and API setup

[19th March – 26th March]

To make a start, we held an initial development meeting to discuss the components required to begin back- and front-end development. We knew that we were going to have to implement a database for storing glass count data and personal statistics and so an API was required. We identified our week’s objectives:

<ul>
  <li>Generate all required components to kickstart the development process</li>
  <li>Make a start with the study component</li>
  <li>Create our RESTfull API</li>
  <li>Familiarise with the Facebook API and how to access it</li>
  <li>Set-up the general environment: Connect express with docker and MongoDB</li>
  <li>Review feedback from questionnaires</li>
</ul>

<br>


### Sprint 3 - Facebook API issues and Design Time

[26th March – 2nd April]

During the initial stages of development we were able to produce a preliminary design for the home component. This is displayed in the .gif below.

<br>
<p align="center">
  <img src="../report/Images/First_HomeComponent.gif" alt="" width=50%>
  <br/>
  <b>Video: initial home view design </b>
  <br/><br/>
</p>
<br>

Whilst we continued the design of the study component, which was taking longer than expected, we offered the home page to the user group for feedback. We wanted to know if the home component was appropriately designed, given the aim and theme of the application. We recieved the following feedback:

<br>
<div align = "center">
  <table>
  <tr>
    <th>User</th>
    <th>Feedback</th>
  </tr>
  <tr>
    <td> Cheese </td>
    <td>
      <ul>
        <li>Thought the design is visually pleasing</li>
        <li>Was unsure if it fits into the theme of the website</li>
        <li>What is the floating object?</li>
        <li>Thought that it doesn't really stay with the theme of water</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Mr Water</td>
    <td>
      <ul>
        <li>Good</li>
        <li>Thought that it may offer a distraction before you start your revision</li>
        <li>Could sit and watch the animation for a long time if bored</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Toast</td>
    <td>
      <ul>
        <li>Looks proffessionally done</li>
        <li>Was unsure if it sticks to the theme</li>
      </ul>
    </td>
  </tr>
  </table>
</div>
<br>

The feedback from the user group generally hinted that we needed to head back to the drawing board. Although it was disappointing that our first attempt was not adequate for the users’ expectations, it was important that we took constructive criticism onboard to pursue a design that fulfilled our project aims. Subsequent to this, we called a meeting to organise the following actions and events for the week ahead:

<ul>
    <li>Adjust the Home component design to user group feedback</li>
    <li>Complete the Study component front-end development</li>
    <li>Speak to Course Admins regarding the Facebook authentication process</li>
    <li>Complete the implementation of the Facebook authentication process</li>
</ul>

### Sprint 4 - 

In the backend development, one of the key challenges in this sprint was to figure out the logic to correctly store data returned from Facebook with a well-thought-out data model. Not only did we have to ensure the data in our database is always up-to-date, but also to make the data model flexible and future-proof. We had not decided how other components will be interacting with the database at that time, so we went for the normalised approach even though we have a NoSQL database. During this sprint, we were mainly using Postman to test the functionality of Passport.js instead of connecting to the database instance right away, which can visualise the behaviour of the Passport.js and helped the developer to learn using it.

### Sprint 5 - 

### Sprint 6 - 

During this sprint, we implemented most of the middle tier RESTful APIs, which are the bridges between the components and the database. The frontend components of our application do not directly access the APIs but through the Angular data service. Although we tested our RESTful APIs like what we did for the Passport.js in the previous sprints, we struggled to pass the request body to the API through the Angular HTTP client. Whilst we were testing our get requests to the APIs with Postman, we passed a request body in JSON format to the API as parameters to the MongoDB Query. However, we did not realise that the Angular HTTP client does not support sending a request body, which causes the API to receive undefined values as the parameters. Eventually, we found a workaround to pass the necessary parameters as HTTP params via the data service. It took some time for our developers to figure out what was happening, so the related tasks in this sprint had a slight delay in delivery.

### Sprint 7 - 

After having the necessary APIs functioning as planned, the study and the league component require the successful login status given in the login process. It also needs the UID as the key to the Record collection. We then created several more get requests to confirm the login status and retrieve the UIDs for those components. We also soon realized that just relying on the UID as a key to get the league table, which involves looping and sorting, was rather computationally complex (in the worst case the complexity is O(n^2n) which, might hinder our server’s reliability). Therefore, we reconstructed the MongoDB query to become multi-staged, leaving all the complex computation to MongoDB to speed up the data retrieval process.


## Meet The Team

<table>
<tr>
  <th>      Name      </th>
  <th>Photo</th>
  <th>Team role</th>
  <th>Biggest lesson learnt during the project</th>
</tr>
<tr>
  <td> Sam Fitton </td>
  <td><img src="../report/Images/circle-cropped (6).png" width=1000%></td>
  <td>Sam's role has been focused on full-stack development with a focus on designing the front-end and integrating Facebook's log-in onto the page. </td>
  <td></td>
</tr>
<tr>
  <td> Hugh Hamilton-Green </td>
  <td><img src="../report/Images/circle-cropped (5).png" width=1000%></td>
  <td> Hugh's role has been focused on the front-end design and implementation alongside keeping up-to-date with documentation and ensuring the construction of report alongside development. </td>
  <td> I really enjoyed learning about end-to-end development with a focus on user experience (UX).</td>
</tr>
<tr>
  <td> Jati Wicaksono </td>
  <td><img src="../report/Images/circle-cropped (8).png" width=1000%></td>
  <td> Jati's role has been focused on the back-end with particular focus on building our API and integrating with Facebook's API allowing login usability on the page. </td>
  <td></td>
</tr>
<tr>
  <td> Gordon Tse</td>
  <td><img src="../report/Images/circle-cropped (7).png" width=1000%></td>
  <td> Gordon's role has been focused on the back-end with particular focus on the database and integration with the Facebook API and data upkeep. </td>
  <td></td>
</tr>
<tr>
  <td> Tom Cockain </td>
  <td><img src="../report/Images/circle-cropped (9).png" width=1000%></td>
  <td>Tom's role has been focused on integration of front and back-end and aiding Gordon with the database and how we display the selected data on the front-end.</td>
  <td></td>
</tr>
</table>

## Sprints documentation

## Team use of git

Our team created a remote repository on GitHub for collaboration and version control. In our repository, there are mainly the main branch and different personal branches. We use the main branch to maintain our latest production-ready working copy. During the sprints, each of our developers has his personal feature branch, where we make a frequent commit to achieve effective version control during the sprints. Once the newly developed features are ready to merge with the production-ready working copy on the main branch, we either submit a pull request or inform the entire team about the incoming changes. Therefore, all developers can pull from the latest change, review the code and test the latest working copy with Docker.

<p align="center">
<img src="../report/Images/git_diagram.png" width=70%>
</p>
<b><p align= "center"> Figure : Diagrammatical representation of our GitHub repository . </p></b>

# Project report navigation

- [Next page: Evaluation](https://github.com/STF1998/Desk20/blob/main/report/evaluation.md)
- [Previous page: UX Design](https://github.com/STF1998/Desk20/blob/main/report/UXDesign.md)
- [Go back to Homepage](https://github.com/STF1998/Desk20)