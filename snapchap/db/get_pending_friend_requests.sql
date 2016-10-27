SELECT users.id, users.first_name, users.last_name, users.username
FROM friendships
JOIN users ON users.id = friendships.initiator
WHERE friendships.acceptor = $1 AND valid_friendship = false