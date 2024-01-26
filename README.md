# University Exam Results Notification Application

Before this application, there was no system in place at our university to notify students when new exam results were announced. Like many students, I found myself obsessively checking the system to see if new results had been posted. To solve this issue, I created this application.

This application automatically checks the university's exam results web page at predetermined intervals as a cron job. If it detects any newly announced exam results, it captures a screenshot of these results and sends a notification email to the specified address.

## Features

- **Automatic Checking:** The application periodically checks the university exam results page based on the configured cron job schedule.
- **New Exam Results Detection:** Detects when new exam results are published.
- **Email Notifications:** When new exam results are detected, the application takes a screenshot and sends it to the specified email address as a notification.

## Configuration
Before using the application, you need to configure the config.js file.
```bash
const Config = {
    from: 'SENDER_EMAIL'
    to: 'RECEIVER_EMAIL',
    username: 'AKSIS_USERNAME(TC)', 
    password: 'AKSIS_PASSWORD', 
    transporter_user: 'SENDER_EMAIL',
    transporter_pass: 'SENDER_APP_PASSWORD'
};

module.exports = Config;
```
## Installation

This section should include steps on how to install and set up the application. Example:

```bash
git clone https://github.com/emirhaneryilmaz/ExamEye.git
cd ExamEye
npm install
