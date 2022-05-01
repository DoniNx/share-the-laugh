const { Telegraf } = require('telegraf')
const bot = new Telegraf('5391447523:AAG3afxruTgw-aRx5Y2cC1eycuLNRc5Lq_4')

let memeCaption;
let memeId;


bot.help((ctx) => ctx.reply('a guide on how to send memes'))



 bot.start(async(ctx)=>{
    ctx.reply('Forward the meme sucker')
    await bot.on(['photo', 'video'], (ctx)=>{
        
        memeCaption = ctx.message.caption ? removePromo(ctx.message.caption) : ' ';
    
        memeId = ctx.message.photo.pop();
        
        setTimeout(() => {
            
            ctx.replyWithMediaGroup([{
                media: `${memeId.file_id}`,
                caption: `${memeCaption} \n \n --------------------- \n @STL2_bot`,
                type: 'photo'
              }],)
            ctx.reply('Shits done 👍')
            
            ctx.telegram.sendMediaGroup( 604247733, [ {
                media: `${memeId.file_id}`,
                caption: `${memeCaption} \n \n --------------------- \n @STL2_bot`,
                type: 'photo'
              }]).then(function(){
                console.log("mesage forwaded")
                });
                

        }, 600);



    });    

});

// utils
function removePromo(text){
    const string = '^@';
    const regexp = new RegExp(string);
    let returnText = '';
    let textArray = text.split(' ');
    
    for(let i = 0; i <= textArray.length; i++){
      if(regexp.test(textArray[i])){
        textArray.splice(i)
      }else{
        returnText += textArray[i] + ' ';
      }
    }
    
    return returnText;

}
  

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

