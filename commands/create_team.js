const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
  .setName("team")
  .setDescription("Team related tasks")
  .addSubcommand((submcommand) =>
    submcommand
      .setName("create")
      .setDescription("create team")
      .addStringOption((option) =>
        option.setName("name").setDescription("Name for team").setRequired(true)
      )
  );

module.exports = {
  data: data,
  async execute(interaction) {
    let action = await interaction.options.getSubcommand();
    if (action === "create") {
    }
  },
};
