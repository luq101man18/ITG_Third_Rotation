# ITG Third Rotation (React Native)

### The rotation had two main phases:
- Demo phase
	- Reviewed and learned React native (RN) materials then built a demo RN application.
- E-commerce Application phase
	- Applied all new learned materials and more by building an E-commerce React native application that enables users to purchase 

## Demo Phase: 
 - SessionTime: Session app where user is able to do the following:
	 - Create a task
	 - Set the task duration
	 - Start the task
	 - Stop the task timer
	 - See all completed tasks

> To further explore the app please navigate to stopWatch folder in the repository

## E-commerce Application Phase
###### Elevation E-commerce Application
  - In this app there are the following features:
    - Login: Registered users can login easily by providing their email and password 
    - Registration: New users are able to register easily with few required information
    - Home:
      - User will be able to search for products from home by pressing in the top search bar or using the bottom nav bar
      - Products are fetched and displayed. Moreover, pagination is implemented to improve user experience.
      - Users can see products details by simply pressing on the product.
      - Users can also use a filter feature that allow them to filter products.
      - finally, a bottom navigator bar that navigates between (Home, Search, favorites, Cart, Account)
    - Search:
      - Users are able to search for products by typing on the top search bar at the search screen.
      - The app will fetch for products after the second letter.
      - five products will be displayed on the screen, and users will be able to see product details by pressing on the product.   
      - To see all potential products, press on the button magnify icon next to the search bar to go to searched products screen.
    - Searched products:
      - Searched product screen display all products found for the searched term.
      - Also, the user will be able to filter and sort products. 
    - Filter and sort:
      - Allow user to sort products in three ways (High to low, Low to high, relevance)
      - Allow user to filter products based on a price range.
    - Product details page:
      - PDP display all information (title, price, description, etc) about the pressed product.
      - User will be able to add the product to cart as well as increase the quantity of the product and decrease it. 
    - add to favorite:
      - User will be able to add to favorite by pressing on the heart icon on the product image.
      - Favorite screen display all favorite products.
    - add to cart and cart screen:
      - Allow user to add the product to cart.
      - In the cart screen, the user will be able to:
        - Increase quantity of the product
        - Decrease quantity of the product
        - Delete the product
        - See total price that includes all products, taxes, and shipping
        - Checkout
    - Checkout:
      - In the checkout screen, the user will be able to:
        - See and modify address
        - Choose payment method
            - Card
              - User will be able to modify and change the cards
            - Cash
            - Apple pay
        - See total price again
        - Place the order
    - Account to manage personal information:
      - User will be able to:
        - See personal information
        - See cards
        - See addresses
        - Logout
    - Personal info details screen
      - The following information will be displayed:
        - Full name
        - Date of birth
        - Email
        - Phone number
        - Gender
    - Payment methods screen:
      - User will be able to see available cards.
      - User will be able to add new card.
    - Address screen:
      - User will be able to see saved addresses.
      - User will be able to add new address.
    - Placed orders screen:
      - User will be able to see all placed orders
    - Logout:
      - User will be able to logout by simply pressing on logout in the account screen.
    
	- The app utilizes the following: 
	    - Utilizes redux store management to manage data between components.
	    - Utilizes dummyJSON as a backend.   
