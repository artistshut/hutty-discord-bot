var Discordie;
try { Discordie    = require("../"); }            catch(e) {}
try { Discordie    = require("discordie"); }    catch(e) {}

var client    = new Discordie({ autoReconnect: true });
var Events    = Discordie.Events;

var auth = { token: process.env.BOT_TOKEN }
try { auth = require("./auth"); }    catch(e) {}
client.connect(auth);



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Iniciar o bot
client.Dispatcher.on("GATEWAY_READY", e =>
{
    console.log("Bot ligado com o nome " + client.User.username);
});



// Quando o bot v? uma nova msg no server, verifica se ? um comando e executa-o
client.Dispatcher.on("MESSAGE_CREATE", e =>
{
    var command    = e.message.content;

    if (/^!order /.test(command))
            cmd_order(e, command.substr(7));
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function cmd_order(e, pedido)
{
    // Canal de texto para onde vao os avisos de que alguem fez !order
    var text_channel = e.message.guild.textChannels.find(c => c.name === "design_orders");

    // Mensagem dada pelo bot
    text_channel.sendMessage("", false, {
        color:            0xffe100,
        author:            { name: "New Order!", icon_url: "https://cdn.discordapp.com/app-icons/447581765884968970/7e4bfc46b55858ac71170acd1a44d24f.png" },
        description:    "The user " + e.message.author.mention + " asked for the following:\n" + pedido,
        timestamp:        e.message.timestamp
    });
}