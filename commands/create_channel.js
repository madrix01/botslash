const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("channel")
  .setDescription("Create private channel, /channel create @role")
  .addSubcommand((submcommand) =>
    submcommand
      .setName("create")
      .setDescription("create channel")
      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("Name for channel")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("role")
          .setDescription("Role for channel")
          .setRequired(true)
      )
  );
module.exports = {
  data: data,
  async execute(interaction) {
    let action = await interaction.options.getSubcommand();
    if (action === "create") {
      let name = interaction.options.getString("name");
      let role = await interaction.options.getString("role");
      await interaction.guild.channels.create(name, {
        reason: "Needed a cool new channel",
        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone,
            deny: [Permissions.FLAGS.VIEW_CHANNEL],
          },
          {
            id: role.slice(3, -1),
            allow: [Permissions.FLAGS.VIEW_CHANNEL],
          },
        ],
      });
      await interaction.reply(`Channel created #${name}`);
    }
  },
};
