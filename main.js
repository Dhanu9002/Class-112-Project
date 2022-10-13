Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
webcam=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){

    Webcam.snap(function(data_uri){

        document.getElementById("result").innerHTML = '<img id="captured_img" src ="'+data_uri+'">';
        
    });
}

console.log("Ml5 version : ",ml5.version);

var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/yWfQvllC3/model.json",modelLoaded);

function modelLoaded(){
    console.log("Hello !");
}

function speak(){

    var synth=window.speechSynthesis;
    predict1="The first prediction is "+prediction_1;
    predict2="And the second prediction is "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(predict1+predict2);
    synth.speak(utterThis);
}

function check(){
    
    img = document.getElementById("captured_img");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        document.getElementById("result_gesture_name2").innerHTML=results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label=="question hand"){
            document.getElementById("update_gesture").innerHTML = "&#9757;";
        }
        if(results[0].label=="Raised fist "){
            document.getElementById("update_gesture").innerHTML = "&#9995;";
        }
        if(results[0].label=="Vulcan Salute"){
            document.getElementById("update_gesture").innerHTML = "&#128406;";
        }
        if(results[0].label=="Victory Hand"){
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
        if(results[0].label=="Okay or super"){
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
        if(results[1].label=="question hand"){
            document.getElementById("update_gesture2").innerHTML = "&#9757;";
        }
        if(results[1].label=="Raised fist "){
            document.getElementById("update_gesture2").innerHTML = "&#9995;";
        }
        if(results[1].label=="Vulcan Salute"){
            document.getElementById("update_gesture2").innerHTML = "&#128406;";
        }
        if(results[1].label=="Victory Hand"){
            document.getElementById("update_gesture2").innerHTML = "&#9996;";
        }
        if(results[1].label=="Okay or super"){
            document.getElementById("update_gesture2").innerHTML = "&#128076;";
        }
    }
}