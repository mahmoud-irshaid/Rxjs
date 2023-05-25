const { Observable } = require('rxjs')
const { map } = require('rxjs/operators')

const users = {
    data: [
        {
            status: "active",
            age: 14
        },
        {
            status: "inactive",
            age: 19
        },
        {
            status: "inactive",
            age: 32
        },

        {
            status: "active",
            age: 23
        },

        {
            status: "active",
            age: 50
        },
        {
            status: "inactive",
            age: 28
        },
    ]
}

const observable = new Observable((subscriber) => {
    subscriber.next(users)
    // subscriber.next(10)
    // subscriber.next(11)
    // subscriber.next(12)
}).pipe(
    map((value) => {
        console.log("Got data from observable", value);
        return value.data
    }),
    map((value) => {
        console.log("Got data from first operator", value);
        return value.filter((user) => user.status === "active")
    }),
    map((value) => {
        console.log("Got data from second operator", value);
        return value.reduce((prev, current) => prev + current.age, 0) / value.length  //average age
    }),
    map((value) => {
        console.log("Got data from third operator", value);
        if (value < 18) {
            throw new Error("Average age is too young")
        } else {
            return value
        }
    }),
)

const observer = {
    next: (value) => { console.log("Observer got a value of " + value) }
    ,
    error: (err) => { console.log("Observer got an error of" + err) }
    ,
    complete: () => { console.log("Observer got a complete notification") }
}

observable.subscribe(observer);