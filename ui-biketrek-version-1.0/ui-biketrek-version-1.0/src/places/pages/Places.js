import React from 'react';
import { useParams } from 'react-router';
import PlaceList from '../components/PlaceList';

const dummy_places = [
    {
        id:'u2',
        image:'https://assets.traveltriangle.com/blog/wp-content/uploads/2017/10/ideal-duration.jpg',
        title:'Shimla in Winter',
        duration :'4 days',
        provider : 'J & Co',
        location :'shimla',
        difficulty : '3',
        days : '4',
        description : 'While it gets too cold at times, these months are ideally the best time to visit Shimla for snowfall. The mesmerizing views of the snow-covered peaks and gorgeous landscapes are worth witnessing.'
    }
]

const Places =()=>{
    const id = useParams().id;
    const loadedPlaces = dummy_places.filter(place =>place.id===id)
return <PlaceList items ={loadedPlaces} />

};

export default Places;