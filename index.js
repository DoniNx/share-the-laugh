const { Telegraf } = require('telegraf')
const { BOT_TOKEN } = require('./config');
const bot = new Telegraf(BOT_TOKEN)
// let greetingPhrases = ['HEY', "HELLO", 'HI', 'HI THERE', "HOW ARE YOU?", 'YO', "WHAT'S UP", "WADDUP", "SUP"];
let memeCaption;
let memeId;




// bot.start((ctx) => ctx.reply('Hellllooo 😎, user /post to post your meme'))
bot.help((ctx) => ctx.reply('a guide on how to send memes'))

// bot.command('post', async (ctx) => {
//         ctx.reply('Send the video clip or an image file')
//         await bot.on('photo', (ctx)=>{
//             setTimeout(() => {
//                 memeId = ctx.message.photo.pop();
//                 ctx.reply('Cool')

//             }, 700);

//             setTimeout(async () => {
//             ctx.reply('Add a caption now')

//             await bot.on('text', (ctx)=>{
//                     memeCaption = ctx.message.text;
//                     ctx.reply("Shits done 👍");

//                     setTimeout(() => {
//                         ctx.replyWithMediaGroup([{
//                             media: `${memeId.file_id}`,
//                             caption: `${memeCaption} \n \n --------------------- \n @STL2_bot`,
//                             type: 'photo'
//                           }],)
                        
//                         ctx.telegram.sendMediaGroup( 604247733, [ {
//                             media: `${memeId.file_id}`,
//                             caption: `${memeCaption} \n \n --------------------- \n @STL2_bot`,
//                             type: 'photo'
//                           }]).then(function(){
//                             console.log("mesage forwaded")
//                             });
                            
        
//                     }, 700);
                    
//                 }); 
//             }, 1300);


//         });    

       

// })

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

