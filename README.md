# Routes

## Admin :

GET /api/admin/users

DELETE /api/admin/users/:id

## Auth :

POST /api/auth/signup
Request: {
Name,
Email,
Password,
Gender,
Role,
Age,
Country,
City,
}
POST /api/auth/signin
Request: {
Email,
Password
}
POST /api/auth/signout

## Users:

GET /api/users/me Get current logged-in user profile
GET /api/users/:id Get by ID
GET /api/users/myIdeas Get all ideas by the current user

## Admin authorities

GET /api/admin/users/:id       Get user by ID
GET /api/admin/users       Get all users

## Ideas:

POST /api/ideas     Create a new idea
Request: {
title,
category
description,
mvpLink,
target
}
GET /api/ideas          Get all ideas
GET /api/users/:userId/ideas    Get all ideas submitted by a specific user   // commented for now
GET /api/ideas/:id      Get one idea with full details
DELETE /api/ideas/:id       Delete idea (only by owner)

## Votes:

POST /api/ideas/vote/       Post a vote (upvote or downvote) on an idea
Request: {
ideaId: "68617bf98f706bc1665d2ba9",
value: 1 or -1
}
GET /api/ideas/vote/:id/    Get all vote // needs editing 

## Comments:
GET /api/comments/       Get all comments
GET /api/comments/:id    Get all comments for one idea by its id
POST /api/comments/      Create a comment to an idea
Request: { ideaId, userId, text }
DELETE /api/comments/:id    Delete a comment (only by owner)

## Venture Ideas:
GET /api/venture-board      Get all ideas that are on the venture board
GET /api/venture-board/:id      Get details of a venture board idea

## Analytics

GET /api/ideas/:id/analytics        Get analytics of an idea       // needs editing
