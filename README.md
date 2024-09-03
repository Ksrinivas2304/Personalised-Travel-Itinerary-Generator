[Personalised Travel Itinerary Generator](https://srinivas-travel-itinerary-generator.vercel.app/)
---

## **Introduction**

The **Personalised Travel Itinerary Generator** is a React-based web application designed to generate custom travel itineraries based on user inputs. The application uses several technologies to provide a seamless user experience, including Google OAuth for authentication, Google Gemini API for generating travel plans, and Firebase for data storage. The project is deployed on Vercel and can be accessed [here](https://srinivas-travel-itinerary-generator.vercel.app/).

---
![1](https://github.com/user-attachments/assets/37570b87-ec89-4b5f-b4fd-d775b9fa480e)

---

## **Architecture Overview**

The application is built using the following key components:

1. **Frontend**: Developed with React, utilizing Tailwind CSS for styling and Vercel for deployment. The frontend includes:
   - **Header Component**: Manages user authentication and profile display.
   - **Hero Component**: Provides an introductory section and call-to-action for users to get started.
   - **Itinerary Generator**: Interacts with the backend to fetch and display personalized travel itineraries.

2. **Backend**: Utilizes Google Gemini API for generating travel plans and Firebase for data management.
   - **Google Gemini API**: Handles the generation of travel itineraries based on user inputs.
   - **Firebase**: Manages user data and authentication.

3. **Authentication**: Google OAuth is used for user authentication, ensuring secure access to personalized features.

---
![4](https://github.com/user-attachments/assets/745495cf-4234-4ad6-aa4d-2c60479370fc)
---

---
![5](https://github.com/user-attachments/assets/4da11034-f2ca-4dfe-9dc1-7d728f209062)
---

4. **Deployment**: The project is deployed on Vercel, ensuring scalability and performance.

5.Technologies Used
* React: For building the user interface with a component-based approach.
* Tailwind CSS: For styling, ensuring a responsive and modern design.
* Google Generative AI: For generating personalized travel itineraries.
* Google Places API: For retrieving details about locations.
* Firebase Firestore: For storing and managing user data and trip information.
* Google OAuth: For user authentication and authorization.
* Vercel: For deploying the application.

## **Key Decisions**

- **React**: Chosen for its efficient rendering and component-based architecture, making it suitable for building interactive UIs.
- **Google Gemini API**: Selected for its advanced capabilities in generating personalized travel itineraries.
- **Firebase**: Used for its robust authentication and real-time database features, facilitating secure data management and user authentication.
- **Vercel**: Deployed on Vercel for its ease of use and seamless integration with GitHub for continuous deployment.

## **Implementation Details** 

**User Interaction**
* Users interact with the application through a series of steps:
- * Sign-In: Users sign in using Google OAuth, which authenticates them and manages their session.
- * Create Trip: After signing in, users can access the "Create Trip" page to input their travel preferences.
- * Generate Itinerary: Users submit their preferences, and the application uses Google Generative AI to generate a personalized travel plan.
- * View Results: The generated itinerary, including hotel options and place recommendations, is displayed on the results page.

**Code Functionality**

- * Header Component: Manages user authentication, displays profile information, and provides navigation options. Handles sign-in and sign-out operations.
- * Hero Component: Provides an introductory section with a call-to-action button for starting the trip planning process.
- * Itinerary Generation: The backend APIs are called to retrieve and process data based on user inputs, which is then used to generate and display the itinerary.

**Inputs Required**

- * Location: The destination for the travel itinerary.
- * Trip Duration: The number of days for which the itinerary is to be generated.
- * Budget: The budget constraints for hotel options.
- * Travel Preferences: User preferences for places to visit and activities.

---
![3](https://github.com/user-attachments/assets/e79937dc-11be-4a2f-bf8c-b435a864c5d7)
---

---
![2](https://github.com/user-attachments/assets/d6a8c466-7255-4bc1-934f-6ed976bf4dd6)
---

---
![7](https://github.com/user-attachments/assets/ece59e3f-8a9c-437f-8b17-c3a9c78f6ef9)
---
---
**My trip**
![6](https://github.com/user-attachments/assets/db06d0b7-9a25-4ffa-9d1c-11948dcf05d6)

## **Challenges and Resolutions**

- **API Integration**: Initially faced issues with API integration. Resolved by referring to API documentation and adjusting the request parameters.
- **Authentication Issues**: Encountered problems with user authentication. Addressed by implementing proper error handling and ensuring correct API keys were used.

## **Suggestions for Improvement**

- **Enhanced UI/UX**: Improve user interface and experience with more interactive elements and better visual design.
- **Additional Features**: Include features such as saving and sharing itineraries, and adding more customization options for travel plans.
- **Performance Optimization**: Optimize application performance by reducing load times and improving responsiveness.

The project is successfully deployed on Vercel, offering users a scalable and responsive web application for generating personalized travel itineraries.

## **GitHub and Project Links**

- **GitHub Repository**: [Personalised Travel Itinerary Generator](https://github.com/Ksrinivas2304/Personalised-Travel-Itinerary-Generator)
- **Project URL**: [Travel Itinerary Generator](https://srinivas-travel-itinerary-generator.vercel.app/)
- **Portfolio**: [Kusumanchi Srinivas](https://linktr.ee/Ksrinivas2304)


---
![Screenshot 2024-08-27 202015](https://github.com/user-attachments/assets/a3a4fb1d-a322-41e8-9ac5-6d7874a9850b)



