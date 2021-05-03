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


### Sprint 2 - Angular and API setup

[26th March – 2nd April]

<p align="center">
  <img src="../report/Images/initial_homeview.move" alt="" width=50%>
  <br/>
  <b>Video: initial home view design </b>
  <br/><br/>
</p>






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
- [Previous page: System Implementation](https://github.com/STF1998/Desk20/blob/main/report/systemImplementation.md)
- [Go back to Homepage](https://github.com/STF1998/Desk20)