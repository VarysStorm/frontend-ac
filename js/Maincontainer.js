export default function MainContainer() {
    var output = "";

    output += "<div class='wrapper'>";
        output += "<div data-section='name'>";
            output += "<input type='text' id='surname' name='Nachname' placeholder='Nachname'>";
            output += "<input type='text' id='firstName' name='Vorname' placeholder='Vorname'>";
        output += "</div>";
        output += "<div data-section='phone'>";
            output += "<input type='tel' id='phoneNumber' name='phoneNumber' placeholder='0180800000'>";
        output += "</div>";
        output += "<div data-section='birthdate'>";
            output += "<input type='date' id='birthdate' name='birthdate' placeholder='2000-01-01'>";
        output += "</div>";
        output += "<div data-section='number'>";
            output += "<input type='number' id='number' name='number' placeholder='12'>";
        output += "</div>";
        output += "<div data-section='button'>";
            output += "<button id='sendInput'>Absenden</button>";
        output += "</div>";
    output += "</div>";

    return output;
}
