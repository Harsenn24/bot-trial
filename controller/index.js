const { Telegraf } = require('telegraf');
const token = process.env.token_tele
const bot = new Telegraf(token);
const { youtube } = require('scrape-youtube');

class BotTelegram {
    static async get_bot(req, res) {
        try {
            bot.command('/get', async (ctx, next) => {

                let text_message = ctx.message.text
            
                let title = text_message.split(" ")
            
                title.splice(0, 1)
            
                let search_yt = title.join(" ");
            
                let { videos } = await youtube.search(search_yt)
            
                for (let i = 0; i < videos.length; i++) {
                    ctx.reply(videos[i].link);
                }
            
            })
            
            bot.on('text', async (ctx) => {
                await ctx.telegram.sendMessage(ctx.message.chat.id, `Welcome to Sangkakala Youtube engine search! \n make sure you type "/get <search_keyword>" \n for example: "/get Transformer 2"`);
            })
            
            
            bot.launch()

            res.status(200).json('Berhasil')


        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { BotTelegram }