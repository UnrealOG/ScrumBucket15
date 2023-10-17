import {ObjectId} from 'mongodb';
import mongoCollections from '../config/mongoCollections.js';
import validation from '../validation.js';

const events = mongoCollections.events;

async function createEvent(displayName_teacher, eventName, eventDate, startTime, endTime, displayName_student){
    displayName_teacher = validation.checkDisplayName(displayName_teacher)
    displayName_student = validation.checkDisplayName(displayName_student)



    let newEvent = {
        _id: new ObjectId(),
        displayName_teacher: displayName_teacher,
        eventName: eventName,
        eventDate: eventDate,
        startTime: startTime,
        endTime: endTime,
        displayName_student: displayName_student
    }
    const eventCollection = await events()
    const insertEvent = await eventCollection.insertOne(newEvent)
    if(!insertEvent.acknowledged || !insertInfo.insertedId)
        throw [500,"Could not insert user into collection"]

    return newEvent
}

export default {
    createEvent
}