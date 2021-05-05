![Creating great tasting products to lead a healthy lifestyle (5)](https://user-images.githubusercontent.com/69913789/115699970-1f298480-a35e-11eb-9b02-e05db4e47209.gif)

# Evaluation [15%]

## Contents of Evaluation

- [**Details of design evaluation**](#Details-of-design-evaluation)
- [**Unit/Functional testing**](#Unit/Functional-testing)
  - [Cross browser compatibility testing](#Cross-browser-compatibility-testing)
- [**User acceptance testing**](#User-acceptance-testing)
  - [Alpha testing](#Alpha-testing)
  - [Beta testing](#Beta-testing)

## Details of design evaluation 

As previously discussed in our sprints and UX sections, we wanted to be customer-centric when approaching our design process. Continuous feedback from our end-user group (Cheese, Mr Water and Toast) facilitated consistent adaptation to customer requirements. We also felt that our initial questionnaire provided an early indication as to what our target audience is searching for in an application. Additionally, these early results provided insight into the potentially bad habits of our target audience and areas of improvement that we attempted to address. 

Some crucial lessons from the front-end design of Flocus have been discussed below:

<br>
-	The ability to self-regulate

Qualitative feedback can be very insightful and often provides advice that was never previously considered. It can also provide exciting and novel ideas – prospective end-users are, by nature, very needy and are always looking for the best from a potential product. The consequence of this is scope creep which, is the gradual growth in the scope of the project to an unrealistic size. Many in the group agree that this is certainly something that occurred too frequently. As such, it is crucial in these scenarios, to instil a degree of self-regulation to maintain a steady trajectory.


-	Be evidence-led

In the early sprints, front-end development often felt like a random walk – throwing multiple CSS animations and effects together to see if it produces something visually appealing. This approach was proven inept when evidence from Cheese’s and Mr Water’s initial feedback on the home component showcased the ability of the end-user to look through appealing designs. In an attempt to rectify the wrongs of our previously botched attempts at creating high fidelity designs, we turned to the scientific literature to provide an accurate representation of our project aims through the implementation of our designs. The consequence of this was a well thought-out and impactful study component that not only portrays the correct image for Flocus but also receives approval from prospective customers. 


-	Beware of group thinking

Although this point is short, we believe it is one of the most important. The quality of feedback in the development stage of a project is a valuable asset that can determine the final success or failure of that project. One key finding that we discovered during feedback sessions was that individual opinions often converged when in a group setting. In the future we hope to hold feedback sessions on a 1-to-1 basis.

<br>

## Unit/Functional testing

When developing any software, it is key to consider testing to pick up an bugs or errors in the software code. When developing a single page application with a clear focus on user experience, functional testing is key to avoid the end-user coming across any bugs/errors. 

Often a user will be put off by the simplest of bugs. There is a level of trust between the user and organisation; if they come across errors they may not trust the organisation to store important data i.e. in our example it is handling their login details but in future development this could include payment data. Therefore, testing is critical to software success, particualrly with a single poage application focused on user experience. 

### Cross browser compatibility testing

<br>

<p align="center">
<img src="../report/Images/cross-browser-compatibility.png" width=40%>
</p>

<br>

We wanted to ensure that prospective users are not restricted to use a specific browser when accessing our application. Thus, it was crucial to develop and test the flocus application to ensure libraries, functions and effects were supported in all browsers and not just the most popular, such as Chrome. During the development process we ran manual tests on three of the main four browsers:

<ul>
    <li>Google Chrome</li>
    <li>Firefox</li>
    <li>Microsoft Edge</li>
</ul>

We tested the study component on Safari but, on reflection, did not have a comprehensive approach to continuous testing in this browser. As such, during Sprint 6 when our front-end developers ran manual cross-compatibility tests, we identified a potential issue with our application – when a Cascading Style Sheet animation is triggered on the same page as a Lottie animation, the animation will glitch and flicker. This did not produce a complete deterioration in functionality but, drastically impedes the experience (glitchy applications can be very frustrating for the user).

This error is frequently reported in forums and is displayed when accessing the Lottie page via Safari. We have passed the relevant information onto Asaqua for future adjustment when Safari or Lottie resolves this matter. Generally, we wanted to avoid browser detection via user agents but, on this unique occasion it has been justified and users will be unable to view Lottie animations when using the Safari browser. This intervention has ensured that our application has been proven cross-compatible with the popular four browsers in our manual testing.


# User testing

Due to our target end user being the same demographic as every team member, we were fortunate to have abundance of possible end-users to test out Flocus on. When setting out our usability testing plan, we wanted to focus on ensuring we had tested the following key points:

- Users can complete the main action of using the visual aid as a study tool
- Users can navigate the pages easily 
- Don't come across any significant bugs/errors
- Have an enjoyable experience of Flocus

## User acceptance testing

### Alpha testing

Throughout the development process, Sam and Hugh focused on building and running Flocus to ensure there were no bugs in the code by testing out manual scenarios. As we approached the end of the development sprints, Hugh and Sam worked together to devise several possible user scenarios and flows from the landing page. These test cases were based off the user stories/personas created when designing the front-end. 

Please see below a table summarising some of the key user test cases along with pass/fail:

<table>
<tr>
  <th>Stage</th>
  <th>Page</th>
  <th>Description</th>
  <th>Pass/fail</th>
</tr>
<tr>
  <td> 1.1 </td>
  <td> Landing page</td>
  <td> Check the login via Facebook button. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 1.2 </td>
  <td> Landing page </td>
  <td> Check animations load correctly. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 1.3 </td>
  <td> Landing page </td>
  <td> Check capability to login via Facebook. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 2.1 </td>
  <td> Homepage </td>
  <td> Ensure all links to homepage work. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 2.2 </td>
  <td> Homepage </td>
  <td> Ensure the STUDY button works. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 2.3 </td>
  <td> Homepage </td>
  <td> Ensure the LEAGUE button works. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 2.4 </td>
  <td> Homepage </td>
  <td> Ensure the ASAQUA button works. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 2.5 </td>
  <td> Homepage </td>
  <td> Ensure the logo animation is working and Flocus is visible. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 3.1 </td>
  <td> Study page </td>
  <td> Ability to click the button to start filling the glass. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 3.2 </td>
  <td> Study page </td>
  <td> Ensure the glass count increases after the 25 minutes has elapsed. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 3.3 </td>
  <td> Study page </td>
  <td> Ensure the glass filling animation runs after clicking the start button. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 3.4 </td>
  <td> Study page </td>
  <td> Ensure the back to homepage button works. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 4.1 </td>
  <td> League page </td>
  <td> Ensure both the league table and weekly graph is being inputted. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 4.2 </td>
  <td> League page </td>
  <td> Ensure ‘Your Week’ graph is updated after a study session has been completed. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 4.3 </td>
  <td> League page </td>
  <td> Ensure the back to homepage button works.</td>
  <td> Pass </td>
</tr>
<tr>
  <td> 5.1 </td>
  <td> ASAQUA page </td>
  <td> Ensure the the text about Flocus and ASAQUA is readable - i.e. font, font size and colour. </td>
  <td> Pass </td>
</tr>
<tr>
  <td> 5.2 </td>
  <td> ASAQUA page </td>
  <td> Ensure the back to homepage button works.</td>
  <td> Pass </td>
</tr>
</table>


This helped pick up minor bugs, including:
- issues with the glass filling up animation
- issues with the font and size of some of the text on the about page

One area that was also picked up was the compatability with different browsers. Having researched online, we realised this is a common error when working with Angular-CLI. Therefore, we have identified this as a future work on going forward. 

### Beta testing

As part of our user acceptance testing, we undertook field testing with real end-users. However, due to limited ethical approval and time restraints, we ran a single focus group with 8 friends and peers across Zoom. Focus groups are a great method to help understand user experiences and opinions of web applications. However, in the future we advice combining focus groups with interviews and questionairres to help avoid groupthink.

To ensure these individuals remained anonymous and we abide by ethical guidelines we did not record or take ask for any personal data from those involved in the focus group. Instead, we took written observation notes and asked individuals to anonymously add to a Lucidchart to help develop a version of an affinity chart.

The focus group focused on the following areas:
- thoughts on aesthetics of the web application
- possible user scenarios
- user walkthroughs

By focusing on the above areas, it made it easier to find any bugs and share anonymous opinions about the design and implementation of Flocus. To enable an effective and efficent focus group, we launched a live version of Flocus through Heroku. To allow our users to access our application from the public domain, we used the Heroku node.js hosting platform to deploy the application for beta testing. Since we were already using Docker to test our application during development, we just had to push our Docker image to Heroku, which is run on its dynos container just like in our Docker container. In addition, we replaced the Docker mount volume with the MongoDB Atlas DBaaS for the database, which is accessible from the public domain and stores testing data persistently. Then, we randomly distributed some Facebook testing accounts to our users, allowing them to use our application on their computer anonymously. We allowed the users three days to test and try out our application.

After completing user walkthroughs, which has motivated some minor changes as listed in the sprints section and the future development section, we then asked the focus group to contribute to an affinity diagram on the strengths and weaknesses of Flocus. 

Please see below the affinity diagram using Lucidchart:

<p align="center">
<img src="../report/Images/focus_affinity.png" width=70%>
</p>
<b><p align= "center"> Figure : Affinity diagram from user feedback </p></b>

The key improvement points identified from the focus group, include the following:

- greater personalisation with ability to select work time
- ability to be in the league table with their friends
- timer alongside glass to help know time instead of guessing
- Facebook logout button missing

#### Future methods

Possible types of future user testing, include:

- Surveys - help understand user experience.
- A/B testing - experiemtn with different versions
- Heat map testing - help undersatnd how users move about the web page
- Further in house testing

Please see the conclusion section to learn more about future evaluative technqiues.

## Project report navigation

- [Next page: Conclusion](https://github.com/STF1998/Desk20/blob/main/report/conclusion.md)
- [Previous page: Sprints and Project Management](https://github.com/STF1998/Desk20/blob/main/report/sprints%26ProjectManagement.md)
- [Go back to Homepage](https://github.com/STF1998/Desk20)
