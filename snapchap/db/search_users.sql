SELECT id, username, first_name, last_name from users
WHERE id IN 
(SELECT id
FROM users  
WHERE username LIKE $1
except 
select friendships.initiator from friendships
except 
select friendships.acceptor from friendships)