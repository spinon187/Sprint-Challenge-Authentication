What is the purpose of using sessions?

HTTP is stateless so sessions allow a user to persist data across requests.

What does bcrypt do to help us store passwords in a secure manner.

Bcrypt hashes passwords using a derivation function.

What does bcrypt do to slow down attackers?

It iterates the derivation function as many times as you tell it to so trying to brute force the key will take exponentially longer the more times it has to iterate.

What are the three parts of the JSON Web Token?

Header, which has the algorithm and the type. Payload, which has the claims data. Signature, which contains the secret used to sign the token.