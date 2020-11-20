class Trip {


    constructor(id, name, owner, date, campgroundId, parkCode) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.date = date;
        this.campgroundId = campgroundId;
        this.parkCode = parkCode;
    }

    static fromStorage(obj) {
        return new Trip(
            obj["id"],
            obj["name"],
            obj["owner"],
            obj["date"],
            obj["campgroundId"],
            obj["parkCode"])
    }

}

export default Trip
