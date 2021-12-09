/* Global Variables */
const APIkey='f1ffc93770377fb70ecddf17775f3254'
const datetext=document.getElementById('date')
const temptext=document.getElementById('temp')
const contenttext=document.getElementById('content')

/*this function check the zipcode to make sure it is 5 or 9 digits*/
function examineZipCode (zipcode){
    if(zipcode==false) {alert('you must write zip code first!')}
    else if(zipcode<10000) {alert('Zip code can\'t be less than 5 numbers!')}
    else if(zipcode>999999999) {alert('Zip code can\'t be more than 9 numbers!')}
    else if (zipcode>99999 && zipcode<100000000) {alert('Zip code must be 5 or 9 numbers')}
    else if(!(zipcode<=99999 && zipcode>=10000) || (zipcode<=999999999 &&zipcode>=100000000))
    {alert('Zip code must be a number!')}     
}

/*this function check the content to make sure it is not empty*/
function examineContent(content) {
    if (!content) {alert('Enter your feeling.')}
}

/*generate refers to the generate button*/
const generate=document.querySelector('#generate');

/* we will make 3 functions and send the result of each to the server*/

/*first function is for getting date*/
const getDate= async () => {
    try {
        let d = new Date()
        let newDate = (d.getDate()) + '.' + (d.getMonth() + 1) + '.' + (d.getFullYear())
        /*we send the result to the local server at  /date*/
        await fetch('/date', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: newDate
            })
        })
    } catch { //if there is error, console this error
        console.log('Error in getting date. \n' + Error)
    }
}

//second function is for getting feelings (content)
const getContent=async () => {
    try {
        const contentpart = document.querySelector('#feelings')
        const content = contentpart.value
        examineContent(content)
        //we send the result to the local server at /content
        await fetch('/content', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content
            })
        })
    } catch { //if there is error, console this error
        console.log('Error in getting Content. \n' + Error)
    }
}

//third function is for getting temperature
const getTemp=async () => {
    try {
        const zipcodebox = document.querySelector('#zip')
        const zipcode = zipcodebox.value
        examineZipCode(zipcode)
        //we store the URL at variable baseURL
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${APIkey}&units=metric`
        //we want to get URL content by fetching baseURL 
        const URLcontent = await fetch(baseURL)
        //we organize URLcontent as an object through .json

        const details = await URLcontent.json()
        //we want to get temperature only from this object 

        const temp = details.main.temp
        //we send the result to the local server at /temp
        await fetch('/temp', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                temp: temp
            })
        })
    } catch {// if there is an error, console this error
        console.log('Error in getting temperature. \n' + Error)
    }
}

//When the client clicks on the button 'generate', he gets the full data
/*the function getfullData runs the previous 3 functions,
 then brings the final data from the server
 then use this data to write the HTML of the result*/
generate.addEventListener('click',getfullData)
async function getfullData(){
        try{
            getDate()
            await getTemp()
            getContent()
            


            //we bring the final data from the server
            const thedata=await fetch('/finaldata')
            const finaldata=await thedata.json()

            //we use the final data to write HTML of the result
            datetext.innerHTML='date: '+finaldata.date;
            temptext.innerHTML='<br>temperature: '+finaldata.temp;
            contenttext.innerHTML='<br> feeling: <br>'+finaldata.content;
        } catch{// if there is an error in getting data, console this error
            console.log('Error in getting final data. \n'+ Error)
        }
    }

    //we added a button for clearing data, it sets the HTML of result ''
    const cleardata=document.getElementById('cleardata')
    cleardata.addEventListener('click',clear)
    function clear(){
        datetext.innerHTML='';
        temptext.innerHTML='';
        contenttext.innerHTML=''
    }
    


    




