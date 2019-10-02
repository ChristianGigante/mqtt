// basic functionalities

//broker
var btnConnect = document.getElementById('connect');
var btnDisConnect = document.getElementById('disconnect');
var broker = document.getElementById('broker');
var btnStatus = document.getElementById('status');

//publisher
var btnPublish = document.getElementById('btnPublish');
var pubTopic = document.getElementById('pubTopic');
var pubPayload = document.getElementById('pubPayload');

//subscriber
var subTopic = document.getElementById('subTopic');
var btnSubscribe = document.getElementById('btnSubscribe');
var btnUnsubscribe = document.getElementById('btnUnsubscribe');

btnDisConnect.disabled = true;

//btnConnect
btnConnect.addEventListener('click', function (e) {
  e.preventDefault();
  //client
  var client = mqtt.connect(broker.value)
  // client.subscribe("mqtt/demox")
  //status
  btnStatus.setAttribute('value', 'Connecting..,')
  client.on("connect", function () {
    console.log("Successfully connected");
    btnStatus.disabled = false;
    btnDisConnect.disabled = false;
    btnConnect.disabled = true;
    btnStatus.setAttribute('value', 'Successfully Connected!')
    btnStatus.setAttribute('class', 'btn btn-success')
    btnSubscribe.disabled = false;
    btnPublish.disabled = false;
  });

  // client.publish("mqtt/demox", "hello world!")

  btnPublish.addEventListener('click', function (e) {
    e.preventDefault();
    client.publish(pubTopic.value, pubPayload.value)
  })

  //subscribe
  btnSubscribe.addEventListener('click', function (e) {
    e.preventDefault();
    client.subscribe(subTopic.value);
    btnUnsubscribe.disabled = false;
    // btnSubscribe.disabled = true;
    console.log("Subscribe to: " + subTopic.value)
  })

  //unsubscribe
  btnUnsubscribe.addEventListener('click', function (e) {
    e.preventDefault();
    client.unsubscribe(subTopic.value);
    // btnUnsubscribe.disabled = true;
    // btnSubscribe.disabled = false;
    console.log("Unsubscribe to " + subTopic.value)
  })

  //btnDisconnect
  btnDisConnect.addEventListener('click', function () {
    client.end();
    btnStatus.disabled = true;
    btnDisConnect.disabled = true;
    btnConnect.disabled = false;
    btnSubscribe.disabled = true;
    btnPublish.disabled = true;
    btnUnsubscribe.disabled = true;
    console.log('Disconnected');
    btnStatus.setAttribute('value', 'Successfully Disconnected!')
    btnStatus.setAttribute('class', 'btn btn-warning')
  });


  client.on("message", function (topic, payload) {
    //let finalTopic = topic.slice(5);
    console.log("message= " + [topic, payload].join(": "));
    let tbl = document.getElementById('receiver');
    let tbody = document.getElementById('msg');
    let tr = document.createElement('tr');
    let msgTopic = document.createElement('td');
    let msgPayload = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(topic));
    msgPayload.appendChild(document.createTextNode(payload));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
    tr.appendChild(msgPayload);
    tr.appendChild(msgTime);
    tbody.prepend(tr);
    tbl.prepend(tbody);
    // $('.broker tbody').append("<tr><td>" + finalTopic + "</td><td>" + payload + "</td><td>" + moment().format('llll') + "</td></tr>");

  })


});














// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
