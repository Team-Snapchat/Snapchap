delete from friendships
  where ($1 = user1_id or $1 = user2_id) and ($2 = user1_id or $2 = user2_id)
