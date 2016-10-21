select users.id, username, user1_id, user2_id
from users
join friendships
on users.id = friendships.user1_id or users.id = friendships.user2_id
where users.id != $1 and (user1_id = $1 or user2_id = $1)
order by username
