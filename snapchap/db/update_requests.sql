select users.id, username, initiator, acceptor, first_name, last_name
from users
join friendships
on users.id = friendships.initiator or users.id = friendships.acceptor
where users.id != $1 and (initiator = $1 or acceptor = $1) and valid_friendship = false
order by username
