import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: process.env.DATABASE_URL,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const submitFormData = async (formData) => {
	try {
		const dataRef = ref(database, "formEntries");
		await push(dataRef, formData);
		alert("Form submitted successfully!");
	} catch (error) {
		console.error("Error submitting form data:", error);
		alert("Failed to submit form. Please try again later.");
	}
};
