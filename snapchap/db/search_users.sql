SELECT id, username, first_name, last_name from users
WHERE username LIKE $1
AND id != $2
AND id not in (
select initiator as friend from friendships where acceptor = $2 union
select acceptor as friend from friendships where initiator = $2
)
