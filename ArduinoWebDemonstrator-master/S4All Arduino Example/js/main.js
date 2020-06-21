function xhrSuccess() {
    this.callback.apply(this, this.arguments);
}

function xhrError() {
    console.error(this.statusText);
}
//---------------------------------------------------
function orderToGetHouses() {
    getRecords("http://localhost:8002/house", getAllHouses);
}

function getAllHouses() {
    let htmlContent = ""
    let houses = JSON.parse(this.responseText);
    houses = houses.data;
    houses.forEach(house => {
        htmlContent = htmlContent + "<option value=" + house.zipCode + ">" + house.zipCode + "</option>";
    });
    document.getElementById("sel1").innerHTML = htmlContent;
}

function getRecords(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.callback = callback;
    xhr.arguments = Array.prototype.slice.call(arguments, 2);
    xhr.onload = xhrSuccess;
    xhr.onerror = xhrError;
    xhr.open("GET", url, true);
    xhr.send(null);
}

async function createRecords() {
    let records = await getAllRecords();
    records = records.data;
    let htmlContent = ""
    /*let sensors = JSON.parse(this.responseText);
    sensors = sensors.data;*/

    records.forEach(async (rc) => {
        htmlContent = htmlContent + "<tr>";
        htmlContent = htmlContent + " <td>" + rc.idSensor + "</td>";
        htmlContent = htmlContent + " <th scope='row'>" + rc.idSpace + "</th>";
        htmlContent = htmlContent + " <td>" + rc.zipCode + "</td>";
        htmlContent = htmlContent + " <td>" + rc.value + "</td>";
        htmlContent = htmlContent + " <td>" + rc.date + "</td>";


        htmlContent = htmlContent + "<tr>";
        htmlContent = htmlContent + "<tr>";
        htmlContent = htmlContent + "<tr>";
    })
    document.getElementById("records").innerHTML = htmlContent;
}

async function createTable() {

    houseId = document.getElementById("sel1").value;
    let sensors = await getSensorsByHouse(houseId);
    sensors = sensors.data;
    let htmlContent = ""
    /*let sensors = JSON.parse(this.responseText);
    sensors = sensors.data;*/

    sensors.forEach(async (sensor) => {
        htmlContent = htmlContent + "<tr>";
        htmlContent = htmlContent + " <td>" + sensor.idSensor + "</td>";
        htmlContent = htmlContent + " <th scope='row'>" + sensor.zipCode + "</th>";
        htmlContent = htmlContent + " <td>" + sensor.name + "</td>";
        htmlContent = htmlContent + " <td>" + sensor.division + "</td>";
        htmlContent = htmlContent + " <td>" + sensor.idSpace + "</td>";

        if (sensor.active == 1) {
            htmlContent = htmlContent + " <td> <button type='button' class='btn btn-outline-dark' onclick='changeSensorStatus(\"" + sensor.idSensor + "\"," + sensor.idSpace + ")'>Deactivate</button></td>";
        }
        else {
            htmlContent = htmlContent + " <td> <button type='button' class='btn btn-outline-dark' onclick='changeSensorStatus(\"" + sensor.idSensor + "\"," + sensor.idSpace + ")'>Activate</button></td>";
        }


        htmlContent = htmlContent + "<tr>";
        htmlContent = htmlContent + "<tr>";
        htmlContent = htmlContent + "<tr>";
    })
    document.getElementById("sensors").innerHTML = htmlContent;
}

async function changeSensorStatus(sensorId, spaceId) {
    //O backEnd vai fazer uma rota nova
    let BASE_URL = "http://localhost:8002";

    await axios.put(`${BASE_URL}/sensors/` + sensorId + `/spaces/` + spaceId)
        .then(function (response) {
            console.log('saved successfully')
        });


    createTable();

}

const getAllSensors = async () => {
    let BASE_URL = "http://localhost:8002";
    try {
        const res = await axios.get(`${BASE_URL}/sensors`);
        const todos = res.data;
        return todos;
    } catch (e) {
        console.error(e);
    }
};

const getSensorStatus = async (sensorId) => {
    let BASE_URL = "http://localhost:8002";
    try {
        const res = await axios.get(`${BASE_URL}/sensors/` + sensorId);
        const todos = res.data;
        return todos;
    } catch (e) {
        console.error(e);
    }
};

const getCurStatus = async (idSpace) => {
    let BASE_URL = "http://localhost:8002";
    try {
        const res = await axios.get(`${BASE_URL}/sensors/space/` + idSpace);
        const todos = res.data.data;
        return todos;
    } catch (e) {
        console.error(e);
    }
}

const getSensorsByHouse = async (houseId) => {
    let BASE_URL = "http://localhost:8002";
    try {
        const res = await axios.get(`${BASE_URL}/sensors/house/` + houseId);
        const todos = res.data;
        return todos;
    } catch (e) {
        console.error(e);
    }
};

const getAllRecords = async () => {
    let BASE_URL = "http://localhost:8002";
    try {
        const res = await axios.get(`${BASE_URL}/arduino`);
        const todos = res.data;
        return todos;
    } catch (e) {
        console.error(e);
    }
};


window.onload = function () {
    this.orderToGetHouses();
}

async function startListeningArduino() {
    
    let BASE_URL = "http://localhost:8002";

    let data = {};
    let zipCode = document.getElementById("sel1").value;

    let sensors = await getSensorsByHouse(zipCode);
    sensors = sensors.data;

    let idSensor = null;
    let idSpace = null;

    sensors.forEach(element => {
        if (element.active == 1) {
            idSensor = element.idSensor;
            idSpace = element.idSpace;
        }
    });

    if (!(idSensor == null)) {
        data.idSensor = idSensor;
        data.idSpace = idSpace;
        data.zipCode = zipCode;
        data.value = 1;

        
        axios.post(`${BASE_URL}/arduino`, data)
        .then(function (response) {
            console.log('saved successfully')
        });
    }
    setTimeout(function() {
        createRecords();
    }, 5000);
}

async function closeArduinoConnection() {
    let BASE_URL = "http://localhost:8002";
    try {
        const res = await axios.post(`${BASE_URL}/arduino/close`).then(function (response) {
            console.log('closed successfully')
        });
    } catch (e) {
        console.error(e);
    }
}

async function deleteAllRecords() {
    let BASE_URL = "http://localhost:8002";
    try {
        const res = await axios.post(`${BASE_URL}/arduino/delete`).then(function (response) {
            console.log('deleted successfully')
        });
    } catch (e) {
        console.error(e);
    }
    createRecords();
}