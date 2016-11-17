# Snapchap
![Snapchap doodle](/snapchap/www/img/snapchap-doodle300.png?raw=true "Profile view image")

OVERVIEW

  Snapchap is a Snapchat clone. This dev team built Snapchap as a vehicle to strengthen core skills in the SEAN stack (SQL, Express, Angular, Node) and to learn new technologies like Ionic and HTML5.

  Snapchap allows users to sign up and add friends and then send photo messages to those friends. Users can edit photos before sending them, adding text and filters or drawing artwork directly on the photo. Users can view photos sent to them and can edit user information and password.



MAJOR TECHNOLOGIES
- Ionic
- Angular
- HTML5
- JSON Web Tokens


LOG IN / SIGN UP (AND AUTHENTICATION)

  From this screen, users can log in with valid credentials or can sign up as a new user. New users are automatically logged in after signing up. Credentials are validated through JSON Web Tokens.

  ![Snapchap icon](/snapchap/www/img/screenshots/login2.png?raw=true "LogInSignUp view icon")


FRIENDS

  Users can search for friends using their username. When a username is found, the user can click to request to add the friend. The friend can then see friend requests on their Added Me screen, which is reached through the Profile screen. There, they can accept the request, after which the two friends can send messages to each other.


CAMERA

  For the camera, we used the Cordova plugin to access the mobile phone's built-in camera. Cordova saves the photo data to a variable which we placed on the $rootScope to make it accessible elsewhere.

  ![Photo1](/snapchap/www/img/screenshots/snap1.png?raw=true "Snap1")


PHOTO EDITING

  The photo editing view relies heavily on HTML5's canvas for each of its major features (text overlay, drawing, and filters). For each feature, the artwork is saved to the canvas and the canvas data is then saved to the $rootScope image variable when the user presses the Send To button.

  ![Photo2](/snapchap/www/img/screenshots/snap2.png?raw=true "Snap2")

  ![Photo3](/snapchap/www/img/screenshots/snap3.png?raw=true "Snap3")

  ![Photo4](/snapchap/www/img/screenshots/snap4.png?raw=true "Snap4")


SENDING PHOTOS

  After selecting which friends are to receive the photo message, the user presses the Send button to send the photo to the database.

  ![Send To screen](/snapchap/www/img/screenshots/sendto.png?raw=true "Send To view")


VIEWING PHOTOS

  After a photo is sent, each recipient can find a pending message on their Chat screen. When a message is clicked, it is displayed for 10 seconds and then deleted from the database.

  ![Chat2](/snapchap/www/img/screenshots/chat2.png?raw=true "Chat2")

  ![Photo5](/snapchap/www/img/screenshots/snap5.png?raw=true "Snap5")


SETTINGS

  Users can visit the Settings screen to change user information or log out.


DATABASE

  The database stores:
  - user information, including login information
  - friend information, including pending and valid friendships, and
  - photo messages that have been sent but not viewed yet by the recipient

  Photos can be viewed for 10 seconds, after which they are deleted from the database.


DISCLAIMER

  Snapchap is a non-commercial student project meant to mimic some of Snapchat's functionality and look. The project was a tool for new developers to learn to recreate a familiar app interface. Snapchap is not affiliated with Snapchat or Snap, Inc. and claims no rights or ownership of any of Snap, Inc.'s trademarks or copyrighted works.

  Official Snapchat site: https://www.snapchat.com/
  Official Snap, Inc. site: https://www.snap.com/en-US/
