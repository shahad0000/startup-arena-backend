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
    Request:  {
        Email,
        Password
    }
POST /api/auth/signout

## Users:

GET /api/users/me Get current logged-in user profile
GET /api/users/:id Get user by ID

## Ideas:

POST /api/ideas Create a new idea 
    Request: {
        title,
        description,
        target
    }
GET /api/ideas Get all ideas
GET /api/users/:userId/ideas Get all ideas submitted by a specific user
GET /api/ideas/:id Get one idea with full details
PUT /api/ideas/:id Update idea (only by owner) 
    Request: {
        title,
        description,
        target
    }
DELETE /api/ideas/:id Delete idea (only by owner)

## Votes:

POST /api/ideas/vote/:id/ Post a vote (upvote or downvote) on an idea 
    Request: {
    value: 1 or -1
    }
GET /api/ideas/vote/:id/ Get all vote

## Comments:

GET /api/comments/ get all comments
GET /api/comments/:id get all comments for one idea by its id
POST /api/comments/ Add a comment to an idea
    Request: { ideaId, userId, text }
PUT /api/comments/:id update a comment
    Request: { ideaId, userId, text }
DELETE /api/comments/:id Delete a comment (only by owner)

## Venture Ideas:

GET /api/venture-board Get all ideas that are on the venture board
GET /api/venture-board/:id Get details of a venture board idea

## Analytics

GET /api/ideas/:id/analytics Get analytics of an idea
