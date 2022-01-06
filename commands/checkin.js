const { SlashCommandBuilder, channelMention } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("checkin")
  .setDescription("checkin into your team")
  .addNumberOption((option) =>
    option
      .setName("team_number")
      .setDescription("Checkin your team")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("devfolio_id")
      .setDescription("Enter your devfolio id")
      .setRequired(true)
  );

module.exports = {
  data: data,
  async execute(interaction) {
    if (interaction.channel.name !== "check-in") {
      await interaction.reply(
        "Please use this command in <#928331966552608799> channel"
      );
      return;
    }
    let team_name = await interaction.options.getNumber("team_number");
    let team_found = false;
    let has_team = false;
    let role_name = `Team-${team_name}`;
    let role_id = "";
    let devfolio_id = await interaction.options.getString("devfolio_id");
    await interaction.member.roles.cache.find((role) => {
      if (role.name.startsWith("Team-")) {
        role_id = role.id;
        has_team = true;
      }
    });
    if (!has_team) {
      await interaction.guild.roles.cache.find((role) => {
        if (team_name === role.name) {
          team_found = true;
          interaction.member.roles.add(role);
          role_id = role.id;
        }
      });
      if (team_found === false) {
        await interaction.guild.roles.create({
          name: role_name,
        });
        await interaction.guild.roles.cache.find((role) => {
          if (role_name === role.name) {
            role_id = role.id;
            interaction.member.roles.add(role);
          }
        });
      }
      await interaction.reply(
        `You've have been checked in <@&${role_id}> ! welcome to DotSlash5.0. Devfolio ID: ${devfolio_id}`
      );
    } else {
      await interaction.reply(`You're already in a team <@&${role_id}>`);
    }
  },
};
