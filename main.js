const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
 
client.login(config.token);
 
client.on("ready", async () => {
  console.log("Prêt !")
  var serveur = client.guilds.size;
  var membre = client.users.size;
  
  const statut = [
    "m.help",
    "NodeJS",
    "vous aider"
  ];
  
    setInterval(function(){
      var statutID = Math.floor(Math.random() * Math.floor(statut.length))
      client.user.setActivity(statut[statutID]);
    }, 5000)
});
 
 
client.on("message", async message => {
    if(message.author.client) return;
    if(message.channel.type === 'dm') return;
 
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
 
    if(cmd === `hello`) {
        message.channel.send("Bonjour à vous")
    }
});