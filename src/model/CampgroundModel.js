class Campground {


    constructor(id, name, description, campsites, fees, phoneNumber, emailAddress, longitude, latitude, operatingHours, parkCode, regulationsOverview, images) {
        this.name = name;
        this.id = id;
        this.description = description;
        this.campsites = campsites;
        this.fees = fees;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.longitude = longitude;
        this.latitude = latitude;
        this.operatingHours = operatingHours;
        this.parkCode = parkCode;
        this.regulationsOverview = regulationsOverview;
        this.images = images
    }

    static fromStorage(obj) {
        return new Campground(
            obj['id'],
            obj['name'],
            obj['description'],
            obj['campsites'],
            obj['fees'],
            !!obj['contacts']['phoneNumbers'].length ? obj['contacts']['phoneNumbers'][0].phoneNumber : "",
            !!obj['contacts']['emailAddresses'].length ? obj['contacts']['emailAddresses'][0].emailAddress : "",
            obj['longitude'],
            obj['latitude'],
            obj['operatingHours']['standardHours'],
            obj['parkCode'],
            obj['regulationsOverview'],
            obj['images']
        )
    }

}

export default Campground
