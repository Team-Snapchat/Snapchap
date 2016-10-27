UPDATE friendships SET valid_friendship = TRUE where initiator = $1 AND acceptor = $2;
