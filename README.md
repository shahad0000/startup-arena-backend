# Routes

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
GET       /api/users Get all users
GET       /api/users/me Get current logged-in user profile
GET       /api/users/:id Get user by ID

## Ideas:

POST /api/ideas Create a new idea 
    Request: {
        title,
        category,
        description,
        mvpLink,
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

POST /api/ideas/:id/vote Post a vote (upvote or downvote) on an idea 
    Request: {
    value: 1 or -1
    }
GET /api/ideas/:id/vote Get all vote

## Comments:

POST /api/ideas/:id/comments Add a comment to an idea 
    Request: { text }
GET /api/ideas/:id/comments Get all comments on an idea
DELETE /api/comments/:id Delete a comment (only by owner)

## Venture Ideas:

GET /api/venture-board Get all ideas that are on the venture board
GET /api/venture-board/:id Get details of a venture board idea

## Analytics

GET /api/ideas/:id/analytics Get analytics of an idea
