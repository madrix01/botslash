const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
  .setName("checkin")
  .setDescription("checkin into your team")
  .addStringOption((option) =>
    option.setName("team").setDescription("Checkin your team").setRequired(true)
  );

module.exports = {
  data: data,
  async execute(interaction) {
    let team_name = await interaction.options.getString("team");
    let team_found = false;
    let role_name = `Team-${team_name}`;

    await interaction.guild.roles.cache.find((role) => {
      if (team_name === role.name) {
        console.log("Here");
        team_found = true;
        interaction.member.roles.add(role);
      }
    });
    if (team_found === false) {
      await interaction.guild.roles.create({ name: role_name });
      await interaction.guild.roles.cache.find((role) => {
        if (role_name === role.name) {
          interaction.member.roles.add(role);
        }
      });
    }
  },
};
