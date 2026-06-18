const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

const intent_list = new Discord.Intents([
  "GUILD_MEMBERS",
  "GUILD_MESSAGES",
  "GUILDS",
  "GUILD_INVITES",
]);

const client = new Discord.Client({
  ws: {
    intents: intent_list,
  },
});

// Heroku/Replit/서버 환경변수를 사용할 경우 process.env.token에 토큰을 넣으세요.
// 환경변수를 사용하지 않는다면 아래 "디스코드 봇 토큰" 부분을 실제 봇 토큰으로 바꾸세요.
const token = process.env.token || "디스코드 봇 토큰";

// 입장/퇴장 메시지를 보낼 채널 이름
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";

// 입장/퇴장 메시지 내용
const welcomeChannelComment = "어서오세요!";
const byeChannelComment = "서버를 떠났습니다.";

// 입장 시 지급할 역할 이름
const roleName = "게스트";

client.on("ready", () => {
  console.log("켰다.");

  client.user.setPresence({
    activity: {
      name: "!help를 쳐보세요.",
    },
    status: "online",
  });
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;

  const welcomeChannel = guild.channels.cache.find(
    (channel) => channel.name === welcomeChannelName
  );

  if (welcomeChannel) {
    welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);
  }

  const role = guild.roles.cache.find((r) => r.name === roleName);

  if (role) {
    member.roles.add(role.id).catch(console.error);
  }
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;

  const byeChannel = guild.channels.cache.find(
    (channel) => channel.name === byeChannelName
  );

  if (byeChannel) {
    byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
  }
});

