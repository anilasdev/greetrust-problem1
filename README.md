# Who is the ruler of Southeros?

This is a kind of **CLI** based game. Shan, the gorilla king of the Space kingdom
wants to rule all Six Kingdoms in the universe of Southeros. He needs the support of 3 more kingdoms to be the ruler.

Each kingdom has an animal emblem and Shan needs to send a message with the animal in the message to win them over.

|  EMBLEM| ANIMAL |
|--|--|
| LAND | Panada |
|WATER|Octopus|
|ICE|Mammoth|
|AIR|Owl|
|FIRE|Dragon|
     
Once he wins 3 more kingdoms, he is the ruler! The secret message needs to contain the letters of the animal in their emblem. For example, secret message to the Land kingdom (emblem: Panda) needs to have the letter 'p','n','d' at- least once and 'a' at-least twice. If he sends "a1d22n333a4444p" to the Land kingdom, he will win them over.

# Code Base
The solution has been programmed in Node js

# Files
 - index.js
 - config.js
 - package.json
 - questions.js
 - secrets.js
 - screenshots
 

## How to ?
First unzip the file. Open terminal and locate the unzipped folder path and run the following commands
 
 - ```cd problem1```
 - ```npm start```

## The Rules

 1. Initially, when the program ran, it outputs the current ruler and allies . 
 2. Later, It will ask to enter the secrets
 3. Hit **Enter(return)** to pass secrets one after the other
 4. Once the secrets are passed, hit **ESC** to check the king has won or not
 5. If he wins, then the Output is printed and game ends.
 6. Otherwise, you need to keep on enter the secrets
 7. You can end the game by hitting **tab** key at any instance of game.
 
 ## Built Environment
 This program is tested in **MacOS**

