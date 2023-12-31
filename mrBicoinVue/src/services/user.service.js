'use strict'

import { dbService } from './db.service.js'
import { storageService } from './storage.service.js'

const KEY = 'users'
const LOGGEDIN_USER = 'loggedinuser'

export const userService = {
    query,
    get,
    remove,
    save,
    getEmptyUser,
    getLoggedInUser,
    saveLoggedInUser
}

async function query() {
    var users = await dbService.query(KEY)

    console.log(users)
    if (!users || !users.length) {
        users = _createDefaultUsers()
        await dbService.insert(KEY, users)
    }
    return users
}

async function get(name) {
    console.log('name:', name)
    return await dbService.getName(KEY, name)
}

async function remove(id) {
    return await dbService.remove(KEY, id)
}

async function save(user) {
    console.log('user', user)
    if (user._id) return await dbService.put(KEY, user)
    else {
        const savedUser = await dbService.post(KEY, user)
        userService.saveLoggedInUser(savedUser)
    }
    return user

}

function getEmptyUser() {
    return {
        name: '',
        balance: 100,
        transactions: [],


    }
}
function saveLoggedInUser(user) {
    console.log('user', user)
    storageService.save(LOGGEDIN_USER, user)

}
function getLoggedInUser(KEY) {
    const user = storageService.load(LOGGEDIN_USER)
    return user

}

function _createDefaultUsers() {
    return [
        _createUser("Ochoa", 100, []),
        _createUser("Hallie Mclean", 100, []),
        _createUser("Parsons Norris", 100, []),
        _createUser("Rachel Lowe", 100, []),
    ]
}

function _createUser(_id, name, balance, transactions) {
    return {
        _id, name, balance, transactions
    }

    // function _createUsers() {
    //     const users = [
    //         {
    //             "_id": "5a56640269f443a5d64b32ca",
    //             "name": "Ochoa Hyde",
    //             "email": "ochoahyde@renovize.com",
    //             "phone": "+1 (968) 593-3824",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a5664025f6ae9aa24a99fde",
    //             "name": "Hallie Mclean",
    //             "email": "halliemclean@renovize.com",
    //             "phone": "+1 (948) 464-2888",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a56640252d6acddd183d319",
    //             "name": "Parsons Norris",
    //             "email": "parsonsnorris@renovize.com",
    //             "phone": "+1 (958) 502-3495",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a566402ed1cf349f0b47b4d",
    //             "name": "Rachel Lowe",
    //             "email": "rachellowe@renovize.com",
    //             "phone": "+1 (911) 475-2312",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a566402abce24c6bfe4699d",
    //             "name": "Dominique Soto",
    //             "email": "dominiquesoto@renovize.com",
    //             "phone": "+1 (807) 551-3258",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a566402a6499c1d4da9220a",
    //             "name": "Shana Pope",
    //             "email": "shanapope@renovize.com",
    //             "phone": "+1 (970) 527-3082",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a566402f90ae30e97f990db",
    //             "name": "Faulkner Flores",
    //             "email": "faulknerflores@renovize.com",
    //             "phone": "+1 (952) 501-2678",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a5664027bae84ef280ffbdf",
    //             "name": "Holder Bean",
    //             "email": "holderbean@renovize.com",
    //             "phone": "+1 (989) 503-2663",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a566402e3b846c5f6aec652",
    //             "name": "Rosanne Shelton",
    //             "email": "rosanneshelton@renovize.com",
    //             "phone": "+1 (968) 454-3851",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a56640272c7dcdf59c3d411",
    //             "name": "Pamela Nolan",
    //             "email": "pamelanolan@renovize.com",
    //             "phone": "+1 (986) 545-2166",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a5664029a8dd82a6178b15f",
    //             "name": "Roy Cantu",
    //             "email": "roycantu@renovize.com",
    //             "phone": "+1 (929) 571-2295",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a5664028c096d08eeb13a8a",
    //             "name": "Ollie Christian",
    //             "email": "olliechristian@renovize.com",
    //             "phone": "+1 (977) 419-3550",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a5664026c53582bb9ebe9d1",
    //             "name": "Nguyen Walls",
    //             "email": "nguyenwalls@renovize.com",
    //             "phone": "+1 (963) 471-3181",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a56640298ab77236845b82b",
    //             "name": "Glenna Santana",
    //             "email": "glennasantana@renovize.com",
    //             "phone": "+1 (860) 467-2376",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a56640208fba3e8ecb97305",
    //             "name": "Malone Clark",
    //             "email": "maloneclark@renovize.com",
    //             "phone": "+1 (818) 565-2557",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a566402abb3146207bc4ec5",
    //             "name": "Floyd Rutledge",
    //             "email": "floydrutledge@renovize.com",
    //             "phone": "+1 (807) 597-3629",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a56640298500fead8cb1ee5",
    //             "name": "Grace James",
    //             "email": "gracejames@renovize.com",
    //             "phone": "+1 (959) 525-2529",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a56640243427b8f8445231e",
    //             "name": "Tanner Gates",
    //             "email": "tannergates@renovize.com",
    //             "phone": "+1 (978) 591-2291",
    //             "coins": 0
    //         },
    //         {
    //             "_id": "5a5664025c3abdad6f5e098c",
    //             "name": "Lilly Conner",
    //             "email": "lillyconner@renovize.com",
    //             "phone": "+1 (842) 587-3812",
    //             "coins": 0
    //         }
    //     ]
    //     return users
    // }
}
