const carImg = document.querySelector('.heroImage');
const carImgs = ["https://www.transparentpng.com/download/car-png/car-free-transparent-png-8.png", "https://www.freeiconspng.com/uploads/hd-free-audi-png-auto-car-image-31.png"];
var curImg = 0;

var slides = document.querySelectorAll("#slider .slide");
var currentSlide = 0;

const dropdownItems = document.querySelectorAll('.dropdown-item');

document.addEventListener("DOMContentLoaded", function() {
  var loader = document.getElementById("loader");
  loader.parentNode.removeChild(loader);
});


function changeHeroImage() {
    var next = document.createElement('img');
    next.onload = function(e) {
        document.getElementById('img_container').insertBefore(next, document.querySelector("#img_container img"));
        $('#img_container img').eq(1).fadeOut(500, function() {
            $(this).detach();
        });
    };
    next.src = carImgs[curImg];
    curImg = (curImg + 1) % carImgs.length;
}

setInterval(changeHeroImage, 2500);


function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(45.3786, 20.3992), // Geografska širina, dužina
        zoom: 5,
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}


// Validacija

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstNameInput').value.trim();
    const lastName = document.getElementById('lastNameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const message = document.getElementById('message').value.trim();
    const checkbox = document.getElementById('checkbox');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    let valid = true;

    if (firstName === '') {
        toastr.error("Ime je obavezno.");
        valid = false;
    }


    if (lastName === '') {
        toastr.error('Prezime je obavezno.');
        valid = false;
    }

    if (email === '') {
        toastr.error('Email je obavezan.');
        valid = false;
    } else if (!emailPattern.test(email)) {
        toastr.error('Neispravna email adresa.');
        valid = false;
    }


    if (message === '') {
        toastr.error('Poruka je obavezna.');
        valid = false;
    }

    if (!checkbox.checked) {
        toastr.error('Morate prihvatiti uslove za korišćenje.');
        valid = false;
    }

    if (valid) {
        toastr.success('Poruka je uspešno poslata!');
        this.reset();
    }
});

// Slider
function showSlide(index) {
    if (index < 0) {
        index = slides.length - 1;
    } else if (index >= slides.length) {
        index = 0;
    }

    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[index].classList.add("active");
    currentSlide = index;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

showSlide(0);

setInterval(nextSlide, 10000);

document.querySelector("#slider").addEventListener("click", function(event) {
    if (event.target.classList.contains("prev")) {
        prevSlide();
    } else if (event.target.classList.contains("next")) {
        nextSlide();
    }
});

// Dropdown
function dropdownInit() {
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();

            const selectedItemText = item.textContent.trim();

            document.getElementById('dropdown').classList.add('hidden');

            document.getElementById('dropdownDefaultButton').textContent = selectedItemText;
            //        console.log(selectedItemText);
        });
    });

}



function reserveCar() {
    var validDate = isValidDate();

    const modal = new Modal(document.getElementById('default-modal'));

    const place = document.getElementById('dropdownDefaultButton').textContent;
    const firstName = document.getElementById('firstNameInput').value.trim();
    const lastName = document.getElementById('lastNameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const phone = document.getElementById('phoneInput').value;
    const message = document.getElementById('message').value.trim();
    const checkbox = document.getElementById('checkbox');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(place);

    let valid = true;

    if (place === 'Mesto preuzimanja') {
        toastr.error("Izaberite mesto preuzimanja!");
        valid = false;
    }

    if (firstName === '') {
        toastr.error("Ime je obavezno.");
        valid = false;
    }


    if (lastName === '') {
        toastr.error('Prezime je obavezno.');
        valid = false;
    }

    if (email === '') {
        toastr.error('Email je obavezan.');
        valid = false;
    } else if (!emailPattern.test(email)) {
        toastr.error('Neispravna email adresa.');
        valid = false;
    }


    if (!checkbox.checked) {
        toastr.error('Morate prihvatiti uslove za korišćenje.');
        valid = false;
    }

    if (phone == '') {
        toastr.error('Broj telefona je obavezan.');
        valid = false;
    }


    if (valid && validDate) {
        toastr.success('Uspešno ste rezervisali vozilo! Čekamo vas :)');
        document.getElementById('reserveForm').reset();
        modal.hide();

    }
}

function isValidDate() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const date = new Date();

    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    var trimmedStartDate = startDateInput.value.split("/").slice(0, 3).join("/");
    var trimmedStartDateArray = trimmedStartDate.split("/");

    var trimmedEndDate = endDateInput.value.split("/").slice(0, 3).join("/");
    var trimmedEndDateArray = trimmedEndDate.split("/");

    var startDate = new Date(trimmedStartDateArray[2], trimmedStartDateArray[0] - 1, trimmedStartDateArray[1]);
    var endDate = new Date(trimmedEndDateArray[2], trimmedEndDateArray[0] - 1, trimmedEndDateArray[1]);
    var currentDate = new Date(year, month, day);

    var valid = true;

    if (isNaN(startDate.getTime())) {
        toastr.error("Izaberite datum preuzimanja!")
        valid = false;
    }

    if (isNaN(endDate.getTime())) {
        toastr.error("Izaberite datum vraćanja!")
        valid = false;
    }

    if (startDate > endDate) {
        toastr.error("Datum preuzimanja ne može biti posle datuma vraćanja!")
        valid = false;
    }

    if (startDate < currentDate) {
        toastr.error("Datum preuzimanja ne može biti pre današnjeg datuma!")
        valid = false;
    }

    return valid;
}

function closeModal() {
    const modalEl = new Modal(document.getElementById('default-modal'));
    var modal = document.getElementById('default-modal');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
}