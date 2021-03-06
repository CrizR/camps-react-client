class Trip {
  constructor(id, date, inviteList, tripOwner, campground, description, name) {
    this.id = id;
    this.date = date;
    this.inviteList = inviteList;
    this.tripOwner = tripOwner;
    this.campground = campground;
    this.description = description;
    this.name = name;
    //this.parkCode = parkCode;
  }

  static fromStorage(obj) {
    return new Trip(
      obj["id"],
      obj["date"],
      obj["inviteList"],
      obj["tripOwner"],
      obj["campground"],
      obj["description"],
      obj["name"]
    );
  }
}

export default Trip;
