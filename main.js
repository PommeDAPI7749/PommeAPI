const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const colors = require("./colors.json");
const moment = require("moment")

client.login(config.token);
const prefix = config.prefix

client.on("ready", () => {
  console.log("En ligne !")
  const serveur = client.guilds.size;
  const membre = client.users.size;
  const statut = [
    "p?help",
    "NodeJS",
    "vous aider"
  ];
  
    setInterval(function(){
      const statutID = Math.floor(Math.random() * Math.floor(statut.length))
      client.user.setActivity(statut[statutID]);
    }, 5000)
});
 
client.on('message', message => {
  if(message.author.bot) return;
  const args = message.content.split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd === `${prefix}annonce`) {
    message.delete()
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("❌ | Il te faut la permission ADMINISTRATOR pour utiliser cette commande !")
    const mCh = message.mentions.channels.first()
    if(!mCh) return message.channel.send("⚠️ | Mentionnes le salon")
    const messageToclient = args.slice(1).join(" ")
    if(!messageToclient) return message.channel.send("⚠️ | Merci d'écrire l'annonce que tu veux publier")
    
    const Annonceembed = new Discord.MessageEmbed()
      .setTitle("📢 | Annonce")
      .setThumbnail(message.author.displayAvatarURL())
      .setColor(colors.bleu_royal)
      .addField("\u200b",
        `**${messageToclient}**
        \u200b`)
      .setFooter(`PommeAPI `, client.user.displayAvatarURL())
      .setTimestamp();
    mCh.send(Annonceembed)
    message.channel.send("✅ | **" + message.author.username + "** ton annonce a été publiée.")
  }

  if (cmd === `${prefix}avatar`) {
    if(!args[0]){
      const Avatarembed = new Discord.MessageEmbed()
      .setColor(colors.citron_vert)
      .setTitle(`Ton avatar :`)
      .setImage(message.author.displayAvatarURL())
      .setFooter(`PommeAPI `, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(Avatarembed);
    } else {
      const member = message.mentions.members.first();
      const avatar = member.user.displayAvatarURL();
      const Avatarembed = new Discord.MessageEmbed()
      .setColor(colors.citron_vert)
      .setTitle(`L'avatar de ${member.user.username} :`)
      .setImage(avatar)
      .setFooter(`PommeAPI `, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(Avatarembed);
    }
    message.delete();
  }

  if (cmd === `${prefix}ban`) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("❌ | Il te faut la permission BAN_MEMBERS pour utiliser cette commande !");
    if(!args[0]) return message.reply("⚠️ | Il faut que tu mentionnes la personne que tu veux bannir !")
    const user = message.mentions.members.first()
    const member = message.guild.member(user);
    const msgToBot = args.slice(1).join(" ")
    if(!msgToBot) return message.channel.send("⚠️ | Merci de donner une raison de ban")
    if(!member) message.channel.send("⚠️ | Cet utilisateur n'est pas dans le serveur !")
    if (!member.bannable) return message.channel.send("❌ | Je ne peux pas bannir cet utilisateur.")
    member.ban({ reason: `${msgToBot}` })
    message.channel.send(`✅ | ${member} à été bannis du serveur pour la raison ${msgToBot}.`);
  }

  if (cmd === `${prefix}tempban`) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("❌ | Il te faut la permission BAN_MEMBERS pour utiliser cette commande !");
    if(!args[0]) return message.channel.send("⚠️ | Il faut que tu mentionnes la personne que tu veux bannir !")
    const user = message.mentions.members.first()
    const member = message.guild.member(user);
    const temps = args[1]
    if(!args[1]) return message.channel.send("⚠️ | Attention tu dois exprimer une durée (en jours)!")
    const msgToBot = args.slice(2).join(" ")
    if(!msgToBot) return message.channel.send("⚠️ | Merci de donner une raison de ban")
    if(!member) message.channel.send("⚠️ | Cet utilisateur n'est pas dans le serveur !")
    if (!member.bannable) return message.channel.send("❌ | Je ne peux pas bannir cet utilisateur.")
    member.ban({ days: temps, reason: `${msgToBot}` })
    message.channel.send(`✅ | ${member} à été bannis du serveur pour la raison **${msgToBot}** et pour une durée de **${temps}** jours.`);
  }

  if (cmd === `${prefix}clear`) {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
      if(!args[0]) return message.reply("Il faut que tu spécifie le nombre de message à supprimer")
  
      if (args[0] > 99) return message.channel.send("Tu ne peux supprimer que 99 messages au maximum")
  
      message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`✅ | J'ai supprimé ${args[0]} messages.`)
      })
  }

  if (cmd === `${prefix}help`) {
    const indexembed = new Discord.MessageEmbed()
    .setColor(colors.green_light)
    .setTitle(`📌| Aide PommeAPI`)
    .setDescription(`Le préfix du bot est \`p?\` veuillez le mettre devant toutes les commandes sinon le bot ignorera votre message.`)
    .addField(`📖 | Comandes informatives`,` Tes infos : \`infos-utilisateur\`
      Infos du serveur : \`infos-serveur\`
      Infos du bot : \`infos-bot\`
      Pour connaitre la Latence du bot : \`ping\`
      \u200b`)
    .addField(`📋 | Commandes pour tous :`, `Pour emmetre une suggestion : \`sugg #salon < ta suggestion>\`
      Pour voir ton Avatar : \`avatar\`
      Pour poser des questions au bot (les réponses sont aléatoires): \`question <question>\`
      Si tu as des problèmes : \`ticket j'ai un problème\`
      Pour contacter le staff du bot : \`ticket je veux parler au staff de PommeAPI\`
      Pour contacter le développeur du bot : \`ticket je veux parler au dev de PommeAPI\`
      \u200b`)
    .addField(`🎧 | Commandes musique :`, `Sois patient, ça arrive ...
      \u200b`)
    .addField(`👮🏼 | Commandes Staff :`, `Pour bannir un membre : \`ban\`
      Pour exclure un membre : \`kick\`
      Pour effacer des messages : \`clear <nombre de messages>\`
      Pour faire une annonce : \`annonce #salon <annonce>\`
      Pour que le bot parle en ton nom : \`say <ce que tu veux qu'il dise>\`
      Pour demander a tous d'arreter de parler : \`silence\`
      D'autres commandes staff arrivent (mute, unmute, tempmute, unban, tempban et bien d'autres)`)
    .addField('\u200b', `De nombreuses commandes sont en développement, patience 
      En attendant tu est bienvenue sur le serveur support,
      Ton ticket => https://discord.gg/zWvtWh8`)
    .setFooter(`PommeAPI `, client.user.displayAvatarURL())
    .setTimestamp();
    message.channel.send(indexembed);
    message.delete();
  }

  if (cmd === `${prefix}ping`) { 
    message.delete()
     message.channel.send(`⌚ Pinging....`).then(message=>{
        const pingembed = new Discord.MessageEmbed()
          .setTitle(client.user.username)
          .setDescription(`\n📡 | Latence du Bot : ${Math.round(client.ws.ping)}ms`)
          .setColor('RANDOM');
        message.edit(pingembed);
        message.edit("\u200B")
    });
  }

  if (cmd === `${prefix}infos-bot`) {
    const isembed = new Discord.MessageEmbed()
      .setColor(colors.bleu_poudre)
      .setTitle(client.user.username)
      .setThumbnail(client.user.avatarURL())
      .addField("En lige depuis :", client.readyTimestamp)
      .addField("Créé le :", client.user.createdAt)
      .addField("Developpeur : ", `PommeD'Api#7749` )
      .addField("Co-développeur : ", `Alban9562#0198` )
      .setFooter(`PommeAPI `, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(isembed);
    message.delete({timeout: 3000});  
  }

  if (cmd === `${prefix}infos-serveur`) {
    const isembed = new Discord.MessageEmbed()
      .setColor(colors.bleu_poudre)
      .setTitle(message.guild.name)
      .setThumbnail(message.guild.iconURL())
      .addField("Nombre de membres :", message.guild.memberCount, true)
      .addField("Créé le :", message.guild.createdAt)
      .addField("Niveau de vérification :", message.guild.verificationLevel)
      .addField("Propriétaire du serveur :", message.guild.owner.user.tag, message.guild.owner.user.avatarURL(), true)
      .setFooter(`PommeAPI `, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(isembed);
    message.delete({timeout: 3000});  
  }

  if (cmd === `${prefix}infos-utilisateur`) {
    if(!args[0]) {
      const iuembed = new Discord.MessageEmbed()
      .setColor(colors.bleu_poudre)
      .setTitle(message.author.username)
      .setThumbnail(message.author.avatarURL())
      .addField("Votre tag :", message.author.tag)
      .addField("Votre ID :", message.author.id)
      .addField("Votre compte a été créé le :", message.author.createdAt)
      .setFooter(`PommeAPI `, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(iuembed);
    } else {
    const member = message.mentions.members.first();
    const avatar = member.user.displayAvatarURL();
    const iuembed = new Discord.MessageEmbed()
      .setColor(colors.bleu_poudre)
      .setTitle(member.user.username)
      .setThumbnail(avatar)
      .addField("Son tag :", member.user.tag)
      .addField("Son ID :", member.user.id)
      .addField("Son compte a été créé le :", member.user.user.createdAt)
      .setFooter(`PommeAPI `, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(iuembed);
    }
    message.delete();  
  }

  if (cmd === `${prefix}kick`) {
    if(!message.member.hasPermission("BAN_MEMBERS")) message.channel.send("❌ | Il te faut la permission KICK_MEMBERS pour utiliser cette commande !");
    if(!args[0]) message.reply("⚠️ | Il faut que tu mentionne la personne que tu veux kick !")
    const member = message.mentions.members.first()
    if(!member) message.channel.send("⚠️ | Cet utilisateur n'est pas dans le serveur !")
    if (!member.kickable) message.channel.send("❌ | Je ne peux pas exclure cet utilisateur.")
    member.kick()
    message.channel.send('✅ | **' + member.user.username + '** a été exclu.')
  }

  if (cmd === `${prefix}perdue`) {
    const ch = client.channel.cache.find(ch => ch.name === 'logs-jdhfkfnehdkdhdekls')
    const Perdueembed = new Discord.MessageEmbed()
      .setColor(colors.blue_light)
      .setTitle("BRAVO !!!")
      .setDescription("🎉🎉🎉🎉")
      .setThumbnail(message.author.displayAvatarURL())
      .addField(`${message.author.username}`, "Tu as trouvé la commande perdue !")
      .addField("Le jeu de mot est pas ouf mais j'avais pas d'inspiration ...", "Tu as gagné ...")
      .addField("...", "...")
      .addField("...", "...")
      .addField("...", "...")
      .addField("...", "...")
      .addField("...", "...")
      .addField("rien du tout !", "ah si un tout petit peu de reconnaissance.")
      .setFooter(`PommeAPI `, client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(Perdueembed);
    message.delete();
    ch.send(`🎉 | ${message.author} a trouvé la commande perdue ! (dans le serveur ${message.guild})`)
  
  }

  if (cmd === `${prefix}question`) {
    if (!args[1]) return message.channel.send(":x: | Veuillez poser une question.")
    const answers = ["❌ | Non", "✅ | Oui", "✅ | Probablement", "🤷🏽‍♂️ |Peut être ... ", "🤷🏽‍♂️ |Peut être ... ", "✅ | Absolument !", "❌ | Pas du tout !", "✅ | Assurément", "❌ | Impossible !", "❌ | Sûrement pas !"]
  
    message.channel.send(answers[Math.floor(Math.random() * answers.length)])  
  }

  if (cmd === `${prefix}giveaway`) {
    message.delete()
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ | Tu n'as pas les permissions nécessaires pour lancer un giveaway !")
    const timev = message.content.slice(prefix.length+9)
    if(!timev) return message.channel.send('⚠️ | Tu dois spécifier la durée du giveaway en MS!')
    const time = parseInt(timev,10)
    if(time< 15000)   return message.channel.send('⚠️ | Le giveaway doit durer plus de 15 secondes (15000 MS)')
  
    const prize = message.content.split(`${time}`).join("").split(`${prefix}giveaway `).join("")
    if(!prize) return message.channel.send("⚠️ | Il faut que tu précises le lot à gagner durant le giveaway")
    const embed = new Discord.MessageEmbed()
      .setTitle('🎉 | Giveaway !')
      .setDescription(`**Tu as tes chances de gagner :** __${prize}__`)
      .setColor('RANDOM')
      .addField("\u200b", `Ce giveway dure ${ms(time)} secondes !`)
      .setFooter(`PommeAPI `, client.user.displayAvatarURL())
      .setTimestamp();
    let msg = message.channel.send(embed).then(async message => {
      await message.react('🎉');
  
    
    function winner(msg){
        
      const winner = message.reactions.cache.get('🎉').users.cache.random().id
      return winner
    };
    function rawWinner(msg){
      const winner =  message.reactions.cache.get('🎉').users.cache.random()
    }
  
    function reactions(msg){
      return message.reactions.cache.size
    }
    function reroll(msg){
      return winner(msg)
    }
    setTimeout(() => {
    if(reactions(msg) < 6)return message.channel.send('⚠️ | Le giveaway ne peut avoir lieu car moins de 5 personnes ont participé')
      const win = winner(msg)
        return message.channel.send(`🎉 | Le(la) gagnant(e) du giveaway est <@${win}> bravo à toi tu remportes **${prize}** !`)
    }, time);
    })
  }
  
  if (cmd === `${prefix}say`) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("❌ | Il te faut la permission KICK_MEMBERS pour utiliser cette commande !")
    message.channel.send(args.join(" "));
    message.delete({timeout: 1000}).then(console.log("Un message à été supprimé."));
  
  }

  if (cmd === `${prefix}silence`) {
  if(!message.member.hasPermission("BAN_MEMBERS")) return;
  const Silenceembed = new Discord.MessageEmbed()
    .setColor(colors.red)
    .setTitle("Chuuuuuut !")
    .setThumbnail(message.author.avatarURL())
    .addField(`${message.author.tag}`, `demande le silence`)
    .setFooter(`PommeAPI `, client.user.displayAvatarURL())
    .setTimestamp();
  message.channel.send(Silenceembed);
  message.delete();
  }

  if (cmd === `${prefix}sugg`) {
    message.delete()
    const mCh = message.mentions.channels.first()
    if(!mCh) return message.channel.send("⚠️ | Mentionnes le salon.")
    const messageToclient = args.slice(1).join(" ")
    if(!messageToclient) return message.channel.send("⚠️ | Merci d'ecrire la suggestion que tu veux publier.")
    
    const Suggembed = new Discord.MessageEmbed()
    .setTitle("🗳️ | Suggestion")
    .setThumbnail(message.author.displayAvatarURL())
    .setColor(colors.bleu_royal)
    .setDescription('\u200b')
    .addField(`**${messageToclient}**`, '\u200b')
    .setFooter(`PommeAPI | Suggestion proposée par ${message.author.username}`, client.user.displayAvatarURL())
    .setTimestamp();
  
    mCh.send(Suggembed).then(async message => {
        await message.react("✅")
        await message.react("➖")
        await message.react("❌")
    })
    message.channel.send("✅ | " + message.author.username + "ta suggestion a bien été soumise au vote du serveur")
  
  }

  if (cmd === `${prefix}ticket`) {
      if (!args[0]) {
          return message.channel.send(`⚠️ |  ${message.author}, Tu dois préciser le motif de ta demande.`);
      }
      message.delete();
      const guild = message.guild;
      const msgToBot = args.slice(1).join(" ")
      const channells = client.channels.cache.find(ch => ch.name === '🔧-appels-à-laide');
      const embed = new Discord.MessageEmbed()
        .setAuthor(`Ticket de ${message.author.username}`, message.author.displayAvatarURL())
        .addField('Ticket:', `**Auteur du Ticket : ** ${message.author}\n**Dans le serveur : ** ${guild.name}\n**Motif du ticket : ** ${msgToBot}`)
        .setColor(16711728)
        .setFooter(`PommeAPI `, client.user.displayAvatarURL())
        .setTimestamp();
      channells.send(embed);
      message.channel.send(`✅ | ${message.author}, ton ticket à bien été envoyer dans le serveur support.`);
  }

  if (message.content === 'salut')  {
    message.react('👋');
  } 

  if (message.content === 'Salut')  {
    message.react('👋');
  } 

  if (message.content === 'bonjour')  {
    message.react('👋');
  } 

  if (message.content === 'Bonjour')  {
    message.react('👋');
  }

  if (message.content === 'Guten')  {
    message.react('👋');
  } 

  if (message.content === 'guten')  {
    message.react('👋');
  } 

  if (message.content === 'Hola')  {
    message.react('👋');
  } 

  if (message.content === 'hola')  {
    message.react('👋');
  } 

  if (message.content === 'yo')  {
    message.react('👋');
  } 

  if (message.content === 'Yo')  {
    message.react('👋');
  }
});

client.on("guildMemberAdd", member => {
  const embed = new Discord.MessageEmbed()
  .setColor(colors.jaune_doré)
  .setTitle("🎉| Bienvenue ")
  .setThumbnail(member.guild.iconURL())
  .addField("Nous esperons que tu te plaira dans notre serveur, depeche toi d'accepter le reglement pour faire parti de notre aventure !", '\u200b')
  .setFooter(`PommeAPI`, client.user.displayAvatarURL())
  .setTimestamp();
  member.send(embed);  
  const channel = member.guild.channels.cache.find(ch => ch.name === "『🥳』bienvenue");
  if (!channel) return;
  channel.send(`📯 | ${member} fait maintenant partis des notres !`);
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === "『😪』au-revoir");
  if (!channel) return;
  member.send("nous esperons de tout coeur que tu acceptera bientot de revenir dans nos vies.")
  channel.send(`Au revoir ${member} et a bientôt.`);
});

client.on("messageReactionAdd", (messageReaction, message, user) => {

  if(
      ["📩", "📥", "❌"].includes(messageReaction.emoji.name)
  ) {
      switch(messageReaction.emoji.name) {

          case"📩":
          const mphelpembed = new Discord.MessageEmbed()
            .setColor(colors.green_light)
            .setTitle(`📌| Aide PommeAPI`)
            .setDescription(`Le préfix du bot est \`p?\` veuillez le mettre devant toutes les commandes sinon le bot ignorera votre message.`)
            .addField(`📖\ Comandes informatives`,` Tes infos : \`infos-utilisateur\`
              Infos du serveur : \`infos-serveur\`
              Infos du bot : \`infos-bot\`
              \u200b`)
            .addField(`📋\ Commandes pour tous :`, `Pour emmetre une suggestion : \`sugg #salon < ta suggestion>\`
              Pour voir ton Avatar : \`avatar\`
              Pour poser des questions au bot (les réponses sont aléatoires): \`question <question>\`
              Si tu as des problèmes : \`ticket j'ai un problème\`
              Pour contacter le staff du bot : \`ticket je veux parler au staff de PommeAPI\`
              Pour contacter le développeur du bot : \`ticket je veux parler au dev de PommeAPI\`
              \u200b`)
            .addField(`🎧\ Commandes musique :`, `Sois patient, ça arrive ...
              \u200b`)
            .addField(`👮🏼\ Commandes Staff :`, `Pour bannir un membre : \`ban\`
              Pour exclure un membre : \`kick\`
              Pour effacer des messages : \`clear <nombre de messages>\`
              Pour faire une annonce : \`annonce #salon <annonce>\`
              Pour que le bot parle en ton nom : \`say <ce que tu veux qu'il dise>\`
              Pour demander a tous d'arreter de parler : \`silence\`
              D'autres commandes staff arrivent (mute, unmute, tempmute, unban, tempban et bien d'autres)`)
            .addField('\u200b', `De nombreuses commandes sont en développement, patience 
              En attendant tu est bienvenue sur le serveur support,
              Ton ticket => https://discord.gg/zWvtWh8`)
            .setFooter(`PommeAPI `, client.user.displayAvatarURL())
            .setTimestamp();
            user.send(mphelpembed);
            message.delete()
          break;

          case"📥":
          const salonhelpembed = new Discord.MessageEmbed()
            .setColor(colors.green_light)
            .setTitle(`📌| Aide PommeAPI`)
            .setDescription(`Le préfix du bot est \`p?\` veuillez le mettre devant toutes les commandes sinon le bot ignorera votre message.`)
            .addField(`📖\ Comandes informatives`,` Tes infos : \`infos-utilisateur\`
              Infos du serveur : \`infos-serveur\`
              Infos du bot : \`infos-bot\`
              \u200b`)
            .addField(`📋\ Commandes pour tous :`, `Pour emmetre une suggestion : \`sugg #salon < ta suggestion>\`
              Pour voir ton Avatar : \`avatar\`
              Pour poser des questions au bot (les réponses sont aléatoires): \`question <question>\`
              Si tu as des problèmes : \`ticket j'ai un problème\`
              Pour contacter le staff du bot : \`ticket je veux parler au staff de PommeAPI\`
              Pour contacter le développeur du bot : \`ticket je veux parler au dev de PommeAPI\`
              \u200b`)
            .addField(`🎧\ Commandes musique :`, `Sois patient, ça arrive ...
              \u200b`)
            .addField(`👮🏼\ Commandes Staff :`, `Pour bannir un membre : \`ban\`
              Pour exclure un membre : \`kick\`
              Pour effacer des messages : \`clear <nombre de messages>\`
              Pour faire une annonce : \`annonce #salon <annonce>\`
              Pour que le bot parle en ton nom : \`say <ce que tu veux qu'il dise>\`
              Pour demander a tous d'arreter de parler : \`silence\`
              D'autres commandes staff arrivent (mute, unmute, tempmute, unban, tempban et bien d'autres)`)
            .addField('\u200b', `De nombreuses commandes sont en développement, patience 
              En attendant tu est bienvenue sur le serveur support,
              Ton ticket => https://discord.gg/zWvtWh8`)
            .setFooter(`PommeAPI `, client.user.displayAvatarURL())
            .setTimestamp();
          message.channel.send(salonhelpembed);
          message.delete()
          break;

          case"❌":
          message.delete()
          message.channel.send("✅ | Action annulée avec succès !")
          break;
      }
  }

});