client.on("message", (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    return message.reply("pong");
  }

  if (message.content === "!si") {
    const embed = new Discord.MessageEmbed();

    const img =
      "https://cdn.discordapp.com/icons/419671192857739264/6dccc22df4cb0051b50548627f36c09b.webp?size=256";

    const duration = moment
      .duration(client.uptime)
      .format(" D [일], H [시간], m [분], s [초]");

    embed.setColor("#186de6");
    embed.setAuthor("server info of 콜라곰 BOT", img);
    embed.setFooter("콜라곰 BOT ❤️");
    embed.addField(
      "RAM usage",
      `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
      true
    );
    embed.addField("running time", `${duration}`, true);
    embed.addField("user", `${client.users.cache.size}`, true);
    embed.addField("server", `${client.guilds.cache.size}`, true);
    embed.addField("Discord.js", `v${Discord.version}`, true);
    embed.addField("Node", `${process.version}`, true);

    const guilds = client.guilds.cache.array();
    let list = "```css\n";

    for (let i = 0; i < guilds.length; i++) {
      list += `${guilds[i].name}\n`;
    }

    list += "```\n";

    embed.addField("list:", `${list}`);
    embed.setTimestamp();

    return message.channel.send(embed);
  }

  if (message.content === "!embed") {
    const img =
      "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/22QT/image/p-RX98d_34y9ElK_Qfwz8OfHhxM.jpg";

    const embed = new Discord.MessageEmbed()
      .setTitle("제작자")
      .setURL("http://www.naver.com")
      .setAuthor("wnsdud820", img, "http://www.youtube.com")
      .setThumbnail(img)
      .addField("제작중", "제작중")
      .addField("제작중", "제작중", true)
      .addField("제작중", "제작중", true)
      .addField("제작중", "제작중", true)
      .addField("제작중", "제작중")
      .setTimestamp()
      .setFooter("wnsdud820이 만듬", img);

    return message.channel.send(embed);
  }

  if (message.content === "!help") {
    const helpImg =
      "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/22QT/image/p-RX98d_34y9ElK_Qfwz8OfHhxM.jpg";

    const commandList = [
      {
        name: "!ping",
        desc: "봇이 잘 살아있는지 확인하기 위함",
      },
      {
        name: "!초대코드",
        desc: "서버 초대링크 생성",
      },
      {
        name: "!embed",
        desc: "embed 예제1",
      },
      {
        name: "!청소 (숫자)",
        desc: "메시지를 숫자만큼 삭제(관리자용)",
      },
      {
        name: "!전체공지 (공지내용)",
        desc: "dm으로 전체 공지 보내기(관리자용)",
      },
      {
        name: "!전체공지2 (공지내용)",
        desc: "dm embed형식으로 전체 공지 보내기(관리자용)",
      },
      {
        name: "!help",
        desc: "명령어 설명",
      },
    ];

    let commandStr = "";

    const embed = new Discord.MessageEmbed()
      .setAuthor("Help of helpingbot", helpImg)
      .setColor("#186de6")
      .setFooter("HelpingBot")
      .setTimestamp();

    commandList.forEach((x) => {
      commandStr += `• \`\`${changeCommandStringLength(
        `${x.name}`
      )}\`\` : **${x.desc}**\n`;
    });

    embed.addField("Commands: ", commandStr);

    return message.channel.send(embed);
  }

  if (message.content.startsWith("!전체공지2")) {
    if (checkPermission(message)) return;

    if (message.member !== null) {
      const contents = message.content.slice("!전체공지2".length);

      const embed = new Discord.MessageEmbed()
        .setAuthor("공지 of HelpingBOT")
        .setColor("#186de6")
        .setFooter("HelpingBOT")
        .setTimestamp();

      embed.addField("공지: ", contents || "공지 내용이 없습니다.");

      message.member.guild.members.cache.array().forEach((member) => {
        if (member.user.bot) return;
        member.user.send(embed).catch(console.error);
      });

      return message.reply("공지를 전송했습니다.");
    }

    return message.reply("채널에서 실행해주세요.");
  }

  if (message.content === "!초대코드") {
    if (message.channel.type === "dm") {
      return message.reply("dm에서 사용할 수 없는 명령어 입니다.");
    }

    return message.guild.channels.cache
      .get(message.channel.id)
      .createInvite({
        maxAge: 0,
      })
      .then((invite) => {
        message.channel.send(invite.url);
      })
      .catch((err) => {
        if (err.code === 50013) {
          message.channel.send(
            `**${message.guild.channels.cache.get(message.channel.id).guild.name}** 채널 권한이 없어 초대코드 발행 실패`
          );
        } else {
          console.error(err);
        }
      });
  }

  if (message.content.startsWith("!전체공지")) {
    if (checkPermission(message)) return;

    if (message.member !== null) {
      const contents = message.content.slice("!전체공지".length);

      message.member.guild.members.cache.array().forEach((member) => {
        if (member.user.bot) return;
        member.user.send(`<@${message.author.id}> ${contents}`).catch(console.error);
      });

      return message.reply("공지를 전송했습니다.");
    }

    return message.reply("채널에서 실행해주세요.");
  }

  if (message.content.startsWith("!청소")) {
    if (message.channel.type === "dm") {
      return message.reply("dm에서 사용할 수 없는 명령어 입니다.");
    }

    if (checkPermission(message)) return;

    const clearLine = message.content.slice("!청소 ".length);
    const isNum = !isNaN(clearLine);

    if (isNum && (clearLine <= 0 || clearLine > 100)) {
      return message.channel.send("1부터 100까지의 숫자만 입력해주세요.");
    }

    if (!isNum) {
      // 사용 예시: !청소 @유저 3
      if (message.content.split("<@").length === 2) {
        if (isNaN(message.content.split(" ")[2])) return;

        const user = message.content.split(" ")[1].split("<@!")[1].split(">")[0];
        const count = parseInt(message.content.split(" ")[2]) + 1;

        let deletedCount = 0;

        message.channel.messages.fetch().then((collected) => {
          collected.every((msg) => {
            if (msg.author.id === user) {
              msg.delete().catch(console.error);
              deletedCount++;
            }

            return deletedCount !== count;
          });
        });
      }

      return;
    }

    return message.channel
      .bulkDelete(parseInt(clearLine) + 1)
      .then(() => {
        message.channel
          .send(
            `<@${message.author.id}> ${parseInt(
              clearLine
            )} 개의 메시지를 삭제했습니다.\n(이 메시지는 잠시 후 사라집니다.)`
          )
          .then((msg) => msg.delete({ timeout: 3000 }));
      })
      .catch(console.error);
  }
});

function checkPermission(message) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(
      `<@${message.author.id}> 명령어를 수행할 관리자 권한을 소지하고 있지않습니다.`
    );

    return true;
  }

  return false;
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for (let i = 0; i < limitLen; i++) {
    tmp += " ";
  }

  return tmp;
}

client.login(token);
