// function Person(name, year, artist, genre){
//     this.name = name;
//     this.year = year;
//     this.artist = artist;
//     this.genre = genre;
//
// }

var Albums = [
    {name: "Daisy",year: "2009", artist: "Brand New", genre:"Alternative Rock"},
    {name: "Nevermind", year: "1991", artist: "Nirvana", genre:"Grunge"},
    {name: "Rumours", year: "1977", artist: "Fleetwood Mac", genre:"Pop Rock"},
    {name: "CTRL", year: "2017", artist: "SZA", genre:"Rhythm Blues"},
    {name: "Graduation", year: "2007", artist: "Kanye West", genre:"Rap"}
];


exports.getAllAlbums = function(){
    return Albums;
};


exports.findName  = (name) => {
        return Albums.find((item) => {
            return item.name == name;

        });
};


var withoutItem = Albums.slice(1, 4)
exports.albumDeleted = () => {
        return withoutItem;
};
