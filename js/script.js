import MainContainer from "../components/maincontainer/Maincontainer.js";
import Toast from "../components/maincontainer/toast/Toast.js";
import ResponseContainer from "./ResponseContainer.js";

$(function App() {
    
    $('#mainContainer').html(MainContainer);
    $('#toast').html(Toast);
    $('#responseContainer').html(ResponseContainer);
    $('#sendInput').on('click',function(){
        validate();
    });
    $('#toast').on('click',function(){
        toastOut('manuell');
    });
    $('#sendOutput').on('click',function(){
        responseSend();
    });
    

});

/* Erste Eingaben Validerung */

function validate() {
    var error = '';
    var errorType = false;
    var personData = [];

    function checkAndAssignValue(id, variableName, errorMessage) {
        var value = $('#' + id).val();
        if (!value) {
            error += errorMessage;
        } else {
            if (id === 'number' && (value <= 0 || value >= 9999)) {
                error += '<p>Die Zahl muss zwischen 1 und 9998 liegen!</p>';
            } else {
                if (id === 'phoneNumber') {
                    if (value.startsWith('0')) {
                        value = value.substring(1);
                    }
                    if (!value.startsWith('+')) {
                        value = '+49' + value;
                    }
                }else if (id === 'birthdate') {
                    let date = new Date(value);
                    let year = date.getFullYear();
                    let month = String(date.getMonth() + 1).padStart(2, '0');
                    let day = String(date.getDate()).padStart(2, '0');
                    value = `${year}${month}${day}`;
                }

                window[variableName] = value;
            }
        }
    }

    checkAndAssignValue('surname', 'surname', '<p>Nachname fehlt!</p>');
    checkAndAssignValue('firstName', 'firstname', '<p>Vorname fehlt!</p>');
    checkAndAssignValue('phoneNumber', 'phonenumber', '<p>Telefonnummer fehlt!</p>');
    checkAndAssignValue('birthdate', 'birthdate', '<p>Geburtsdatum fehlt!</p>');
    checkAndAssignValue('number', 'number', '<p>Zahl fehlt!</p>');

    if (error === '') {
        errorType = true;
        surname = surname.toUpperCase();
        firstname = firstname.toUpperCase();
        personData = {'surname': surname, 'firstname': firstname, 'phonenumber': phonenumber, 'birthdate': birthdate, 'number':number};
        toast(errorType);
        response(personData);
    } else {
        toast(errorType, error);
    }
}

/* User-Feedback-Popup-Logik */

function toast(type, data=null) {
    switch (type) {
        case false:
            $('#ToastTitle').html('Fehler').addClass('falseToast');
            $('#ToastDesc').html('Fehlerhafte Angaben: ' + data);
            $('#toast').fadeIn('slow').removeClass('hidden');
            toastOut();
            break;
        case true:
            $('#ToastTitle').html('Erfolg').addClass('trueToast');
            $('#ToastDesc').html('Alle Angaben waren korrekt!');
            $('#toast').fadeIn('slow').removeClass('hidden');
            toastOut();
            break;
        default:
            console.error('Ungültiger Wert für type-Parameter in der toast-Funktion.');
    }
}

function toastOut( type=null ){
    if(!type){
        setTimeout(function() {
            $('#toast').fadeOut().addClass('hidden');
        }, 3600);
   }else{
        $('#toast').fadeOut().addClass('hidden');
   }
}

/* Ausgabe */

function response(data) {
    for (let key in data) {
        if (key === 'number') {
            let numberType = checkDivision(data[key]);
            if (numberType !== '') {
                $('#output_' + key).html('Die angegebene Zahl '+data[key]+' ist '+numberType+' teilbar.');
            }else{
                $('div[data-section="outputNumber"]').addClass('hidden');
            }
        } else {
            $('#output_' + key).html(data[key]);
        }
    }
    $('#responseContainer').fadeIn('slow').removeClass('hidden');
}

function checkDivision(number) {
    let numberType = '';

    if (number % 3 === 0) {
        numberType += 'durch 3';
    }
    if (number % 7 === 0) {
        if (numberType !== '') {
            numberType += ', ';
        }
        numberType += 'durch 7';
    }
    if (number % 11 === 0) {
        if (numberType !== '') {
            numberType += ', ';
        }
        numberType += 'durch 11';
    }

    return numberType;
}


function responseSend(){
    location.reload();

    /* Hier könnte man als Beispiel die Daten an das Backend (hier PHP als Beispiel) übergeben
        $.ajax({
            url: 'example.php', 
            method: 'GET', 
            data: { key1: 'value1', key2: 'value2' }, // Daten, die mit der Anfrage gesendet werden sollen
            success: function(response) {
        // Erfolgsfall: Die Funktion wird aufgerufen, wenn die Anfrage erfolgreich abgeschlossen wurde
        console.log('Antwort erhalten:', response);
        },
        error: function(xhr, status, error) {
        // Fehlerfall: Die Funktion wird aufgerufen, wenn ein Fehler auftritt
            console.error('Fehler:', status, error);
        }
        });


    */
}
