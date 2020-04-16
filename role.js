if (cmd === `${prefix}role`) {
  const role = message.guild.roles.cache.find(r => r.name === args[0]);
  if(!args[0]) return message.reply("Il faut que tu spécifie le role que tu demande.")
  if (!role) return message.channel.send("Ce rôle n'existe pas !");
  if (args[1]){
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("❌ | Il te faut la permission ADMINISTRATOR pour utiliser cette commande !");
    const member = message.mentions.members.first();
    if (member.roles.cache.find(r => r.name === args[0])) {
      member.roles.remove(role);
      message.channel.send(`✅ | J'ai supprimé le rôle ${role} à ${member}.`);
      message.delete();
    } else {
      member.roles.add(role);
      message.channel.send(`✅ | J'ai ajouté le rôle ${role} à ${member}.`);
      message.delete();
    }  
  }else{
    if (message.member.roles.cache.find(r => r.name === args[0])) {
      message.member.roles.remove(role);
      message.channel.send(`✅ | J'ai supprimé le rôle ${role} à ${message.author}.`);
      message.delete();
    } else {
      message.member.roles.add(role);
      message.channel.send(`✅ | J'ai ajouté le rôle ${role} à ${message.author}.`);
      message.delete();
    }  
  }
}