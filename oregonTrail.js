(function () {

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // define a Wagon
    function Wagon(capacity) {
        var passengers = [];
        var capacity = capacity;

        // add a passenger to the list of passengers
        this.addPassenger = function (passenger) {
            passengers.push(passenger);
        }

        // check of any passenger is currently quarantined
        this.isQuarantined = function () {
            for (let i = 0; i < passengers.length; i++) {
                if (!passengers[i].isPassengerHealthy()) {
                    return true;
                }
            }
            return false;
        }

        // loop through all passengers and add up the current food of each
        this.totalFood = function () {
            let food = 0;
            for (let i = 0; i < passengers.length; i++) {
                food = food + passengers[i].getFood();
            }
            return food;
        }
    }

    // define a Traveler
    function Traveler(name) {
        var food = getRandom(1, 100);
        var name = name;
        var isHealthy = true;
        console.log(name + "'s initial food = " + food);

        this.isPassengerHealthy = function() {
            return isHealthy;
        }

        this.eat = function () {
            food -= 20;
            console.log(name + " ate");
            if (food < 20) {
                isHealthy = false;
                food = 0;
            }
        }

        this.getFood = function () {
            return food;
        }

        // random number function should return  1 or 2, if 1 is returned, then hunt was successful
        this.hunt = function () {
            if (getRandom(1, 3) == 1) {
                food = food * 1.5;
                console.log(name + "'s hunt was successful");
            }
            // if the hunt increased current food enough, then reset health indicator
            if (food >= 20) {
                isHealthy = true;
            }
        }
    }

    function makeWagon(capacity) {
        return new Wagon(capacity);
    }

    function hunt(traveler) {
        traveler.hunt();
    }

    function eat(traveler) {
        traveler.eat();
    }

    function join(wagon, traveler) {
        wagon.addPassenger(traveler);
    }

    function quarantine(wagon) {
        return wagon.isQuarantined();
    }

    function food(wagon) {
        return wagon.totalFood();
    }

    function makeTraveler(name) {
        return new Traveler(name);
    }

    /////////////////////// test the functionality ///////////
    let wagon = makeWagon(5);

    // Create a traveler with the name 'Henrietta' called 'traveler'
    let traveler = makeTraveler('Henrietta');
    // Create a traveler with the name 'Juan' called 'traveler2'
    let traveler2 = makeTraveler('Juan');

    hunt(traveler); // maybe get more food
    eat(traveler2);

    eat(traveler2); // juan is hungry
    join(wagon, traveler);
    join(wagon, traveler2);
    
    console.log("Is wagon quarantined: " + quarantine(wagon)); // print true if someone is sick, false otherwise
    console.log("Wagon total food is: " + food(wagon)); // print juan's food + henrietta's food

})();
