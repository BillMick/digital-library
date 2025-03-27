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


###
Json pour tester

### 📂 Get pending approval files
GET http://localhost:3000/api/uploads/approve


### ✅ Approve file: Accepted
POST http://localhost:3000/api/uploads/approve
Content-Type: application/json

{
  "fileId": 1,
  "adminId": "c2bb79f6-f5f6-4ae1-bec0-246e666fc9c3",
  "action": "ACCEPTEE",
  "reason": "The file meets the requirements"
}


### 🚫 Approve file: Rejected
POST http://localhost:3000/api/uploads/approve
Content-Type: application/json

{
  "fileId": 1,
  "adminId": "c2bb79f6-f5f6-4ae1-bec0-246e666fc9c3",
  "action": "REJETEE",
  "reason": "The file format is not compliant"
}


###

### Newsletter - Admin sends a notification
POST http://localhost:3000/api/newsletter
Content-Type: application/json

{
  "adminId": "c2bb79f6-f5f6-4ae1-bec0-246e666fc9c3", 
  "title": "Nouvelle mise à jour de la bibliothèque",
  "content": "Découvrez les nouveaux livres ajoutés cette semaine ! 📚"
}

### Newsletter - Admin sends a notification (test with updated title)
POST http://localhost:3000/api/newsletter
Content-Type: application/json

{
  "adminId": "c2bb79f6-f5f6-4ae1-bec0-246e666fc9c3",
  "title": "📢 Mise à jour importante de la bibliothèque",
  "content": "Découvrez les nouveaux livres ajoutés cette semaine ! 📚"
}


###

### Get all notifications for the current user
GET http://localhost:3000/api/notifications?userId=c2bb79f6-f5f6-4ae1-bec0-246e666fc9c3

### Mark notification as read
POST http://localhost:3000/api/notifications/read
Content-Type: application/json

{
  "notificationId": "0142c78b-38da-4334-909f-6398f85e900e",
  "userId": "c2bb79f6-f5f6-4ae1-bec0-246e666fc9c3"
}



###

### 🟢 Get pending user requests (admin only)
GET http://localhost:3000/api/requests/respond


### 🟡 Admin responds to user request - Accepted
POST http://localhost:3000/api/requests/respond
Content-Type: application/json

{
  "adminId": "c2bb79f6-f5f6-4ae1-bec0-246e666fc9c3",
  "requestId": "8436cc9c-a604-49b3-a639-729758808fa0",
  "action": "TRAITE"
}

### 🔴 Admin responds to user request - Rejected
POST http://localhost:3000/api/requests/respond
Content-Type: application/json

{
  "adminId": "c2bb79f6-f5f6-4ae1-bec0-246e666fc9c3",  
  "requestId": "8436cc9c-a604-49b3-a639-729758808fa0", 
  "action": "REJETE"
}
