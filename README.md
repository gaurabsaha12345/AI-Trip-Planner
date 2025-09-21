# 🤖 AI Trip Planner

Welcome to the AI Trip Planner! This intelligent application leverages the power of Google's Gemini API to help you craft personalized and unforgettable travel itineraries effortlessly. Say goodbye to stressful planning and hello to your next adventure.

[![AI Trip Planner Screenshot](https://img.notionusercontent.com/s3/prod-files-secure%2F1585ff93-fbc0-49bb-8539-1ec75f7a5070%2Fa89a2e21-c438-40cc-96e2-cd0464d4a3bd%2Fbandicam_2025-09-21_22-54-29-508.jpg/size/w=1420?exp=1758561943&sig=K5wcf87ZpSQNv3jCtSKZmy--tVRhPHSKBLibFXV5Fk0&id=275e6489-8eba-80a4-894f-daab67d7ba3b&table=block)](#)

[![AI Trip Planner Screenshot](https://img.notionusercontent.com/s3/prod-files-secure%2F1585ff93-fbc0-49bb-8539-1ec75f7a5070%2F7239ec46-6813-4d2f-bd84-2b3714c09574%2Fbandicam_2025-09-21_22-57-22-571.jpg/size/w=1420?exp=1758562143&sig=7qvnMcCNd-2n1q8KQljeKOlYaBlg5E7LjfFxhUqN_aU&id=275e6489-8eba-8024-85d5-e0c8ebdbc8f0&table=block)](#)

[![AI Trip Planner Screenshot](https://img.notionusercontent.com/s3/prod-files-secure%2F1585ff93-fbc0-49bb-8539-1ec75f7a5070%2F75893caa-c07c-4bc4-bc73-38be1c7ee8ac%2Fbandicam_2025-09-21_22-57-51-219.jpg/size/w=1420?exp=1758562141&sig=0fWGb78Hc5f34C4MJRbu0eqXPvPYbIkDTatQP-d5rYc&id=275e6489-8eba-800d-a748-d0be042c8f59&table=block)](#)

---

## ⭐ Why This Trip Planner is Different

This AI Trip Planner distinguishes itself from many existing solutions in several key ways:

* **🚀 Deeply Personalized & Dynamic:** Unlike static itineraries, this solution generates a unique, end-to-end plan from scratch for **every** request. It dynamically weaves together your specific destination, budget, dates, interests (e.g., Foodie, Adventure), and preferred pace into a coherent, daily schedule.

* **🧱 Structured & Reliable Output:** A critical differentiator is its use of a strict JSON schema for the AI's response. The application receives predictable, structured data, not just a block of text. This allows for a rich and reliable user interface with features like cost breakdown charts and daily collapsible views.

* **💰 Comprehensive Financial Planning:** The tool doesn't just suggest activities; it provides an estimated cost for **each activity** and aggregates this into a categorical Cost Breakdown (e.g., Flights, Food, Accommodation), giving you a realistic financial overview tied directly to your stated budget.

* **🎨 Integrated User Experience:** The application provides a seamless flow from initial ideation to a tangible, interactive plan. The multi-step form, engaging loading screen, and a final display that integrates a map, data visualizations, and a clear timeline make the plan easy to understand and use.

---

## ✨ Features

* **📝 Multi-Step Preference Form:** A guided, three-step process to capture your travel preferences:
    * Step 1: Destination and Dates.
    * Step 2: Budget and travel pace (Relaxed, Moderate, Packed).
    * Step 3: A selection of interests (e.g., Culture, Nightlife, Nature).

* **🧠 AI-Powered Itinerary Generation:** The core feature uses the Gemini API to create a detailed, day-by-day travel plan.

* **📊 Interactive Itinerary Display:**
    * A summary header with the trip title, destination, duration, and total estimated cost.
    * A day-by-day plan with collapsible sections for each day's activities.
    * Each day includes a theme, a timeline of activities with descriptions, and individual cost estimates.

* **📈 Cost Breakdown Visualization:** A pie chart visually represents the distribution of the total cost across categories like Accommodation, Food, and Activities.

* **🗺️ Embedded Destination Map:** An interactive Google Map showing tourist attractions in your chosen destination.

* **📄 Print / Save Functionality:** A one-click option to print the itinerary or save it as a PDF.

* **🎟️ Mock Booking System:** A "Book Now" button opens a registration modal to enter traveler details, complete with form validation and a confirmation message.

* **⏳ Engaging Loading State:** An animated spinner with rotating messages (e.g., "Crafting your perfect journey...") keeps you engaged while the AI generates the plan.

* **📱 Responsive Design:** Built with Tailwind CSS, the UI adapts perfectly to different screen sizes.

---

## ⚙️ How It Works

Here is the primary user flow from start to finish:

Actor: User
System: AI Trip Planner

User arrives at the application.
-> System displays the multi-step Preference Form (Step 1).

User enters Destination and Dates and clicks "Next".
-> System displays Step 2 of the form.

User enters Budget, selects Pace, and clicks "Next".
-> System displays Step 3 of the form.

User selects multiple Interests and clicks "Generate Trip".
-> System displays a full-screen loading spinner with messages.
-> System sends the collected preferences to the Gemini API.

System waits for the API response.
-> Gemini API processes the prompt and returns a structured JSON object.

System receives and parses the JSON data.
-> System hides the loading spinner.
-> System displays the interactive itinerary.

User interacts with the itinerary (expands days, views chart, etc.).

User clicks the "Book Now" button.
-> System displays the Booking Modal.

User fills out the booking form and clicks "Confirm Booking".
-> System validates the form and shows a "Booking Confirmed" success message.


---

## 🛠️ Technologies Used

* **Frontend Framework:** React
* **Language:** TypeScript
* **AI Service:** Google Gemini API (`@google/genai` SDK)
* **Styling:** Tailwind CSS
* **Data Visualization:** Recharts
* **Runtime Environment:** Node.js

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### **Installation**

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/gaurabsaha12345/AI-Trip-Planner.git](https://github.com/gaurabsaha12345/AI-Trip-Planner.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd AI-Trip-Planner
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Set up your environment variables:**
    Create a file named `.env.local` in the root of your project and add your Gemini API key:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### **Usage**

Run the development server:
```sh
npm run dev
Open your browser and navigate to http://localhost:3000 to see the application.
