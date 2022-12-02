prediction_1 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1IjWwD4nt/model.json',modelLoaded);

//create your model and store it in var classifier 
function modelLoaded(){
    console.log('Model Loaded!');
}
function speak() {
    var synth = window.speechSynthesis;
    speak1 = "The prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak1);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if (error) {
        console.error(error);
    } else{ 
        console.log(results);
        document.getElementById("status").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "Mask"){
           document.getElementById("update_emoji").innerHTML = "&#x1F637;"; 
        
        }
        if(results[0].label == "No mask"){
            document.getElementById("update_emoji").innerHTML = "&#x26d4;"; 
         
         }
        }
    }


//define function modelLoaded

//define function check() 


//define function gotResult(error, results)
