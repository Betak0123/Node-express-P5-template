let clientSocket




function setup(){
    frameRate(60)
    createCanvas(windowWidth, windowHeight)
    background('black')    
    // io kommer fra socket.io biblioteket
    
    fetch('http://localhost:6969/ip')
    .then(res => res.json())
    .then(data => {
        select('#info').html('Serverens ip: '+data.ip+ '  Serverens port: '+ data.port)
        
    })
    clientSocket = io.connect()
    clientSocket.on('newMessage', message => {
        let p = createElement('p', message)
        select('#chat').child(p)
        select('#chat').elt.scrollTop = select('#chat').elt.scrollHeight
    })
    select('#nameButton').mousePressed(()=>{
        console.log('ny bruger - sender til server med navn: '+select('#name').value())
        clientSocket.emit('newUser', select('#name').value())
        select('#namebox').addClass('hide')
        select('#chatbox').removeClass('hide')
    })
}

function draw(){
    //mouseX mouseY frameCount map
}

function keyPressed(){
    if(key == 'Enter' ){
        let message = select('#message').value()
        select('#message').value('')
        console.log(message)

        clientSocket.emit('chat', message)
    }
    // console.log(key)
}

// function mousePressed(){
//     select('#info').html('Hovsa! uwu')
// }

// function mouseReleased(){
//     select('#info').html('skriv her!')
// }

// function keyPressed(event){
//     select('#info').html('Du trykkede: ' + event.key)
// }