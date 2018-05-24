var Albums = [
    {title: "Daisy",year: "2009", artist: "Brand New", genre:"Alternative Rock"},
    {title: "Nevermind", year: "1991", artist: "Nirvana", genre:"Grunge"},
    {title: "Rumours", year: "1977", artist: "Fleetwood Mac", genre:"Pop Rock"},
    {title: "CTRL", year: "2017", artist: "SZA", genre:"Rhythm Blues"},
    {title: "Graduation", year: "2007", artist: "Kanye West", genre:"Rap"}
];

exports.getAllAlbums = () => {
    return Albums;
};


exports.findTitle  = (title) => {
        return Albums.find((item) => {
            return item.title == title;

        });
};


// var withoutItem = Albums.slice(1, 4)
// exports.albumDeleted = () => {
//         return withoutItem;
// };

exports.delete = (title) => {
    let oldLength = Albums.length;
    const originalCount = Albums.length;
    Albums = Albums.filter((item) =>{
        return item.title.toLowerCase()!= title;    
    });
    //boolean to show item was deleted
    return {"deleted": Albums.length !== oldLength, "total": Albums.length};
};