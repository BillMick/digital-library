📂Uploads
GET /api/uploads/approve
→ Retrieve all pending files to be reviewed by administrators.

POST /api/uploads/approve
→ Admin reviews a file (approve or reject).

📬 Requests
GET /api/requests/respond
→ Retrieve all user requests that require admin review.

POST /api/requests/respond
→ Admin responds to a user request (accept or reject).

🔔 Notifications
GET /api/notifications
→ Get all notifications for a specific user.
(Requires query param: userId)

PATCH /api/notifications/read
→ Mark a notification as read by the user.

🗞️ Newsletter
POST /api/newsletter
→ Admin sends a newsletter to all users.

