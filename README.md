# Snapchap
![Snapchap doodle](/snapchap/www/img/snapchap-doodle300.png?raw=true "Profile view image")

OVERVIEW





MAJOR TECHNOLOGIES
- Ionic
- Angular
- HTML5


LOG IN / SIGN UP
![Snapchap icon](/snapchap/www/img/screenshots/login2.png?raw=true "LogInSignUp view icon")


CAMERA
  For the camera, we used the Cordova plugin to access the mobile phone's built-in camera. Cordova saves the photo data to a variable which we placed on the $rootScope to make it accessible elsewhere.


PHOTO EDITING

  The photo editing view relies heavily on HTML5's canvas for each of its major features (text overlay, drawing, and filters). For each feature, the artwork is saved to the canvas and the canvas data is then saved to the $rootScope image variable when the user presses the Send To button.


SENDING PHOTOS

  After selecting which friends are to receive the photo message, the user presses the Send button to send the photo to the database. Each recipient can then find a pending message on their Chat screen. When a message is clicked, it is displayed for 10 seconds and then deleted from the database.
  ![Snapchap icon](/snapchap/www/img/screenshots/login2.png?raw=true "LogInSignUp view icon")


DATABASE

  The database stores:
  - user information, including login information
  - friend information, including pending and valid friendships, and
  - photo messages that have been sent but not viewed yet by the recipient

  Photos can be viewed for 10 seconds, after which they are deleted from the database.


AUTHENTICATION


FRIENDS



DISCLAIMER

  Snapchap is a non-commercial student project meant to mimic some of Snapchat's functionality and look. The project was a tool for new developers to learn to recreate a familiar app interface. Snapchap is not affiliated with Snapchat or Snap, Inc. and claims no rights or ownership of any of Snap, Inc.'s trademarks or copyrighted works.

  Official Snapchat site: https://www.snapchat.com/
  Official Snap, Inc. site: https://www.snap.com/en-US/
