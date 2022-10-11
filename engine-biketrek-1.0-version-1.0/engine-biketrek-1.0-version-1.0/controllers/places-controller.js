const uuid = require('uuid').v4;


const getPlaceById = (req , res , next ) =>{
    res.json({message : 'it worked '});
};

const places_list = [];

const addPlace = (req , res , next ) =>{
    const {title, description, location , days, difficulty , rating } = req.body;
    const addPlace ={
        id: uuid(),
        title,
        description,
        location,
        days,
        difficulty,
        rating
    }
    places_list.push(addPlace);
    res.status(201).json({ place : addPlace});
};

exports.getPlaceById = getPlaceById;
exports.addPlace=addPlace;