# Daily!
<ul><b>Daily</b> is a to-do website that is used to manage your daily tasks and keep your work and day organized.</ul>


# Features


<ul>
 <li>Create a personal account easily, using either your email address or google sign-in.</li>
 <li>Download Daily and use it as a native app on all of your devices. instruction to download is available on the website.</li>
 <li>The ability to use <b>Daily</b> while offline. Data is auto synced with database when re-connected to the interent.</li>
 <li>Your Data is accessible across all of your devices.</li>
 <li>Easy to navigate UI, made with UX in mind.</li>
 <li>Fully responsive design.</li>
 <li>The ability to change username.</li>
 <li>The ability to change the password when logged in, or reset the password if forgotten.</li>
 <li>Dark and light mode.</li>
 <li>Add, edit, and delete tasks.</li>
 <li>Drag and drop functionality to easily re-arrange your tasks.</li>
 <li>Change task card color.</li>
 <li>Add a due timer to remind you when a specific task needs to be completed. Tasks with a due timer are auto flaged as important 2 hours prior to the due set time.</li>
 <li>Select tasks as important to make them more visible to you.</li>
 <li>Lock tasks to avoid accidental deletion.</li>
 <li>Sort tasks by newest, oldest, and important tasks.</li>
 <li>Completed tasks have their own tab, to access them after completion.</li>
 <li>Tasks chart to review your daily, weekly, and monthly usage.</li>
 <li>Add milestones within a task. Milestones are smaller steps you can add and follow to make completing the task easier.</li>
 <li>Edit, delete, and the ability to move milestones to different tasks.</li>
 <li>A more advanced WYSIWYG editor is used to add milestones.</li>
 <li>Progress bar to indicate the completion percentage is shown on the milestone page and on the task card.</li>
 <li>Sort milestones by newest, oldest, and pending milestones.</li>
</ul>


 # Security Measures
 
 
 <ul>
 <li>Accounts created are protected by the firebase authentication system.</li>
 <li>User UID is fully encrypted inside the website.</li>
 <li>Firebase SDK is protected in an env that is located inside the hosting website and cannot be accessed by anyone except the admin.</li>
 <li>Firestore rules limit users to only make CURD operations to their own document and cannot access the whole database.</li>
 <li>All local storage data is removed after logging out.</li>
</ul>

 
 # Sample
 
 
![Screenshot from 2023-02-21 15-26-01](https://user-images.githubusercontent.com/97849626/220366848-a0fc7d81-7cd9-48bb-9eaa-9c6f3cc39058.png)
![Screenshot from 2023-02-21 15-26-15](https://user-images.githubusercontent.com/97849626/220366864-a6af1c47-59d3-4284-953a-309d7951fc30.jpg)
![Screenshot from 2023-02-21 17-07-39 1](https://user-images.githubusercontent.com/97849626/220368004-bf4bcd78-72ae-4477-a01b-861c6e7b3b71.png)
![Group 1 (7)](https://user-images.githubusercontent.com/97849626/220369361-841309b7-c19d-41f1-be78-bbf58afb4f50.png)



# Getting started


<ul>
 <li>Create a new account to start using <b>Daily</b></li>
 <li>An internet connection is only required for the first time to start the SW, and to update the database.</li>
</ul>


# Built with


<ul>
  <li>Typescript</li>
  <li>Nextjs</li>
  <li>Tailwindcss</li>
  <li>Firebase</li>
  <li>Service worker</li>
</ul>




 
## Deployed on Vercel

<b>Daily</b> is fully deployed on vercel. Follow this link: https://daily-five.vercel.app
