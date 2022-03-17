# ShopBridge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

## Steps to run the application

Since this application uses MongoDB and Node.js, the following steps need to be executed in the mentioned sequence to run it:
1.	Open the command prompt at the <b> ..\MongoDB\Server\4.4\bin</b> path, type <b>mongod</b> and press enter to run the command

2.	Assuming the user has not imported the .csv file in MongoDB, run the following command at the location where the .csv file is placed:
<b> mongoimport --db=ShopBridge -c=ecommerce_sample --type=csv --headerline --file=ecommerce_sample.csv </b>

3.	At the path where the code for ShopBridge Application has been placed, open the command prompt and run the below command:
	<b>node server.js</b>

4.	At the same location, open another command prompt and run <b>ng serve</b> or <b>npm start</b> to run the Angular application

5.	Now, open the browser with the URL as: 
<b>localhost:4200</b>

## Implementation Details

The ShopBridge application has been developed to help the administrator of the E-Commerce website to manage the array of items that are hosted on the platform. For making it as close to the real-time experience as possible, I have used a dataset containing details of products hosted on Flipkart. The link for the same is mentioned below:

<a href="https://www.kaggle.com/PromptCloudHQ/flipkart-products">Dataset for FlipKart</a>

The dataset contains details for about <b>20,000</b> products based on 15 parameters out of which I have used 6 columns I consider to be relevant to this application. The data has been cleaned and now only contains unique values, pid being the key for identifying the distinct entries. I have taken the liberty to add 2 more columns, required and in_stock, assuming the quantity of items forecasted to be sold over a period and the number of items in the inventory.
I have used <b>MongoDB</b> and <b>Node.js</b> to import and retrieve this data in the <b>Angular</b> application. <b>REST APIs</b> have been used to <b>view</b>, <b>update</b> and <b>delete</b> data from the database.
The application has been divided into the following components, services, pipes and directives:

I.	Components
•	Header
•	Search-Modal
•	Item-Details
•	Item-List
•	Modify-Item

II.	Pipe
•	Search

III.	Directive
•	NumberCheck

IV.	Service
•	CommonService

V.	Routing
•	App-Routing

The functionalities of each of these is mentioned below:
•	Header
Since header of an application is accessible from all the pages hosted on the website, it is important to ensure that most of the pages, in the navigation, in the header are accessible from it. Hence, I have added the options for Home (Item-List), Search (Item-Details) and Adding an Item (Modify-Item) in the header component. The header also displays the name of the page the user is currently on.

![image](https://user-images.githubusercontent.com/101333249/158749337-483138ac-1ea3-429c-87aa-a23e19c29129.png)

•	Search
The search functionality has been integrated in the application to make it effortless for the user to find the item they are looking for. To implement this, I have used <b>pipe</b> for filtering the list of products based on the name of the product the user enters. This pipe then returns an array of objects that matches the entered criteria. The user can then click on any of the item in the filtered dropdown and they will be redirected to the Item-Details page, which lists the details of the selected item.

![image](https://user-images.githubusercontent.com/101333249/158749417-bff929a3-282d-447d-92da-e6aa07bff606.png)

•	Item-List
Since the application is written from the perspective of the administrator, the first page of the application contains brief details of all the items listed on the said e-commerce website. I have added the following features for making this component more user friendly:
a.	Used <b>pagination</b> to browse through the items, showing 15 items per page, so that the user doesn’t feel overwhelmed with the data in front of them.
b.	Also added the option to <b>sort</b> each of columns in both ascending and descending order, making it easier and quicker for the user to calculate the range of data hosted.
c.	Have added the options for displaying the item in more detail, edit the data for an item and deleting the data from the list against each of the items, hence making the functionalities more accessible for the user.

![image](https://user-images.githubusercontent.com/101333249/158749527-4f451f78-7177-4242-bd2c-06dbb327da4e.png)

•	Item-Details
The user will be navigated to this page when they click on an item by either searching for it or by directly clicking on the ‘View Details’ option in the Item-List component. When either of these actions occur, the URL is updated and the pid of the item is passed in the query params as a parameter. An API call is then given to fetch the details about the product. The options for modifying and deleting the item details from the database are accessible from this page as well.

![image](https://user-images.githubusercontent.com/101333249/158749603-8f8d32cf-8573-449a-8d83-f7e65ac00b7e.png)

•	Modify-Item
This component showcases <b>reusability</b>, as it allows the user to both add and modify an item in the same component. This has been done using <b>routing</b>. I have added a parameter called ‘mode’ to determine if the user is trying to fill in the details for a new item or if they are trying to modify the details of an existing one. Both flows are explained below:
1.	Modifying an existing item
The details of the item that needs to be modified are passed to a <b>Behaviour Subject</b>, whose value is then read in the Modify-Item component if the mode is passed as ‘edit’. This value is then prefilled in the item modification form, allowing the user to verify and edit the data. However, the product id field remains un-editable in this mode as it is meant to be unique. As both the flows are meant to serve very different purposes, I have created 2 different APIs. The one for modifying the data gets called when the user tries to save the changes they have made to the details of an item.

![image](https://user-images.githubusercontent.com/101333249/158749765-140578e8-ef20-4cf1-86dc-30e87d82ef41.png)

2.	Adding a New Item
As the user of this application will be an administrator, the option for adding an item has been placed in the header section, so that it is always accessible. The routing path remains the same as the one for modifying item as the same component has been reused in this case, but the ‘mode’ parameter is checked for the value ‘new’ to process the entered details as for a new product. Hence, the product id becomes editable in this case. As conveyed earlier, the product id should be unique, this is ensured by checking it against the product ids for all the existing products.

![image](https://user-images.githubusercontent.com/101333249/158749790-c5649f62-b2b1-471a-a9a5-2fab8331ce28.png)

As this is a form, validations for all the fields have been added as follows:
1.	Product name
•	Mandatory
•	Only Alphanumeric characters allowed
•	Minimum Length: 1 character
•	Maximum Length: 200 characters

2.	Brand	
•	Mandatory
•	Only Alphanumeric characters allowed
•	Minimum Length: 1 character
•	Maximum Length: 200 characters

3.	Product ID
•	Mandatory
•	Only Alphanumeric characters allowed
•	Minimum Length: 15 characters
•	Maximum Length: 20 characters
•	Should be unique

4.	Description
•	Mandatory
•	Only Alphanumeric characters allowed
•	Minimum Length: 1 character
•	Maximum Length: 500 characters

5.	Retail Price
•	Mandatory
•	Only numbers allowed
•	Upper and lower arrow keys will help the user to manipulate the numbers as per their requirements

6.	Discount Price
•	Mandatory
•	Only numbers allowed
•	Upper and lower arrow keys will help the user to manipulate the numbers as per their requirements

7.	In Stock
•	Mandatory
•	Only numbers allowed
•	Upper and lower arrow keys will help the user to manipulate the numbers as per their requirements

8.	Forecasted Demand
•	Mandatory
•	Only numbers allowed
•	Upper and lower arrow keys will help the user to manipulate the numbers as per their requirements




