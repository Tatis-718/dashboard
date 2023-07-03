# Dashboard
Financial dashboard built in React with C# as the programing language in ASP.NET Core and SQL Db.
This repo contains the following files:

# Main Dashboard Component (BorrowersDashboard)
This is a Functional Component where I built the logit that will handle the initial AJAX request to retrieve the user's data from the Db based on the user's Id. Once the user successfully logs in to the application the Id is retrieved thru the authentication process at the API controller level. 

# Loan Calculator Component
A Functional Component rendered by the BorrowersDashboard component as a child, I built this component using Formik to capture user input and store the data from the input in state. After the collection of user input and the null check, I wrote a formula to calculate in real-time loan facts based on 3 input fields that include Loan Amount, Loan Term, and Interest rate Using the Math functions. The results of the calculations are displayed below the input field and are updated in real-time, meaning if the user makes any changes to the input at any point the total changes without a page refresh.

# Borrowers Loan Activity
A Functional Component rendered by the BorrowersDashboard component as a child, I built this component using react-bootstrap to create the rows, columns, and cards visible to the user in the style of Figma. In this component, the data received from the AJAX call is passed as props from the parent component and then map into the cards after being validated by the prop-types. The data is retrieved on a most current application basis and displayed to the user in a small snippet card inside the main card's body with a header that contains a unique identifier for each loan application.

# Credit Score Indicator
This section built inside the Parent component displays the user's credit score which is retrieved from the Db, the property with the credit value is stored in state, then passed to the React-Score-Indicator package as props. The color scheme for the indicator I made it as an outside source in a js file to construct the current color scheme ratio so that the indicator has a more accurate representation of each credit range, from poor to excellent.

# Borrowers Current Lenders Component
This Functional Component is rendered by the BorrowersDashboard component as a child, here I built the logic to display a card for each lender the borrower has a loan or applying for a loan, using react-bootstrap, props, and prop-types I created a nice fluid section where each card has a Btn with a link that takes the user to the respective clicked Lender' profile by using the Lender Id.

# Banking Resources Component
These is a Functional Component, In here I present the user with 4 cards containing each a Btn, body descriptive text, and header. Each Btn has a link to it that travels to the specified resource. The blogs in particular receive props from the main component which are validated by the prop-types and null check by (?). These props are mapped into the card where the blog title is then turned into a link that can take the user to the respective blog by using navigate and passing the blog data as state to the receiving component and rendering the blog to the UI. 

# C# ASP.Net Core Web Api
In Visual Studios, I used C# as the programing language to build the models, service files, methods, interfaces, and API controller. The method consists of a Get call where I used mapping logic to map the data received from the SQL Db and create 1 response item with all the data for the Borrowers Dashboard UI. The data is then packaged into its own property and classified into paged items or a list. The controller uses Identity Authentication to retrieve the correct data by pulling the currently logged-in Used as one of the parameters for the service method.

# SQL 
Within the SQL Db, I build, queried, and designed tables and stored procedures to manage users' data using T-SQL. Using pagination logic and targeting the data by user Id and joining tables where I could target the Primary Key to the Foreign Key relations and package the result into the proper response format to be read by the middle-tier services. 
