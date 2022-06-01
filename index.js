const Discord = require('discord.js')
const client = new Discord.Client()

//score
rpsScore = 0;
typeScore = 0;
dodgeScore = 0;

client.on('ready', function() {
  console.log('Running as ' + client.user.tag)
})

//goes through messages
client.on('message', function(msg) {

  const txt = msg.content

  //checks for required message to start game
  if (txt.startsWith('play')) {

    //filters messages; checks if person who initiated command replied
    const filter = m => m.author.id === msg.author.id

    //request to continue with game
    msg.reply('do you want to play a game?')

    //waits for confirmation to begin game
    msg.channel.awaitMessages(filter, { max: 1, time: 10000 })
      .then(collected => {

        //checks the user input to see if game should start or not
        if (collected.first().content === 'yes') {

          //game choices
          msg.reply('choose one:\n(1) Rock Paper Scissors\n(2) Type Fast\n(3) Dodge!')

          //waits for game choice
          msg.channel.awaitMessages(filter, { max: 1, time: 10000 })
            .then(collected => {

              //if Rock Paper Scissors is chosen
              if (collected.first().content === '(1)' || collected.first().content === '1'|| collected.first().content === '1.' || collected.first().content === 'Rock Paper Scissors' || collected.first().content === 'rock paper scissors') {

                const rps = new Discord.MessageEmbed()
                  .setColor('AQUA')
                  .setTitle('Rock Paper Scissors has been chosen!')
                  .setDescription('Type \"-help\" for instructions on how to play!\nType \"-start\" to begin!')
                  .setFooter('\n\nAfter typing \"-start\", enter your first choice.')

                msg.channel.send(rps)

                //start or need help
                msg.channel.awaitMessages(filter, { max: 1, time: 20000 })
                  .then(collected => {
                    
                    if(collected.first().content === '-start') { 

                      msg.channel.awaitMessages(filter, { max: 1, time: 10000 })
                        .then(collected => {

                          choice = ''
                          botChoice = ''
                          randomNum = Math.floor((Math.random() * 3) + 1)

                          //checks player choice
                          if(collected.first().content === 'rock' || collected.first().content === 'Rock') {
                            choice = 'r'
                          }
                          else if(collected.first().content === 'paper' || collected.first().content === 'Paper') {
                            choice = 'p'
                          }
                          else if(collected.first().content === 'scissors' || collected.first().content === 'Scissors') {
                            choice = 's'
                          }
                          //displays score
                          else if(collected.first().content === '-score') {
                            choice = 'e'
                            msg.reply('Final Score: ' + rpsScore)
                          }

                          //if choice is invalid
                          if(choice !== 'r' && choice !== 'p' && choice !== 's' && choice !== 'e') {
                            msg.reply('Invalid Input!')
                            randomNum = 0
                          }

                          if(choice === 'e')
                            randomNum = 0;

                          //displays cpu choice
                          if(randomNum == 1) {
                            botChoice = 'r'
                            msg.reply('I chose Rock!')
                          }
                          else if(randomNum == 2) {
                            botChoice = 'p'
                            msg.reply('I chose Paper!')
                          }
                          else if(randomNum == 3) {
                            botChoice = 's'
                            msg.reply('I chose Scissors!')
                          }

                          //decides on winner
                          if(choice === 'r' && botChoice === 's') {
                            const w1 = new Discord.MessageEmbed()
                              .setColor('GREEN')
                              .setTitle('You Win! +1')
                              rpsScore++

                            msg.channel.send(w1)
                          }
                          else if(choice === 'p' && botChoice === 'r') {
                            const w2 = new Discord.MessageEmbed()
                              .setColor('GREEN')
                              .setTitle('You Win! +1')
                              rpsScore++

                            msg.channel.send(w2)
                          }
                          else if(choice === 's' && botChoice === 'p') {
                            const w3 = new Discord.MessageEmbed()
                              .setColor('GREEN')
                              .setTitle('You Win! +1')
                              rpsScore++

                            msg.channel.send(w3)
                          }
                          else if(choice === 'r' && botChoice === 'p') {
                            const w4 = new Discord.MessageEmbed()
                              .setColor('RED')
                              .setTitle('You Lose! -1')
                              rpsScore--

                            msg.channel.send(w4)
                          }
                          else if(choice === 'p' && botChoice === 's') {
                            const w5 = new Discord.MessageEmbed()
                              .setColor('RED')
                              .setTitle('You Lose! -1')
                              rpsScore--

                            msg.channel.send(w5)
                          }
                          else if(choice === 's' && botChoice === 'r') {
                            const w6 = new Discord.MessageEmbed()
                              .setColor('RED')
                              .setTitle('You Lose! -1')
                              rpsScore--

                            msg.channel.send(w6)
                          }
                          else if(choice === 'r' && botChoice === 'r') {
                            const w6 = new Discord.MessageEmbed()
                              .setColor('YELLOW')
                              .setTitle('Tie!')

                            msg.channel.send(w6)
                          }
                          else if(choice === 'p' && botChoice === 'p') {
                            const w6 = new Discord.MessageEmbed()
                              .setColor('YELLOW')
                              .setTitle('Tie!')

                            msg.channel.send(w6)
                          }
                          else if(choice === 's' && botChoice === 's') {
                            const w6 = new Discord.MessageEmbed()
                              .setColor('YELLOW')
                              .setTitle('Tie!')

                            msg.channel.send(w6)
                          }

                        })
                        //if request times out
                        .catch(collected => {
                          msg.reply('reply timed out.')
                        })
                    }

                    //instructions
                    else if(collected.first().content === '-help') {

                      const help = new Discord.MessageEmbed()
                        .setColor('ORANGE')
                        .setTitle('Instructions')
                        .setDescription('Begin by typing \"rock\", \"paper\", or \"scissors\"!\nAfter clicking enter, I will display my choice.\n1 point will be awarded to the winner.\nAs always, rock beats scissors, scissors beats paper, and paper beats rock!\nYou are given 5 seconds to make your choice.\nType \"-score\" to stop the game!')

                        msg.channel.send(help)

                    }

                  })
                  //if request times out
                  .catch(collected => {
                    msg.reply('reply timed out.  Try again.')
                  })
              }
              //if Type Fast is chosen
              else if (collected.first().content === '(2)' || collected.first().content === '2'|| collected.first().content === '2.' || collected.first().content === 'Type Fast' || collected.first().content === 'type fast') {

                const type = new Discord.MessageEmbed()
                  .setColor('AQUA')
                  .setTitle('Type Fast has been chosen!')
                  .setDescription('Type \"-help\" for instructions on how to play!\nType \"-start\" to begin!')

                msg.channel.send(type)

                //start or need help
                msg.channel.awaitMessages(filter, { max: 1, time: 10000 })
                  .then(collected => {
                    
                    //if user decides to start game
                    if(collected.first().content === '-start') {

                      //possible words to type
                      var words = []
                      words.push('hi')
                      words.push('car')
                      words.push('potatoes')
                      words.push('car')
                      words.push('mousepad')
                      words.push('computer system')
                      words.push('computer science club')
                      words.push('whiteboard')
                      words.push('printer')
                      words.push('table')
                      words.push('chair')
                      words.push('cool')
                      words.push('fan')
                      words.push('air conditioner')
                      words.push('glasses')
                      words.push('game')
                      words.push('begin')
                      words.push('finish')
                      words.push('phone')
                      words.push('television')
                      words.push('yogurt')
                      words.push('bread')
                      words.push('burger')
                      words.push('screen')
                      words.push('window')
                      words.push('apple')
                      words.push('orange')
                      words.push('android')

                      //chooses random word
                      wordSelected = Math.floor(Math.random() * 27)

                      //displays randomly chosen word
                      msg.channel.send(words[wordSelected])

                      //waits for user response
                      msg.channel.awaitMessages(filter, { max: 1, time: 3000 })
                        .then(collected => {
                          //if user types in word correctly
                          if(collected.first().content === words[wordSelected]) {
                            typeScore++

                            const correct = new Discord.MessageEmbed()
                              .setColor('GREEN')
                              .setTitle('Nice! +1')

                            msg.channel.send(correct)
                          }
                          //displays score
                          else if(collected.first().content === '-score') {
                            msg.channel.send("Final score: " + typeScore)
                          }
                          //if user types word incorrectly
                          else {
                            typeScore--

                            const wrong = new Discord.MessageEmbed()
                              .setColor('RED')
                              .setTitle('Incorrect! -1')

                              msg.channel.send(wrong)
                          }
                        })
                        //if response times out
                        .catch(collected => {
                          msg.reply('reply timed out.  Try again.')
                        })
                    }
                    //instructions
                    else if(collected.first().content === '-help') {
                      const help = new Discord.MessageEmbed()
                        .setColor('ORANGE')
                        .setTitle('Instructions')
                        .setDescription('Random words will appear!\nType them under three seconds to gain one point!\nType \"-score\" to get your score!\nYou lose points if you do not type fast enough!')
                        .setFooter('All words are lowercase!')

                        msg.channel.send(help)
                    }

                  })
                  //if request times out
                  .catch(collected => {
                    msg.reply('reply timed out.  Try again.')
                  })
              }
              //if Dodge! is chosen
              else if (collected.first().content === '(3)' || collected.first().content === '3'|| collected.first().content === '3.' || collected.first().content === 'Dodge!' || collected.first().content === 'dodge!') {

                const dodge = new Discord.MessageEmbed()
                  .setColor('AQUA')
                  .setTitle('Dodge! has been chosen!')
                  .setDescription('Type \"-help\" for instructions on how to play!\nType \"-start\" to begin!')

                msg.channel.send(dodge)

                //start or need help
                msg.channel.awaitMessages(filter, { max: 1, time: 5000 })
                  .then(collected => {
                    
                    //if user decides to start game
                    if(collected.first().content === '-start') {

                      askScore = false
                      temp = Math.floor((Math.random() * 2) + 1)
                      obstacle = '';

                      if(temp === 1) {
                        obstacle = 'Bush'
                      }
                      else if(temp === 2) {
                        obstacle = 'Bird'
                      }

                      //displays obstacle
                      msg.channel.send(obstacle);

                      msg.channel.awaitMessages(filter, { max: 1, time: 5000 })
                        .then(collected => {

                          //displays score
                          if(collected.first().content === '-score') {
                                msg.channel.send("Final Score: " + dodgeScore)
                                askScore = true
                          }

                          //decides if user input was correct
                          if(collected.first().content === 'jump' && obstacle === 'Bush') {
                            dodgeScore++

                            const correct = new Discord.MessageEmbed()
                              .setColor('GREEN')
                              .setTitle('Nice! +1')

                            msg.channel.send(correct)
                          }
                          else if(collected.first().content === 'duck' && obstacle === 'Bird') {
                            dodgeScore++

                            const correct = new Discord.MessageEmbed()
                              .setColor('GREEN')
                              .setTitle('Nice! +1')

                            msg.channel.send(correct)
                          }
                          else if(collected.first().content === 'jump' && obstacle === 'Bird') {
                            dodgeScore--

                            const wrong = new Discord.MessageEmbed()
                              .setColor('RED')
                              .setTitle('Hit! -1')

                              msg.channel.send(wrong)
                          }
                          else if(collected.first().content === 'duck' && obstacle === 'Bush') {
                            dodgeScore--

                            const wrong = new Discord.MessageEmbed()
                              .setColor('RED')
                              .setTitle('Hit! -1')

                              msg.channel.send(wrong)
                          }
                          else if(!askScore) {
                            msg.channel.send('Invalid Input')
                          }
                        })
                        //if response times out
                        .catch(collected => {
                          msg.reply('reply timed out.  Try again.')
                        })
                    }
                    //instructions
                    else if(collected.first().content === '-help') {
                        const help = new Discord.MessageEmbed()
                        .setColor('ORANGE')
                        .setTitle('Instructions')
                        .setDescription('Avoid obstacles!\nYou will either run into a bush or a bird.\nType \"jump\" to dodge the bush; type \"duck\" to dodge the bird!\nType \"-score\" to get your score!\nYou lose points if you hit obstacles!')

                        msg.channel.send(help)
                    }

                  })
                  //if request times out
                  .catch(collected => {
                    msg.reply('reply timed out.  Try again.')
            })

              }
              //backup
              else {
                msg.reply('Invalid Choice!')
              }

            })
            //if request times out
            .catch(collected => {
              msg.reply('reply timed out.  Try again.')
            })

        }
        //cancels game request
        else if (collected.first().content === 'no') {
          msg.reply('request cancelled')
        }

      })
      //if request times out
      .catch(collected => {
        msg.reply('reply timed out.  Try again.')
      })

  }

})

client.login(process.env.DISCORD)