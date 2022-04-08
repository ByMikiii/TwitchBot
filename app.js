/*
#TODO: 
Followage
Channel points
Giveaway
Poll
!game, !title (change and view)
Spam protection(like block links, so many capital letters, etc)
Song requests
*/
import tmi from "tmi.js";
import { channel, username, password, options, clientId, accessToken } from "./consts.js";
import { chatter, cicinaCd, testCd, vanishCd, helloCd, messagesCd, percentaCd, isliveCd, startDate} from "./settings.js";
var cicinaCooldown, testCooldown, vanishCooldown, helloCooldown, messagesCooldown, percentaCooldown, isliveCooldown;
const client = new tmi.Client(options)


import { ApiClient } from 'twitch';
import { StaticAuthProvider } from 'twitch-auth';

const authProvider = new StaticAuthProvider(clientId, accessToken);
const apiClient = new ApiClient({ authProvider });

async function isStreamLive(userName) {
	const user = await apiClient.helix.users.getUserByName(userName);
	if (!user) {
		return false;
	}
	return await apiClient.helix.streams.getStreamByUserId(user.id) !== null;
}

client.connect().catch(console.error);
client.on("connected", () => {
  client.say(channel, "/me Peekaboo! ");
});

client.on("message", (channel, user, message, self) => {
  if (self) return


  //COMMANDS
  if (message.startsWith('!')) {
    //!TEST
    if (message.toLowerCase() == "!test") {
      if (testCooldown != false || user["display-name"] == 'ByMikiii') {
        var nowDate = new Date();
        var uptime = (nowDate - startDate) / 1000 / 60 / 60;
        if (uptime < 1) {
          uptime = uptime * 60;
          uptime = Math.round(uptime);
          var uptimeTime = uptime + " min"
        } else if (uptime < 24) {
          uptime = Number(uptime.toFixed(1))
          var uptimeTime = uptime + " hours"
        } else {
          uptime /= 24;
          uptime = Number(uptime.toFixed(1));
          var uptimeTime = uptime + " days"
        }
        client.say(channel, "/me Still alive. Sadge (uptime: " + uptimeTime + ")");
        testCooldown = false;
        setTimeout(() => {
          testCooldown = true;
        }, (1000 * testCd))
      }
    }

    //!VANISH
    if (message.toLowerCase() == "!vanish" && user.mod == false && user["display-name"] != 'ByMikiii') {
      if (vanishCooldown != false || user["display-name"] == 'ByMikiii') {
        client.say(channel, "/timeout " + `${user.username}` + " 1");
        vanishCooldown = false;
        setTimeout(() => {
          vanishCooldown = true;
        }, (1000 * vanishCd))
      }
    }
  
    //!HELLO
    if (message.toLowerCase() == "!hello") {
      if (helloCooldown != false || user["display-name"] == 'ByMikiii') {
        client.say(channel, "/me Welcome " + `${user.username}` + "!");
        helloCooldown = false;
        setTimeout(() => {
          helloCooldown = true;
        }, (1000 * helloCd))
      }
    }

    //!CICINA
    if (message.toLowerCase().split(' ')[0] == "!cicina") {
      if (cicinaCooldown != false || user["display-name"] == 'ByMikiii') {
      
        var cicinaLength = Math.floor(Math.random() * 34);
        if (message.split(' ')[1] == undefined) {
          client.say(channel, "/me " + `${user.username}` + " - Dĺžka tvojej ciciny je " + cicinaLength + " centimetrov matoPiska");
          if (cicinaLength === 0 && user.mod == false) {
            client.say(channel, "/timeout " + `${user.username}` + " 120");
          };
        } else {
          client.say(channel, "/me " + message.split(' ')[1] + " - Dĺžka tvojej ciciny je " + cicinaLength + " centimetrov matoPiska");
          if (cicinaLength === 0) {
            client.say(channel, "/timeout " + message.split(' ')[1] + " 120");
          };
        }
        cicinaCooldown = false;
        setTimeout(() => {
          cicinaCooldown = true;
        }, (1000 * cicinaCd))
      }
    }

    //!%
    if (message.toLowerCase().split(' ')[0] == "!%") {
      if (percentaCooldown != false || user["display-name"] == 'ByMikiii') {
        var percenta = Math.floor(Math.random() * 101);
        client.say(channel, "/me " + percenta + "%");
        percentaCooldown = false;
        setTimeout(() => {
          percentaCooldown = true;
        }, (1000 * percentaCd))
      }
    }

    //!MESSAGES
    if (message.toLowerCase() == "!messages") {
      if (messagesCooldown != false || user["display-name"] == 'ByMikiii') {

        var index1 = chatter.findIndex((object => { return object.username === user["display-name"]; }));
        if (index1 != -1) {
          client.say(channel, "/me Do tohoto chatu si poslal " + (chatter[index1].numberOfMessagess + 1) + " správ.");
        } else {
          client.say(channel, "/me Toto je tvoja prvá správa!");
        }
        messagesCooldown = false;
        setTimeout(() => {
          messagesCooldown = true;
        }, (1000 * messagesCd))
      }
    }
    //!ISLIVE
    if (message.toLowerCase().split(' ')[0] == "!islive") {
      if (isliveCooldown != false || user["display-name"] == 'ByMikiii') {
        if (message.split(' ')[1] == '') {
          client.say(channel, "/me Musíš zadať meno používateľa.");
        } else {
          var streamer = message.split(' ')[1];
          var isLive = isStreamLive(streamer)
            .then(isLive => {
              if (isLive == true) {
                client.say(channel, "/me Používateľ "+ message.split(' ')[1].toUpperCase()+ " je live! POGGERS")
              } else {
                client.say(channel, "/me Používateľ "+ message.split(' ')[1].toUpperCase()+ " nieje live! Sadge")
              }
            });
        }
      
        isliveCooldown = false;
        setTimeout(() => {
          isliveCooldown = true;
        }, (1000 * isliveCd))
      }
    }
  




    //NUMBER OF MESSAGES
    if (message) {
      var index = chatter.findIndex((object => { return object.username === user["display-name"]; }));
      if (index != -1) {
        if (chatter[index].username == user["display-name"]) {
          chatter[index].numberOfMessagess++;
        }
      }
      else {
        chatter.push({ username: user["display-name"], numberOfMessagess: 1 })
      };
    }
  };
}
)